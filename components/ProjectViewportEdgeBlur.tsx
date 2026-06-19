"use client";

import { useEffect, useState } from "react";

const EDGE_VH = 15;

/**
 * Mobile-only fixed viewport bands: content scrolling underneath is blurred
 * only within the top/bottom 15% of the screen — never the whole card.
 */
export default function ProjectViewportEdgeBlur() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;

    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      if (!mq.matches) {
        setActive(false);
        return;
      }
      const rect = section.getBoundingClientRect();
      setActive(rect.bottom > 0 && rect.top < window.innerHeight);
    };

    update();
    const observer = new IntersectionObserver(() => update(), { threshold: 0 });
    observer.observe(section);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    mq.addEventListener("change", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  if (!active) return null;

  const bandClass =
    "pointer-events-none fixed inset-x-0 z-30 md:hidden bg-black/[0.04] backdrop-blur-[7px] saturate-[1.15]";

  return (
    <>
      <div
        aria-hidden
        className={`${bandClass} top-0`}
        style={{
          height: `${EDGE_VH}dvh`,
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className={`${bandClass} bottom-0`}
        style={{
          height: `${EDGE_VH}dvh`,
          WebkitMaskImage: "linear-gradient(to top, black 0%, black 35%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 0%, black 35%, transparent 100%)",
        }}
      />
    </>
  );
}
