"use client";

import { Anton } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

export default function AutomationIntegrationPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-950 text-white mt-16">
        <div className="mx-auto max-w-7xl px-6 py-[140px] md:py-[160px]">
          <h1 className={`${anton.className} text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase`}>Automation Integration</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 space-y-6 text-lg leading-8 text-neutral-800">
          <p>
            We integrate robotics, PLCs, motion, and safety into production cells and lines—taking equipment from mechanical install to a verified, documented state. Our teams align fixtures, land I/O, bring up programs, and run staged tests with the OEM and end‑user until every interlock and sequence is proven.
          </p>
          <p>
            Typical scope covers robot placement and cable management, PLC and HMI panel wiring, device commissioning over EtherNet/IP/PROFINET, safety relays and scanners, and recipe or mode handling. We coordinate alongside mechanical and process trades so upstream and downstream equipment handshake cleanly.
          </p>
          <p>
            On Tesla and Rivian programs we executed changeovers under tight windows—pre‑wiring cabinets, validating offline where possible, and cutting over by zone to preserve schedule. In semiconductor projects we interfaced ASML and TEL tools with plant systems, managing grounding, shielding, and EMI considerations.
          </p>
          <p>
            Documentation is part of the work: I/O maps, network plans, safety validation results, and as‑built drawings delivered with turnover, so operations can maintain and improve with confidence.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}


