"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
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

function getFocusCurve(isMobile: boolean) {
  return isMobile
    ? { peak: 0.16, blurReturnStart: 0.93 }
    : { peak: 0.26, blurReturnStart: 0.6 };
}

/** Focus 0 = max blur, 1 = sharp. Peaks mid-scroll; blur returns when scrolling past. */
function computeFocusProgress(el: HTMLElement, isMobile: boolean): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const travel = vh + rect.height;
  if (travel <= 0) return 1;

  const t = Math.max(0, Math.min(1, (vh - rect.top) / travel));
  const { peak, blurReturnStart } = getFocusCurve(isMobile);

  if (t <= peak) return Math.pow(t / peak, 0.65);
  if (t <= blurReturnStart) return 1;
  return Math.max(0, (1 - t) / (1 - blurReturnStart));
}

/** Title stays blurred longer; clears when first card row is ~half visible. */
function remapTitleFocus(v: number, isMobile: boolean): number {
  const start = isMobile ? 0.22 : 0.28;
  const end = isMobile ? 0.58 : 0.66;

  if (v <= start) return (v / start) * 0.18;
  if (v >= end) return 1;
  return 0.18 + ((v - start) / (end - start)) * 0.82;
}

const FocusProgressContext = createContext<MotionValue<number> | null>(null);
const FocusMobileContext = createContext(false);

const edgeBlurMask = {
  top: "linear-gradient(to bottom, black 70%, transparent 100%)",
  bottom: "linear-gradient(to top, black 70%, transparent 100%)",
} as const;

function MobileViewportEdgeBlur({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[25] h-[15dvh] md:hidden"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: edgeBlurMask.top,
          WebkitMaskImage: edgeBlurMask.top,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[25] h-[15dvh] md:hidden"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: edgeBlurMask.bottom,
          WebkitMaskImage: edgeBlurMask.bottom,
        }}
      />
    </>
  );
}

type ProjectFocusGridProps = {
  children: ReactNode;
  className?: string;
};

export function ProjectFocusGrid({ children, className }: ProjectFocusGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const progress = useMotionValue(reduced ? 1 : 0);
  const [edgeBlurActive, setEdgeBlurActive] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el || reduced) return;
    progress.set(computeFocusProgress(el, isMobile));
  }, [progress, reduced, isMobile]);

  useEffect(() => {
    if (reduced) {
      progress.set(1);
      return;
    }

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    window.addEventListener("touchmove", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("touchmove", sync);
    };
  }, [progress, reduced, sync]);

  useEffect(() => {
    if (!isMobile || reduced) {
      setEdgeBlurActive(false);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setEdgeBlurActive(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, reduced]);

  return (
    <FocusProgressContext.Provider value={progress}>
      <FocusMobileContext.Provider value={isMobile}>
        <div ref={ref} className={className}>
          <MobileViewportEdgeBlur active={edgeBlurActive} />
          {children}
        </div>
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
  const source = !isMobile ? gridProgress ?? fallback : fallback;

  const effective = useTransform(source, (v) => {
    if (isMobile) return 1;
    const p = typeof v === "number" ? v : 0;
    return titleFocus ? remapTitleFocus(p, false) : p;
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
