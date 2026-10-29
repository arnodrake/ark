"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Flag from "@/components/Flag";
import { useI18n, useSetLocale } from "@/components/I18nProvider";
import { LANGUAGE_META, LOCALES, type Locale } from "@/lib/i18n/config";

const LANGUAGES = LOCALES.map((code) => ({ code, ...LANGUAGE_META[code] }));

function useLanguage() {
  const { locale, dict } = useI18n();
  const { setLocale } = useSetLocale();
  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
  const select = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };
  return { current, select, selectLabel: dict.nav.selectLanguage, languageLabel: dict.nav.language };
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const OPEN_WIDTH = 240;
const HEADER_HEIGHT = 64;
const DIVIDER_HEIGHT = 28;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;
const CLOSE_MS = 340;

export default function LanguageSwitcher({
  className,
  onOpenChange,
}: {
  className?: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const prefersReduced = useReducedMotion();
  const { current, select, selectLabel, languageLabel } = useLanguage();
  const [open, setOpen] = useState(false);
  const [closedWidth, setClosedWidth] = useState(0);
  const [shiftX, setShiftX] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const others = LANGUAGES.filter((l) => l.code !== current.code);

  // Keep the header dark until the collapse finishes so the black frame never floats alone.
  useEffect(() => {
    if (open || prefersReduced) {
      onOpenChange?.(open);
      return;
    }
    const id = setTimeout(() => onOpenChange?.(false), CLOSE_MS);
    return () => clearTimeout(id);
  }, [open, onOpenChange, prefersReduced]);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setClosedWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (open) return;
    const el = rootRef.current;
    if (el) {
      // Grow rightward from the left divider; only nudge left if the viewport is too narrow.
      const overflowRight = el.getBoundingClientRect().left + OPEN_WIDTH - (window.innerWidth - 8);
      setShiftX(-Math.max(0, overflowRight));
    }
    setOpen(true);
  };
  const hideSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Overlapping phases (transform/opacity only): divider spreads → area fills → list slides out.
  const t = (openAt: number, closeAt: number, duration: number) => ({
    duration: prefersReduced ? 0 : duration,
    delay: prefersReduced ? 0 : open ? openAt : closeAt,
    ease: open ? EASE_OUT : EASE_IN_OUT,
  });
  const spread = t(0, 0.1, 0.34);
  const lines = t(0.08, 0.1, 0.28);
  const fill = t(0.06, 0.18, 0.26);

  const ready = closedWidth > 0;
  const closedScale = ready ? closedWidth / OPEN_WIDTH : 1;
  const lineScale = DIVIDER_HEIGHT / HEADER_HEIGHT;

  const closedContent = (
    <>
      <Flag code={current.flag} className="h-[18px] w-[27px]" />
      <span>{current.short}</span>
      <Chevron open={false} />
    </>
  );

  return (
    <div ref={rootRef} className={`relative h-16 ${className ?? ""}`} onMouseEnter={show} onMouseLeave={hideSoon}>
      {/* Invisible copy sets the closed footprint so the nav never shifts. */}
      <div aria-hidden className="invisible flex h-16 items-center gap-2 px-5 text-[15px]">
        {closedContent}
      </div>

      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-50"
        style={{ width: OPEN_WIDTH }}
        initial={false}
        animate={{ x: open ? shiftX : 0 }}
        transition={spread}
      >
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 h-16 w-full origin-left bg-neutral-950 will-change-transform"
          initial={false}
          animate={{ scaleX: open ? 1 : closedScale, opacity: open ? 1 : 0 }}
          transition={{ scaleX: spread, opacity: fill }}
        />
        {ready &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute left-0 top-0 h-16 w-px bg-white will-change-transform"
              initial={false}
              animate={{
                x: i === 0 ? 0 : open ? OPEN_WIDTH - 1 : closedWidth - 1,
                scaleY: open ? 1 : lineScale,
                opacity: open ? 0.15 : 0.8,
              }}
              transition={{ x: spread, scaleY: lines, opacity: lines }}
            />
          ))}

        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`${languageLabel}: ${current.label}`}
          onClick={() => (open ? setOpen(false) : show())}
          className="pointer-events-auto relative flex h-16 cursor-pointer items-center text-[15px] text-white/90 transition-colors hover:text-white"
          style={{ width: open || !ready ? OPEN_WIDTH : closedWidth }}
        >
          <motion.span
            className="absolute inset-y-0 left-0 flex items-center justify-center gap-2"
            style={{ width: closedWidth || "100%" }}
            initial={false}
            animate={{ opacity: open ? 0 : 1 }}
            transition={open ? t(0, 0, 0.12) : t(0, 0.26, 0.2)}
          >
            {closedContent}
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center gap-3 px-4 text-white"
            initial={false}
            animate={{ opacity: open ? 1 : 0, x: open ? 0 : -6 }}
            transition={open ? t(0.14, 0, 0.24) : t(0, 0, 0.12)}
          >
            <Flag code={current.flag} className="h-[18px] w-[27px]" />
            <span className="flex-1 whitespace-nowrap text-left">{current.label}</span>
            <Chevron open />
          </motion.span>
        </button>

        {/* Clip box at the header's bottom edge, so the list slides out from underneath it. */}
        <div className="absolute left-0 top-16 w-full overflow-hidden pb-10">
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                role="listbox"
                aria-label={selectLabel}
                initial={{ y: "-101%" }}
                animate={{ y: 0, transition: { duration: prefersReduced ? 0 : 0.34, delay: prefersReduced ? 0 : 0.16, ease: EASE_OUT } }}
                exit={{ y: "-101%", opacity: 0, transition: { y: { duration: prefersReduced ? 0 : 0.22, ease: EASE_IN_OUT }, opacity: { duration: prefersReduced ? 0 : 0.2, delay: prefersReduced ? 0 : 0.04 } } }}
                className="pointer-events-auto border-x border-b border-white/15 bg-neutral-950 py-2 shadow-[0_18px_36px_rgba(0,0,0,0.35)] will-change-transform"
              >
                {others.map((lang) => (
                  <li key={lang.code} role="option" aria-selected={false} lang={lang.htmlLang}>
                    <button
                      type="button"
                      onClick={() => {
                        select(lang.code);
                        setOpen(false);
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Flag code={lang.flag} className="h-[18px] w-[27px]" />
                      <span className="flex-1">
                        <span className="block text-[15px] leading-tight">{lang.label}</span>
                        <span className="block text-xs text-white/45">{lang.region}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export function MobileLanguageList({ onSelect }: { onSelect?: () => void }) {
  const { current, select } = useLanguage();
  return (
    <div className="grid gap-1">
      {LANGUAGES.map((lang) => {
        const selected = lang.code === current.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              select(lang.code);
              onSelect?.();
            }}
            className={`flex cursor-pointer items-center gap-3 py-2 text-left text-xl ${selected ? "text-white" : "text-white/70"}`}
          >
            <Flag code={lang.flag} className="h-[20px] w-[30px]" />
            <span className="flex-1">{lang.label}</span>
            {selected ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12l5 5 9-10" />
              </svg>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
