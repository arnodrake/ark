"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGoToSection } from "@/components/SectionLink";
import LanguageSwitcher, { MobileLanguageList } from "@/components/LanguageSwitcher";
import { useI18n, type ClientDictionary } from "@/components/I18nProvider";
import type { CapabilitySlug } from "@/lib/i18n/types";

/** `section` items scroll to a home-page section instead of navigating to `href`. */
type NavLink = { label: string; href: string; section?: string };
type MenuItem = NavLink & { children?: NavLink[] };

const CAPABILITY_SLUGS: CapabilitySlug[] = [
  "electrical-systems",
  "pneumatic-controls",
  "network-infrastructure",
  "automation-integration",
];

function buildNav(dict: ClientDictionary): MenuItem[] {
  return [
    {
      label: dict.nav.about,
      href: "/",
      section: "top",
      children: [
        { label: dict.nav.representativeProjects, href: "/", section: "projects" },
        { label: dict.nav.ourMission, href: "/", section: "future" },
      ],
    },
    {
      label: dict.nav.businesses,
      href: "/",
      section: "capabilities",
      children: CAPABILITY_SLUGS.map((slug) => ({ label: dict.capabilityNames[slug], href: `/capabilities/${slug}` })),
    },
    { label: dict.nav.contact, href: "/contact" },
  ];
}

function AutoHeight({ children, reduced }: { children: ReactNode; reduced: boolean }) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    setHeight(el.offsetHeight);
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={{ duration: reduced ? 0 : 0.55, ease: [0.45, 0, 0.15, 1] }}
      className="overflow-hidden"
    >
      <div ref={innerRef}>{children}</div>
    </motion.div>
  );
}

