"use client";

import { ReactNode } from "react";

const EDGE_MASK =
  "linear-gradient(to bottom, black 0%, black 28%, transparent 100%)";
const EDGE_MASK_BOTTOM =
  "linear-gradient(to top, black 0%, black 28%, transparent 100%)";

/** Mobile-only viewport edge blur for Representative Projects cards (below the title). */
export default function RepresentativeProjectsEdgeBlur({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative md:contents">
      <div className="pointer-events-none sticky top-0 z-20 h-0 md:hidden" aria-hidden>
        <div
          className="absolute inset-x-0 top-0 h-[15dvh] backdrop-blur-[2.5px] bg-black/[0.04]"
          style={{
            maskImage: EDGE_MASK,
            WebkitMaskImage: EDGE_MASK,
          }}
        />
      </div>

      {children}

      <div className="pointer-events-none sticky bottom-0 z-20 h-0 md:hidden" aria-hidden>
        <div
          className="absolute inset-x-0 bottom-0 h-[15dvh] backdrop-blur-[2.5px] bg-black/[0.04]"
          style={{
            maskImage: EDGE_MASK_BOTTOM,
            WebkitMaskImage: EDGE_MASK_BOTTOM,
          }}
        />
      </div>
    </div>
  );
}
