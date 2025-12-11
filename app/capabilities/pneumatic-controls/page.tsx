"use client";

import { Anton } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

export default function PneumaticControlsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-950 text-white mt-16">
        <div className="mx-auto max-w-7xl px-6 py-[140px] md:py-[160px]">
          <h1 className={`${anton.className} text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase`}>Pneumatic Controls</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 space-y-6 text-lg leading-8 text-neutral-800">
          <p>
            We build reliable pneumatic control systems for high-throughput manufacturing—robot end‑effectors, fixturing, clamp stations, and material handling where clean, repeatable actuation matters. Our teams deliver both the hardware and the logic, ensuring motion interacts safely with robots, tooling, and people.
          </p>
          <p>
            Services include manifold and FRL installation, valve banks, vacuum generation, cylinder integration, and sensor wiring back to the PLC. We route stainless or aluminum tube with tidy identification and provide drain/relief planning so systems remain stable under cycles and environmental change.
          </p>
          <p>
            At Mercedes‑Benz and Lucid programs, we executed live retrofits with limited downtime—pre‑fabricating assemblies, landing I/O, and validating interlocks cell by cell. Every circuit is leak‑checked and cycle‑tested with the controls team before hand‑off.
          </p>
          <p>
            The result: actuation that is quiet, predictable, and maintainable—documented for maintenance and ready for continuous production.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}


