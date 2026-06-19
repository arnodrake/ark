"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

const MOBILE_MQ = "(max-width: 767px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/** Focus 0 = max blur, 1 = sharp. Desktop scroll focus curve. */
function computeFocusProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const travel = vh + rect.height;
  if (travel <= 0) return 1;

  const t = Math.max(0, Math.min(1, (vh - rect.top) / travel));
  const peak = 0.26;
  const blurReturnStart = 0.6;

  if (t <= peak) return Math.pow(t / peak, 0.65);
  if (t <= blurReturnStart) return 1;
  return Math.max(0, (1 - t) / (1 - blurReturnStart));
}

/** Desktop title: delayed focus until first project row is partly visible. */
function remapTitleFocus(v: number): number {
  const start = 0.28;
  const end = 0.66;

  if (v <= start) return (v / start) * 0.18;
  if (v >= end) return 1;
  return 0.18 + ((v - start) / (end - start)) * 0.82;
}

/**
 * Mobile-only viewport edge blur for Representative Projects.
 * Blurs only the top/bottom 15% bands via backdrop-filter — content stays sharp underneath.
 */
function MobileRepresentativeProjectsEdgeBlur({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isMobile || reduced) {
      setActive(false);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [containerRef, isMobile, reduced]);

  if (!isMobile || reduced || !active) return null;

  const bandClass =
    "pointer-events-none fixed inset-x-0 z-[25] h-[15dvh] md:hidden backdrop-blur-[2px]";

  return (
    <>
      <div
        aria-hidden
        className={`${bandClass} top-0`}
        style={{
          WebkitBackdropFilter: "blur(2px)",
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className={`${bandClass} bottom-0`}
        style={{
          WebkitBackdropFilter: "blur(2px)",
          maskImage: "linear-gradient(to top, black 0%, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 50%, transparent 100%)",
        }}
      />
    </>
  );
}

const FocusProgressContext = createContext<MotionValue<number> | null>(null);
const FocusMobileContext = createContext(false);

type ProjectFocusGridProps = {
  children: ReactNode;
  className?: string;
};

/** Representative Projects grid — desktop scroll focus + mobile viewport edge blur. */
export function ProjectFocusGrid({ children, className }: ProjectFocusGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const progress = useMotionValue(reduced ? 1 : 0);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el || reduced || isMobile) return;
    progress.set(computeFocusProgress(el));
  }, [progress, reduced, isMobile]);

  useEffect(() => {
    if (reduced || isMobile) {
      progress.set(1);
      return;
    }

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [progress, reduced, isMobile, sync]);

  return (
    <FocusProgressContext.Provider value={progress}>
      <FocusMobileContext.Provider value={isMobile}>
        <div ref={ref} className={className}>
          {children}
        </div>
        <MobileRepresentativeProjectsEdgeBlur containerRef={ref} />
      </FocusMobileContext.Provider>
    </FocusProgressContext.Provider>
  );
}

type ProjectFocusCardProps = {
  children: ReactNode;
  className?: string;
  /** Hover to snap focus clear (desktop); includes lift scale. */
  interactive?: boolean;
  /** Section title: delayed focus until first project row is partly visible. */
  titleFocus?: boolean;
};

export default function ProjectFocusCard({
  children,
  className,
  interactive = false,
  titleFocus = false,
}: ProjectFocusCardProps) {
  const gridProgress = useContext(FocusProgressContext);
  const isMobile = useContext(FocusMobileContext);
  const reduced = useReducedMotion() ?? false;
  const fallback = useMotionValue(1);
  const source = gridProgress ?? fallback;

  const effective = useTransform(source, (v) => {
    if (isMobile || reduced) return 1;
    const p = typeof v === "number" ? v : 0;
    return titleFocus ? remapTitleFocus(p) : p;
  });

  const hoverFocus = useMotionValue(0);
  const hoverFocusSpring = useSpring(hoverFocus, {
    stiffness: 520,
    damping: 34,
    mass: 0.55,
  });
  const canHover = interactive && !isMobile && !reduced;

  const filter = useTransform([effective, hoverFocusSpring], ([v, h]) => {
    if (reduced || isMobile) return "blur(0px)";
    const progress = typeof v === "number" ? v : 0;
    const hover = typeof h === "number" ? h : 0;
    const scrollBlur = 8 * Math.pow(1 - progress, 1.35);
    return `blur(${(scrollBlur * (1 - hover)).toFixed(2)}px)`;
  });

  const opacity = useTransform([effective, hoverFocusSpring], ([v, h]) => {
    if (reduced || isMobile) return 1;
    const progress = typeof v === "number" ? v : 0;
    const hover = typeof h === "number" ? h : 0;
    const scrollOpacity = 0.72 + 0.28 * progress;
    return scrollOpacity + (1 - scrollOpacity) * hover;
  });

  return (
    <motion.div
      style={{ filter, opacity }}
      className={`transform-gpu will-change-[filter,opacity,transform] ${className ?? ""}`}
      onHoverStart={canHover ? () => hoverFocus.set(1) : undefined}
      onHoverEnd={canHover ? () => hoverFocus.set(0) : undefined}
      whileHover={canHover ? { scale: 1.05, y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