export default function Header() {
  const prefersReduced = useReducedMotion();
  const { dict } = useI18n();
  const NAV = buildNav(dict);
  const swapIn = (delay: number) => ({ duration: prefersReduced ? 0 : 0.55, delay: prefersReduced ? 0 : 0.14 + delay, ease: [0.25, 1, 0.5, 1] as const });
  const swapOut = { duration: prefersReduced ? 0 : 0.2, ease: [0.4, 0, 0.6, 1] as const };
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  // focusWithin 不再觸發展開，避免 Contact 點擊閃爍
  const [panelHover, setPanelHover] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [allowOverlay, setAllowOverlay] = useState(true);
  const [contactHover, setContactHover] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<null | "about" | "biz" | "lang">(null);
  const [mobileClosing, setMobileClosing] = useState(false);
  const [closeTimer, setCloseTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  // Unify header text color logic across pages: default to white unless expanded
  const darkBase = false;
  const onHome = pathname === "/";
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const bizRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const lastIdxRef = useRef<number | null>(null);
  const navHoverRef = useRef(false);
  const panelHoverRef = useRef(false);
  const visibleIdxRef = useRef<number | null>(null); // 用於面板退出期間保持顯示的索引
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  const effectiveIdx = openIdx ?? activeIdx;
  const hasChildrenOpen = (effectiveIdx !== null && effectiveIdx <= 1);
  const expanded = hasChildrenOpen || panelHover || (navHover && hasChildrenOpen);

  // 同步可見索引：只要有有效索引就記錄，用於退出動畫時避免退回到 0（About）
  useEffect(() => {
    if (effectiveIdx !== null) visibleIdxRef.current = effectiveIdx;
  }, [effectiveIdx]);

  // 當路由變化（點擊子標題跳轉）時，自動收起所有展開狀態
  useEffect(() => {
    setOpenIdx(null);
    setActiveIdx(null);
    setPanelHover(false);
    setContactHover(false);
    setNavHover(false);
    navHoverRef.current = false;
    panelHoverRef.current = false;
  }, [pathname]);

  const scheduleClose = () => {
    if (closeTimer) clearTimeout(closeTimer);
    const t = setTimeout(() => {
      if (!navHoverRef.current && !panelHoverRef.current) {
        setOpenIdx(null);
        setActiveIdx(null);
      }
    }, 100);
    setCloseTimer(t);
  };

  const goToSection = useGoToSection();
  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement>, link: NavLink, closeMobile = false) => {
    if (!link.section || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    goToSection(link.section);
    setOpenIdx(null);
    setActiveIdx(null);
    setPanelHover(false);
    if (closeMobile) {
      setMobileClosing(true);
      setMobileOpen(false);
    }
  };

  // 在行動選單展開/收起期間，頂部黑底由 overlay 動畫負責，header 本身保持透明以確保兩段動畫連貫
  const headerIsDarkBase = !onHome;
  const headerIsDark = headerIsDarkBase && !(mobileOpen || mobileClosing);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const onScroll = () => { setMobileClosing(true); setMobileOpen(false); setMobileSection(null); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  // Close on outside click (mobile only)
  useEffect(() => {
    if (!mobileOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (mobileMenuRef.current && mobileMenuRef.current.contains(t)) return;
      if (mobileToggleRef.current && mobileToggleRef.current.contains(t)) return;
      setMobileClosing(true);
      setMobileOpen(false);
      setMobileSection(null);
    };
    document.addEventListener("mousedown", onDown, true);
    return () => document.removeEventListener("mousedown", onDown, true);
  }, [mobileOpen]);

  return (
    <motion.header
      initial={false}
      animate={{ height: expanded ? 112 : 64 }}
      transition={{ duration: prefersReduced ? 0 : 0.2, ease: "linear" }}
      className={`absolute inset-x-0 top-0 z-40 ${headerIsDark ? "bg-neutral-950" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-5">
        {/* Top row */}
        <div
          className={`relative z-50 flex h-16 items-center justify-between ${expanded ? "text-white" : darkBase ? "text-neutral-900" : "text-white"}`}
          onMouseEnter={() => {
            setNavHover(true);
            navHoverRef.current = true;
            // 取消面板收起的延遲，並恢復上一次有效索引，避免子項目消失
            if (closeTimer) {
              clearTimeout(closeTimer);
              setCloseTimer(null);
            }
            if (activeIdx !== null) setOpenIdx(activeIdx);
          }}
          onMouseLeave={() => { setNavHover(false); navHoverRef.current = false; scheduleClose(); }}
          onMouseMove={(e: ReactMouseEvent<HTMLDivElement>) => {
            if (openIdx === null) return;
            const x = e.clientX;
            const aboutLeft = aboutRef.current?.getBoundingClientRect().left ?? 0;
            const contactRight = contactRef.current?.getBoundingClientRect().right ?? (bizRef.current?.getBoundingClientRect().right ?? 0);
            const margin = 2;
            if (x < aboutLeft - margin || x > contactRight + margin) {
              setOpenIdx(null);
              setActiveIdx(null);
            }
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            className="inline-flex items-center -ml-1.5 md:-ml-6 h-16"
            onMouseEnter={() => {
              if (closeTimer) clearTimeout(closeTimer);
              setContactHover(true);
              setAllowOverlay(true);
            }}
            onMouseLeave={() => setContactHover(false)}
          >
            {/* Mobile: ARK logo */}
            <Image src="/ARK.svg" alt="ARK" width={120} height={40} priority className="md:hidden block h-[38px] w-auto invert brightness-0" />
            {/* Desktop: ARK AUTOMATION logo */}
            <Image src="/ARK AUTOMATION.svg" alt="Ark Automation" width={165} height={38} priority className="hidden md:block h-[38px] w-auto invert brightness-0" />
          </Link>

          <div className="hidden md:flex items-center md:pr-[max(1.5rem,calc(111px_-_max(0px,(100vw_-_1280px)/2)))]">
          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            role="menubar"
            className="flex items-stretch gap-7"
            onMouseMove={(e: ReactMouseEvent<HTMLDivElement>) => {
              if (openIdx === null) return;
              const x = e.clientX;
              const aboutLeft = aboutRef.current?.getBoundingClientRect().left ?? 0;
              const contactRight = contactRef.current?.getBoundingClientRect().right ?? (bizRef.current?.getBoundingClientRect().right ?? 0);
              const margin = 2; // small tolerance
              if (x < aboutLeft - margin || x > contactRight + margin) {
                setOpenIdx(null);
                setActiveIdx(null);
              }
            }}
          >
            {NAV.map((item, idx) => (
              <div
                key={item.label}
                className="relative group"
                ref={idx === 0 ? aboutRef : idx === 1 ? bizRef : idx === 2 ? contactRef : undefined}
                onMouseEnter={() => {
                  if (item.children) {
                    if (closeTimer) clearTimeout(closeTimer);
                    setOpenIdx(idx);
                    setActiveIdx(idx); // 綁定父項目與子項目，確保動畫期間顯示子項
                    lastIdxRef.current = idx;
                  } else {
                    // Hover Contact：在面板收起時避免頂部 overlay 再次從頂端下展
                    if (closeTimer) clearTimeout(closeTimer);
                    setPanelHover(false);
                    setOpenIdx(null);
                    setActiveIdx(null);
                    setAllowOverlay(false); // 暫時禁用 overlay 動畫
                    setContactHover(true);  // 仍維持頂部黑底
                    // 面板退出需要 ~200ms，之後恢復 overlay 動畫
                    setTimeout(() => setAllowOverlay(true), 220);
                  }
                }}
                onMouseLeave={() => { setContactHover(false); }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  role="menuitem"
                  aria-haspopup={!!item.children}
                  aria-expanded={!!item.children && (effectiveIdx === idx && expanded) ? true : false}
                  aria-controls={item.children ? "submenu-panel" : undefined}
                  onKeyDown={(e) => {
                    if (!item.children) return;
                    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpenIdx(idx);
                      setActiveIdx(idx);
                    }
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      setOpenIdx((idx + 1) % 2); // 只在前兩個之間循環
                      setActiveIdx((idx + 1) % 2);
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      const next = idx - 1 < 0 ? 1 : idx - 1;
                      setOpenIdx(next);
                      setActiveIdx(next);
                    }
                  }}
                  className={`inline-flex h-16 items-center px-1 text-[15px] font-normal ${expanded ? "text-white/90 hover:text-white" : darkBase ? "text-neutral-900 hover:text-neutral-950" : "text-white/90 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

            <LanguageSwitcher className="ml-5" onOpenChange={setLangOpen} />
          </div>

          {/* Mobile hamburger */}
          <button
            ref={mobileToggleRef}
            className="md:hidden inline-flex items-center justify-center text-white p-0 -mr-1.5"
            aria-label={mobileOpen ? (mobileSection ? dict.nav.back : dict.nav.closeMenu) : dict.nav.openMenu}
            aria-expanded={mobileOpen}
            onClick={() => {
              if (mobileOpen && mobileSection) {
                setMobileSection(null);
                return;
              }
              if (mobileOpen) {
                setMobileClosing(true);
                setMobileOpen(false);
                setMobileSection(null);
              } else {
                setMobileOpen(true);
                setMobileSection(null);
              }
            }}
          >
            <span className="sr-only">{dict.nav.openMenu}</span>
            {mobileOpen ? (
              mobileSection ? (
                // Left arrow icon (same stroke style as scroll-to-top)
                <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5" />
                  <path d="M12 5L5 12" />
                  <path d="M12 19L5 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                <path d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75Zm0 5.25c0-.414.336-.75.75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm.75 4.5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Second row: integrated submenu that grows downward */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="submenu"
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: prefersReduced ? 0 : 0.7, ease: [0.33, 1, 0.68, 1] } }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: prefersReduced ? 0 : 0.48, ease: [0.45, 0, 0.55, 1] } }}
              className="absolute inset-x-0 top-0 z-0"
              style={{ willChange: "clip-path" }}
              onMouseEnter={() => {
                if (closeTimer) clearTimeout(closeTimer);
                setPanelHover(true); panelHoverRef.current = true; setContactHover(false);
                // 如果快速進入面板，保留上一個有效索引，確保子項顯示
                if (activeIdx === null) {
                  if (openIdx !== null) setActiveIdx(openIdx);
                  else if (lastIdxRef.current !== null) setActiveIdx(lastIdxRef.current);
                }
              }}
              onMouseLeave={() => {
                setPanelHover(false); panelHoverRef.current = false; scheduleClose();
              }}
            >
              <div id="submenu-panel" role="menu" aria-label={NAV[(effectiveIdx ?? visibleIdxRef.current ?? 0)]?.label} className="bg-neutral-950 text-white border-b border-neutral-800 pt-16 shadow-[0_10px_30px_rgba(0,0,0,0.25)] relative"
                   onMouseEnter={() => setPanelHover(true)}
                   onMouseLeave={() => setPanelHover(false)}>
                {/* top horizontal separator aligned under the header */}
                <div className="absolute left-0 right-0 top-16 h-px bg-neutral-700 pointer-events-none" />
                <AutoHeight reduced={!!prefersReduced}>
                <div className="relative mx-auto max-w-7xl px-6 py-6 grid grid-cols-12 gap-8 items-stretch">
                  {/* vertical divider at 1/3 width */}
                  <div className="pointer-events-none absolute top-6 bottom-6 left-[33.333%] w-px bg-white/25 hidden md:block" />
                  {/* Left column: large label with divider at golden ratio (approx 38%) */}
                  <div className="col-span-12 md:col-span-4 relative flex items-center self-stretch">
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.h3
                        key={effectiveIdx ?? visibleIdxRef.current ?? 0}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0, transition: swapIn(0) }}
                        exit={{ opacity: 0, y: -8, transition: swapOut }}
                        className="font-display text-4xl md:text-5xl font-normal text-white"
                      >
                        {NAV[(effectiveIdx ?? visibleIdxRef.current ?? 0)]?.label}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                  {/* Right column: children list */}
                  <div className="col-span-12 md:col-span-8 relative">
                  <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={effectiveIdx ?? visibleIdxRef.current ?? -1}
                    exit={{ opacity: 0, y: -8, transition: swapOut }}
                    className="grid gap-2"
                  >
                    {(NAV[(effectiveIdx ?? visibleIdxRef.current ?? -1)]?.children ?? []).map((c, ci) => (
                      <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0, transition: swapIn(0.04 + ci * 0.05) }}
                      >
                      <Link
                        key={c.label}
                        href={c.href}
                        role="menuitem"
                        className="block px-3 py-1.5 text-lg md:text-xl font-medium tracking-tight text-white/75 transition-colors hover:text-white"
                        autoFocus={ci === 0}
                        onKeyDown={(e) => { if (e.key === "Escape") { setOpenIdx(null); setActiveIdx(null); } }}
                        onClick={(e) => handleNavClick(e, c)}
                      >
                        {c.label}
                      </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                  </AnimatePresence>
                  </div>
                </div>
                </AutoHeight>
              </div>
            </motion.div>
          )}
          {/* Header-height overlay：從面板直接移到 Contact 時（allowOverlay=false）不重播展開動畫 */}
          {(contactHover || langOpen) && !expanded && (
            <motion.div
              key="contact-overlay"
              initial={allowOverlay ? { clipPath: "inset(0% 0% 100% 0%)" } : false}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.33, 1, 0.68, 1] } }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: prefersReduced ? 0 : 0.42, ease: [0.45, 0, 0.55, 1] } }}
              className="absolute inset-x-0 top-0 h-16 bg-neutral-950 border-b border-neutral-800 z-0 pointer-events-none"
              style={{ willChange: "clip-path" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: unified animated container (includes top overlay + panel) */}

      {/* Mobile menu panel */}
      <AnimatePresence initial={false} onExitComplete={() => setMobileClosing(false)}>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1, transition: { duration: prefersReduced ? 0 : 0.2, ease: "linear" } }}
            exit={{ opacity: 0, scaleY: 0, transition: { duration: prefersReduced ? 0 : 0.2, ease: "linear" } }}
            className="md:hidden fixed top-0 inset-x-0 z-40 bg-neutral-950 text-white"
            style={{ transformOrigin: "top", willChange: "transform, opacity" }}
          >
            {/* 頂部黑條（高度與 header 相同），與下方面板在同一容器中線性展開/收起 */}
            <div className="h-16 bg-neutral-950" />
            <div ref={mobileMenuRef} className="px-5 py-5">
              {mobileSection === null && (
                <div className="space-y-4">
                  <button className="block w-full text-left text-2xl font-semibold" onClick={() => setMobileSection("about")}>{dict.nav.about}</button>
                  <button className="block w-full text-left text-2xl font-semibold" onClick={() => setMobileSection("biz")}>{dict.nav.businesses}</button>
                  <Link href="/contact" className="block text-2xl font-semibold" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>{dict.nav.contact}</Link>
                  <button className="block w-full pt-2 text-left text-2xl font-semibold border-t border-white/15" onClick={() => setMobileSection("lang")}>{dict.nav.language}</button>
                </div>
              )}
              {mobileSection === "lang" && (
                <MobileLanguageList onSelect={() => { setMobileClosing(true); setMobileOpen(false); setMobileSection(null); }} />
              )}
              {mobileSection === "about" && (
                <div className="space-y-2">
                  <div className="mt-1 grid">
                    {NAV[0].children?.map((c) => (
                      <Link key={c.label} href={c.href} className="py-2 text-xl" onClick={(e) => handleNavClick(e, c, true)}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {mobileSection === "biz" && (
                <div className="space-y-2">
                  <div className="mt-1 grid">
                    {CAPABILITY_SLUGS.map((slug) => (
                      <Link key={slug} href={`/capabilities/${slug}`} className="py-2 text-xl" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>{dict.capabilityNames[slug]}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}


