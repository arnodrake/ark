"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      aria-label="Back to top"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
      transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed bottom-6 right-6 z-50 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 border border-neutral-200 shadow-md hover:bg-black hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </motion.button>
  );
}


