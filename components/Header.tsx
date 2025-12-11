"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { usePathname } from "next/navigation";
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

type MenuItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV: MenuItem[] = [
  {
    label: "About",
    href: "/#about",
    children: [
      { label: "Recent Projects", href: "/#projects" },
      { label: "Our Mission", href: "/#future" },
    ],
  },
  {
    label: "Businesses",
    href: "/#capabilities",
    children: [
      { label: "Electrical Systems", href: "/capabilities/electrical-systems" },
      { label: "Pneumatic Controls", href: "/capabilities/pneumatic-controls" },
      { label: "Network Infrastructure", href: "/capabilities/network-infrastructure" },
      { label: "Automation Integration", href: "/capabilities/automation-integration" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const prefersReduced = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  // focusWithin 不再觸發展開，避免 Contact 點擊閃爍
  const [panelHover, setPanelHover] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [allowOverlay, setAllowOverlay] = useState(true);
  const [contactHover, setContactHover] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<null | "about" | "biz">(null);
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

  // 在行動選單展開/收起期間，頂部黑底由 overlay 動畫負責，header 本身保持透明以確保兩段動畫連貫
  const headerIsDarkBase = expanded || contactHover || !allowOverlay || !onHome;
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

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            role="menubar"
            className="hidden md:flex items-stretch gap-8 pr-4 md:pr-6"
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
                  href={item.href ?? "#"}
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
                  className={`inline-flex h-16 items-center px-2 text-lg md:text-lg font-medium ${expanded ? "text-white/90 hover:text-white" : darkBase ? "text-neutral-900 hover:text-neutral-950" : "text-white/90 hover:text-white"}`}
                >
                  {item.label}
                </Link>
                {/* Hover indicator line */}
                <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </div>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={mobileToggleRef}
            className="md:hidden inline-flex items-center justify-center text-white p-0 -mr-1.5"
            aria-label={mobileOpen ? (mobileSection ? "Back" : "Close navigation") : "Open navigation"}
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
            <span className="sr-only">Menu</span>
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
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1, transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.4, 0, 0.2, 1] } }}
              exit={{ opacity: 0, scaleY: 0.9, transition: { duration: prefersReduced ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] } }}
              className="absolute inset-0 z-0"
              style={{ transformOrigin: "top", willChange: "transform, opacity" }}
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
                <div className="relative mx-auto max-w-7xl px-6 py-6 grid grid-cols-12 gap-8 items-stretch">
                  {/* vertical divider at 1/3 width */}
                  <div className="pointer-events-none absolute top-6 bottom-6 left-[33.333%] w-px bg-white/25 hidden md:block" />
                  {/* Left column: large label with divider at golden ratio (approx 38%) */}
                  <div className="col-span-12 md:col-span-4 relative flex items-center self-stretch">
                    <h3 className={`${anton.className} text-4xl md:text-5xl font-normal text-white`}>
                      {NAV[(effectiveIdx ?? visibleIdxRef.current ?? 0)]?.label}
                    </h3>
                    {/* left column end */}
                  </div>
                  {/* Right column: children list */}
                  <div className="col-span-12 md:col-span-8 grid gap-2">
                    {(NAV[(effectiveIdx ?? visibleIdxRef.current ?? -1)]?.children ?? []).map((c, ci) => (
                      <Link
                        key={c.label}
                        href={c.href ?? "#"}
                        role="menuitem"
                        className="block rounded-md px-3 py-[5px] text-lg md:text-xl font-semibold text-white/90 hover:bg-white/10 hover:text-white"
                        autoFocus={ci === 0}
                        onKeyDown={(e) => { if (e.key === "Escape") { setOpenIdx(null); setActiveIdx(null); } }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {/* Header-height overlay (shared animation for Contact hover and About/Businesses expanded) */}
          {/* Header-height overlay：若 allowOverlay=false，改為靜態黑底，避免動畫重播 */}
          <>
            {!allowOverlay && contactHover && !expanded ? (
              <div className="absolute inset-x-0 top-0 h-16 bg-neutral-950 border-b border-neutral-800 z-0 pointer-events-none" />
            ) : (
              <AnimatePresence initial={false}>
                {contactHover && !expanded && (
                  <motion.div
                    key="contact-overlay"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1, transition: { duration: prefersReduced ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] } }}
                    exit={{ opacity: 0, scaleY: 0, transition: { duration: prefersReduced ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] } }}
                    className="absolute inset-x-0 top-0 h-16 bg-neutral-950 border-b border-neutral-800 z-0 pointer-events-none"
                    style={{ transformOrigin: "top" }}
                  />
                )}
              </AnimatePresence>
            )}
          </>
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
                  <button className="block w-full text-left text-2xl font-semibold" onClick={() => setMobileSection("about")}>About</button>
                  <button className="block w-full text-left text-2xl font-semibold" onClick={() => setMobileSection("biz")}>Businesses</button>
                  <Link href="/contact" className="block text-2xl font-semibold" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>Contact</Link>
                </div>
              )}
              {mobileSection === "about" && (
                <div className="space-y-2">
                  <div className="mt-1 grid">
                    <Link href="/#projects" className="py-2 text-xl" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>Recent Projects</Link>
                    <Link href="/#future" className="py-2 text-xl" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>Our Mission</Link>
                  </div>
                </div>
              )}
              {mobileSection === "biz" && (
                <div className="space-y-2">
                  <div className="mt-1 grid">
                    <Link href="/capabilities/electrical-systems" className="py-2 text-xl" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>Electrical Systems</Link>
                    <Link href="/capabilities/pneumatic-controls" className="py-2 text-xl" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>Pneumatic Controls</Link>
                    <Link href="/capabilities/network-infrastructure" className="py-2 text-xl" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>Network Infrastructure</Link>
                    <Link href="/capabilities/automation-integration" className="py-2 text-xl" onClick={() => { setMobileClosing(true); setMobileOpen(false); }}>Automation Integration</Link>
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


