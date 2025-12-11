"use client";

import { Anton } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

export default function NetworkInfrastructurePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-950 text-white mt-16">
        <div className="mx-auto max-w-7xl px-6 py-[140px] md:py-[160px]">
          <h1 className={`${anton.className} text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase`}>Network Infrastructure</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 space-y-6 text-lg leading-8 text-neutral-800">
          <p>
            We deploy industrial Ethernet and fiber networks that connect PLCs, drives, vision, and MES with resilient performance on the plant floor. Our approach blends clean installation with disciplined testing—so controls teams can rely on bandwidth, latency, and segmentation from day one.
          </p>
          <p>
            Deliverables include cabinet switches and patching, trunk and drop routing in tray/conduit, fiber pulls and terminations, OT patch panels, and labeling that mirrors logical topology. We splice and certify fiber with documented test results and hand over as‑built routes for maintenance.
          </p>
          <p>
            In semiconductor and EV programs we coordinated networks across large footprints—interfacing tool OEMs, segregating safety and motion traffic, and staging cutovers without interrupting commissioning. Where environments demand it, we specify hardened components and protective routing.
          </p>
          <p>
            The outcome is a plant network that is predictable, observable, and ready for scale.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}


