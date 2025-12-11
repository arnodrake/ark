"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const SLIDES = [{ src: "/hero/dandelion.jpg", alt: "Dandelion at sunset in a meadow" }];

export default function HeroCarousel() {
  const prefersReduced = useReducedMotion();
  const [failed, setFailed] = useState(false);

  // Fallback gradient if no valid images
  if (failed) {
    return (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0b1220 0%, #1b2a44 35%, #3b3a57 60%, #a45a33 85%, #f2a65a 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 1, scale: prefersReduced ? 1 : 1.08 }}
        transition={{ duration: prefersReduced ? 0 : 6, ease: prefersReduced ? "linear" : [0.4, 0, 0.2, 1] }}
      >
        <Image
          src={SLIDES[0].src}
          alt={SLIDES[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      </motion.div>
    </div>
  );
}


