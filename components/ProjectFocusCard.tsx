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

/** Mobile: blur only in the top/bottom 15% of the viewport; middle 70% stays sharp. */
function computeCardFocusProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const cardCenter = rect.top + rect.height / 2;

  const edge = 0.15;
  const sharpTop = vh * edge;
  const sharpBottom = vh * (1 - edge);

  if (cardCenter >= sharpTop && cardCenter <= sharpBottom) return 1;

  const dist =
    cardCenter < sharpTop ? sharpTop - cardCenter : cardCenter - sharpBottom;
  const edgeBand = vh * edge;
  const t = Math.min(1, dist / edgeBand);
  return 1 - Math.pow(t, 1.6) * 0.55;
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

type ProjectFocusGridProps = {
  children: ReactNode;
  className?: string;
};

export function ProjectFocusGrid({ children, className }: ProjectFocusGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const progress = useMotionValue(reduced ? 1 : 0);

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

  return (
    <FocusProgressContext.Provider value={progress}>
      <FocusMobileContext.Provider value={isMobile}>
        <div ref={ref} className={className}>
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
  const cardRef = useRef<HTMLDivElement>(null);
  const cardProgress = useMotionValue(reduced ? 1 : 1);
  const fallback = useMotionValue(1);
  const usePositionMobile = isMobile;

  const syncCard = useCallback(() => {
    const el = cardRef.current;
    if (!el || reduced || !usePositionMobile) return;
    cardProgress.set(computeCardFocusProgress(el));
  }, [cardProgress, reduced, usePositionMobile]);

  useEffect(() => {
    if (reduced || !usePositionMobile) {
      cardProgress.set(1);
      return;
    }

    syncCard();
    window.addEventListener("scroll", syncCard, { passive: true });
    window.addEventListener("resize", syncCard, { passive: true });
    window.addEventListener("touchmove", syncCard, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncCard);
      window.removeEventListener("resize", syncCard);
      window.removeEventListener("touchmove", syncCard);
    };
  }, [cardProgress, reduced, syncCard, usePositionMobile]);

  const source = usePositionMobile ? cardProgress : gridProgress ?? fallback;
  const effective = useTransform(source, (v) => {
    const p = typeof v === "number" ? v : 0;
    if (titleFocus && !isMobile) return remapTitleFocus(p, isMobile);
    return p;
  });
  const hoverFocus = useMotionValue(0);
  const hoverFocusSpring = useSpring(hoverFocus, {
    stiffness: 520,
    damping: 34,
    mass: 0.55,
  });
  const canHover = interactive && !isMobile && !reduced;

  const filter = useTransform([effective, hoverFocusSpring], ([v, h]) => {
    if (reduced) return "blur(0px)";
    const progress = typeof v === "number" ? v : 0;
    const hover = typeof h === "number" ? h : 0;
    const max = isMobile ? 6 : 8;
    const defocus = 1 - progress;
    const scrollBlur = max * Math.pow(defocus, 1.35);
    return `blur(${(scrollBlur * (1 - hover)).toFixed(2)}px)`;
  });
  const opacity = useTransform([effective, hoverFocusSpring], ([v, h]) => {
    if (reduced) return 1;
    const progress = typeof v === "number" ? v : 0;
    const hover = typeof h === "number" ? h : 0;
    const min = isMobile ? 0.82 : 0.72;
    const scrollOpacity = min + (1 - min) * progress;
    return scrollOpacity + (1 - scrollOpacity) * hover;
  });

  return (
    <motion.div
      ref={cardRef}
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
