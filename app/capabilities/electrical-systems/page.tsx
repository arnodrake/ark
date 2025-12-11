"use client";

import { Anton } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

export default function ElectricalSystemsPage() {
  return (
    <main>
      {/* Hero header band - black background to ensure header visibility */}
      <section className="relative overflow-hidden bg-neutral-950 text-white mt-16">
        <div className="mx-auto max-w-7xl px-6 py-[140px] md:py-[160px]">
          <h1 className={`${anton.className} text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase`}>Electrical Systems</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 space-y-6 text-lg leading-8 text-neutral-800">
          <p>
            We engineer, install, and commission plant-scale electrical systems that power production at automotive, logistics, and semiconductor facilities. Our teams integrate high-capacity distribution with precise control wiring so equipment can be brought online quickly, run safely, and scale with future demand.
          </p>
          <p>
            Scope typically includes medium- and low-voltage distribution, MCCs and panelboards, transformer placement and terminations, and clean, labeled control wiring to drives, robots, tooling, and safety circuits. We coordinate with structural and mechanical trades to stage power early, sequenced to construction milestones so lines can be energized on schedule.
          </p>
          <p>
            On recent programs our crews delivered end-to-end work packages: setting and aligning transformers; installing bus, tray, and conduit; pulling power and control; landing to VFDs and PLC cabinets; performing torque, insulation resistance, and continuity tests; and supporting energization with documented checks for every feeder and circuit.
          </p>
          <p>
            Our experience on high-visibility projects—Tesla Model Y expansions, Mercedes‑Benz line modernizations, and large-scale distribution centers—means we understand how to keep sites moving: clear drawings, daily field coordination, safe lift plans, and disciplined QA to avoid rework.
          </p>
          <p>
            Whether you need a greenfield backbone or a brownfield changeover inside tight windows, we execute with the same standard: power that is dependable, maintainable, and ready for production.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}


