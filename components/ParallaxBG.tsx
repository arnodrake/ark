"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

type ParallaxBGProps = PropsWithChildren<{
  className?: string;
}>;

export function ParallaxBG({ className, children }: ParallaxBGProps) {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -40]);
  const yFast = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : -80]);

  return (
    <div className={`relative isolate ${className ?? ""}`}>
      {/* Soft glow */}
      <motion.div
        aria-hidden
        style={{ y: ySlow }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-1/3 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,189,248,0.18), rgba(59,130,246,0.12) 40%, transparent)",
          }}
        />
      </motion.div>

      {/* SVG grid */}
      <motion.svg
        aria-hidden
        style={{ y: yFast }}
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.25]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-white/10" />
        <rect width="100%" height="100%" fill="url(#grid)" className="text-white/5" transform="scale(2)" />
      </motion.svg>

      {children}
    </div>
  );
}

export default ParallaxBG;


