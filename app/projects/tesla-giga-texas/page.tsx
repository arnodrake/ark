import Image from "next/image";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

export default function TeslaGigaTexas() {
  return (
    <>
      <Header />
      <main className="pt-16 mx-auto max-w-5xl px-6 py-16">
        <header className="mt-24 md:mt-28 lg:mt-32 space-y-3">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Tesla Giga Texas: Building the Core of Tomorrow’s Factory</h1>
          <p className="text-neutral-700">When Precision Meets Scale — Ark Automation Inside Tesla’s Most Ambitious Gigafactory</p>
          <p className="text-sm text-neutral-500">Austin, Texas | 2025 | 8 min read</p>
        </header>

      <figure className="mt-6 relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-200">
        <Image
          src="/projects/gigatexas.jpg"
          alt="Tesla Giga Texas — aerial view"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </figure>

      <article className="prose prose-neutral max-w-none text-[1.06rem] md:text-[1.125rem]">
        <h2 className="font-semibold mt-8 mb-0">A Factory That Defines the Future</h2>

        <p>
          In the heart of Austin, Texas, where miles of steel, cable, and machinery converge, Ark Automation helped bring Tesla’s Giga Texas to life.
          This project wasn’t just about installation — it was about engineering the physical nervous system of one of the world’s most advanced manufacturing sites.
        </p>
        <p>
          When Tesla envisioned the next generation of EV production, every system — from power to data to safety — had to work in harmony. That’s where Ark Automation came in.
        </p>

        <h2 className="font-semibold mt-8 mb-0">Designing for Scale and Adaptability</h2>

        <section className="mt-4 grid gap-8 md:grid-cols-5 items-start">
          <div className="md:col-span-3 space-y-4">
            <p>
              To meet Tesla’s demand for speed and modularity, Ark Automation implemented a fully integrated cable tray system, designed for both heavy power and precise control routing across the plant floor.
              Each tray was supported by custom-engineered structural steel frameworks, aligned to millimeter precision and built to support future line reconfiguration.
            </p>
            <p>
              This modular approach enabled rapid deployment, clear cable separation, and long-term maintainability — a foundation built to evolve as production expands.
            </p>
            <p>
              Across miles of production lines, clearly segregated power and control pathways reduced interference and simplified troubleshooting. The tray architecture was documented for future line moves, minimizing downtime when retooling.
            </p>
            <p>
              Working areas were sequenced with on‑site logistics so that structural trades, robotics integrators, and our teams could advance in lockstep — keeping installation continuous without bottlenecks.
            </p>
          </div>
          <figure className="md:col-span-2 relative w-full overflow-hidden rounded-lg">
            <Image src="/projects/gigatexas2.jpg" alt="Cable tray and structural steel frameworks" width={1200} height={1800} className="w-full h-auto object-contain" />
          </figure>
        </section>

        <h2 className="font-semibold mt-12 mb-0">Precision in Every Detail</h2>

        <section className="mt-4 grid gap-8 md:grid-cols-5 items-start">
          <div className="md:col-span-3 space-y-4">
            <p>
              Inside Tesla’s laser rooms, where precision defines performance, our team installed and commissioned electrical and control systems with uncompromising accuracy.
              We integrated power, control, and safety circuits across robotic cells, ensuring every connection was verified, labeled, and continuity-tested.
            </p>
            <p>
              Grounding systems were installed to meet strict EMI isolation standards, protecting both operators and automation equipment. Across the facility, over 60,000 feet of cable were routed, supported, and validated to Tesla’s global specifications.
            </p>
            <p>
              Acceptance testing covered continuity, torque, and functional checks through staged bring‑up so that adjacent cells could go live without rework. The result: a repeatable standard for every expansion phase.
            </p>
          </div>
          <figure className="md:col-span-2 relative w-full overflow-hidden rounded-lg">
            <Image src="/projects/gigatexas3.jpg" alt="Precision installations and robotic cells" width={1200} height={1800} className="w-full h-auto object-contain" />
          </figure>
        </section>

        <h2 className="font-semibold mt-8 mb-0">Coordinated Execution</h2>

        <p>
          Working alongside structural, robotics, and mechanical trades, Ark Automation delivered a synchronized build plan that kept pace with Tesla’s aggressive schedule.
          Daily field coordination ensured every tray, bracket, and junction aligned with active construction phases — allowing power, network, and automation systems to come online in sequence.
        </p>
        <p>
          Safety was the non-negotiable constant. Every task, from torque checks to lift operations, was documented and verified, ensuring zero compromise between progress and protection.
        </p>

        <h2 className="font-semibold mt-8 mb-0">Impact That Scales</h2>

        <p>
          The systems delivered by Ark Automation now serve as the operational backbone of Tesla’s Giga Texas — powering automated lines, laser systems, and robotic cells with speed and reliability.
          Our integration work didn’t just complete a factory; it enabled a future of scalable, intelligent production.
        </p>

        <h2 className="font-semibold mt-8 mb-0">Built for the Future</h2>

        <p>
          At Ark Automation, we deliver integrated electrical, network, and automation systems that power the world’s most advanced industrial systems.
        </p>

        <p>
          Through advanced engineering and disciplined execution, we help industries run more reliably, efficiently, and safely than ever before.
        </p>
      </article>
      </main>
      <SiteFooter />
    </>
  );
}


