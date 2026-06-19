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
    : { peak: 0.4, blurReturnStart: 0.6 };
}

/** Focus 0 = max blur, 1 = sharp. Peaks mid-scroll; blur returns when scrolling past. */
function computeFocusProgress(el: HTMLElement, isMobile: boolean): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const travel = vh + rect.height;
  if (travel <= 0) return 1;

  const t = Math.max(0, Math.min(1, (vh - rect.top) / travel));
  const { peak, blurReturnStart } = getFocusCurve(isMobile);

  if (t <= peak) return t / peak;
  if (t <= blurReturnStart) return 1;
  return Math.max(0, (1 - t) / (1 - blurReturnStart));
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
};

export default function ProjectFocusCard({ children, className }: ProjectFocusCardProps) {
  const progress = useContext(FocusProgressContext);
  const isMobile = useContext(FocusMobileContext);
  const reduced = useReducedMotion() ?? false;
  const fallback = useMotionValue(1);
  const source = progress ?? fallback;

  const filter = useTransform(source, (v) => {
    if (reduced) return "blur(0px)";
    const max = isMobile ? 4 : 8;
    return `blur(${max * (1 - v)}px)`;
  });
  const opacity = useTransform(source, (v) => {
    if (reduced) return 1;
    const min = isMobile ? 0.9 : 0.72;
    return min + (1 - min) * v;
  });

  return (
    <motion.div
      style={{ filter, opacity }}
      className={`transform-gpu will-change-[filter,opacity] ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
