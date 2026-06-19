"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useTransform,
  useReducedMotion,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import SafeImage from "@/components/SafeImage";

const COLLAGE_IMAGES = [
  { src: "/projects/gigatexas.jpg", alt: "Electrical & automation – Tesla Giga Texas" },
  { src: "/projects/Lucid.jpg", alt: "Automation integration – Lucid Motors" },
  { src: "/projects/Benz.jpg", alt: "Mechanical & electrical – Mercedes-Benz" },
  { src: "/projects/Rivian.jpg", alt: "Rivian manufacturing" },
] as const;

/** Offsets from final grid position toward each quadrant (percent of cell size). */
const QUADRANT_OFFSETS = [
  { x: -115, y: -115 },
  { x: 115, y: -115 },
  { x: -115, y: 115 },
  { x: 115, y: 115 },
] as const;

/** Mirrors useScroll offset: ["start end", "start 0.15"]. */
function computeScrollProgress(el: HTMLElement): number {
  const top = el.getBoundingClientRect().top;
  const vh = window.innerHeight;
  const startTop = vh;
  const endTop = vh * 0.15;
  const raw = (startTop - top) / (startTop - endTop);
  return Math.max(0, Math.min(1, raw));
}

function CollagePanel({
  index,
  progress,
  reduced,
  img,
}: {
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
  img: (typeof COLLAGE_IMAGES)[number];
}) {
  const offset = QUADRANT_OFFSETS[index];
  const x = useTransform(
    progress,
    [0, 0.8],
    reduced ? ["0%", "0%"] : [`${offset.x}%`, "0%"]
  );
  const y = useTransform(
    progress,
    [0, 0.8],
    reduced ? ["0%", "0%"] : [`${offset.y}%`, "0%"]
  );
  const opacity = useTransform(
    progress,
    [0, 0.16, 0.66],
    reduced ? [1, 1, 1] : [0, 0.85, 1]
  );

  return (
    <motion.div className="relative transform-gpu will-change-transform" style={{ x, y, opacity }}>
      <SafeImage
        src={img.src}
        alt={img.alt}
        fill
        sizes="(min-width:1024px) 50vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
    </motion.div>
  );
}

export default function CollageScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFullyHiddenRef = useRef(true);
  const reduced = useReducedMotion() ?? false;
  const progress = useMotionValue(reduced ? 1 : 0);

  const syncProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el || isFullyHiddenRef.current) return;
    progress.set(Math.max(progress.get(), computeScrollProgress(el)));
  }, [progress]);

  useEffect(() => {
    if (reduced) {
      progress.set(1);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          isFullyHiddenRef.current = true;
          progress.set(0);
          return;
        }

        isFullyHiddenRef.current = false;
        progress.set(Math.max(progress.get(), computeScrollProgress(el)));
      },
      { threshold: [0, 0.01] }
    );

    observer.observe(el);
    syncProgress();

    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress, { passive: true });
    window.addEventListener("touchmove", syncProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
      window.removeEventListener("touchmove", syncProgress);
    };
  }, [progress, reduced, syncProgress]);

  const logoOpacity = useTransform(
    progress,
    [0.3, 0.72],
    reduced ? [1, 1] : [0, 1]
  );
  const logoScale = useTransform(
    progress,
    [0.3, 0.72],
    reduced ? [1, 1] : [0.85, 1]
  );

  return (
    <div
      ref={containerRef}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
    >
      <div className="relative w-screen aspect-[1/1] md:aspect-[16/9] overflow-hidden">
        <div className="absolute inset-0 px-[5px] py-0">
          <div className="grid grid-cols-2 grid-rows-2 gap-[5px] h-full">
            {COLLAGE_IMAGES.map((img, i) => (
              <CollagePanel
                key={`collage-${i}`}
                index={i}
                progress={progress}
                reduced={reduced}
                img={img}
              />
            ))}
          </div>
        </div>
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transform-gpu"
          style={{ opacity: logoOpacity, scale: logoScale }}
        >
          <Image
            src="/ARK.svg"
            alt="ARK"
            width={390}
            height={180}
            className="w-auto h-28 md:h-[216px] invert brightness-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
          />
        </motion.div>
      </div>
    </div>
  );
}
