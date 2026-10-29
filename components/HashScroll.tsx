"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PENDING_SECTION_KEY, scrollToSection } from "@/lib/scroll-to-hash";

/** Finishes a cross-page SectionLink jump and strips any #hash so the URL stays clean. */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    }
    if (pathname !== "/") return;
    const section = sessionStorage.getItem(PENDING_SECTION_KEY);
    if (!section) return;
    sessionStorage.removeItem(PENDING_SECTION_KEY);
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(section, false)));
  }, [pathname]);

  return null;
}
