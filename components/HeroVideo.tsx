"use client";

import { useReducedMotion } from "framer-motion";

export default function HeroVideo() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0">
      {/* top gradient to improve text contrast */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      {/* background video */}
      {!prefersReduced ? (
        <video
          key="hero-video"
          className="absolute inset-0 h-full w-full object-cover object-[20%_50%] md:object-center"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/hero/Sequence01.jpg"
        >
          <source src="/hero/Sequence01.webm" type="video/webm" />
          <source src="/hero/Sequence01.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 h-full w-full bg-neutral-900" />
      )}
    </div>
  );
}


