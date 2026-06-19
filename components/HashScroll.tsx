"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHash } from "@/lib/scroll-to-hash";

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      const hash = window.location.hash;
      if (!hash) return;
      requestAnimationFrame(() => {
        scrollToHash(hash, false);
      });
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [pathname]);

  return null;
}
