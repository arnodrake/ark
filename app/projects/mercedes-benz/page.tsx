import Image from "next/image";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

export default function MercedesBenz() {
  return (
    <>
      <Header />
      <main className="pt-16 mx-auto max-w-5xl px-6 py-16">
        <header className="mt-24 md:mt-28 lg:mt-32 space-y-3">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Mercedes-Benz: Innovation in Every Connection</h1>
          <p className="text-neutral-700">Modernizing the Line — Ark Automation Powers the Next Generation of Mercedes-Benz Vans</p>
          <p className="text-sm text-neutral-500">Charleston, South Carolina | 2024 | 7 min read</p>
        </header>

        {/* Header image */}
        <figure className="mt-6 relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image src="/projects/Benz.jpg" alt="Mercedes-Benz Vans — header" fill sizes="100vw" className="object-cover" priority />
        </figure>

        <article className="prose prose-neutral max-w-none text-[1.06rem] md:text-[1.125rem]">
          <h2 className="font-semibold mt-8 mb-0">Reimagining Productivity</h2>
          <p>
            At the Mercedes-Benz Vans plant in South Carolina, precision and efficiency drive every movement on the production floor.
            As the facility prepared for a major automation and electrical upgrade, it needed a partner capable of modernizing systems without halting operations.
            Our team at Ark Automation delivered a seamless transformation — upgrading power, controls, and automation systems while production continued at full pace.
          </p>

          <h2 className="font-semibold mt-12 mb-0">Upgrading for the Future</h2>
          <p>
            The project centered on the factory’s final assembly and conveyor zones, where legacy systems needed to meet new production targets.
            Ark Automation installed new power distribution panels, replaced outdated control cabinets, and re-routed network infrastructure to support higher data throughput.
          </p>
          <p>
            We executed PLC retrofits and line control reprogramming, ensuring full compatibility with Mercedes-Benz’s global automation standards.
            All new components — from cable trays to control enclosures — were built for scalability, enabling future equipment integration with minimal downtime.
          </p>

          {/* Full-width image (Benz2) */}
          <figure className="mt-6 w-full overflow-hidden rounded-lg">
            <Image src="/projects/Benz2.jpg" alt="Modernized production line at Mercedes-Benz Vans" width={1920} height={1080} className="w-full h-auto object-contain" />
          </figure>

          <h2 className="font-semibold mt-12 mb-0">Precision in a Live Environment</h2>
          <section className="mt-4 grid gap-8 md:grid-cols-5 items-start">
            <div className="md:col-span-3 space-y-4">
              <p>
                Working in an active production facility demanded timing, coordination, and discipline. Our crews operated in short maintenance windows, completing electrical changeovers, labeling, and testing before each shift’s restart.
                Every modification was documented and verified against Mercedes-Benz’s strict quality and safety protocols.
              </p>
              <p>
                We collaborated daily with the plant’s engineering and maintenance teams to align electrical, network, and mechanical adjustments — ensuring every improvement enhanced both performance and reliability.
              </p>
              <p>
                Staged validations were planned so that left‑side content height matched the right‑side image: commissioning checklists, torque logs, and continuity records together provided the run‑ready assurance for each area before hand‑back.
              </p>
            </div>
            <figure className="md:col-span-2 relative w-full overflow-hidden rounded-lg">
              <Image src="/projects/Benz3.jpg" alt="Automation and electrical upgrades within live production" width={1200} height={1800} className="w-full h-auto object-contain" />
            </figure>
          </section>

          <h2 className="font-semibold mt-12 mb-0">Driving Performance Through Integration</h2>
          <p>
            By combining advanced electrical systems with automation upgrades, the new production line achieved faster cycle times, improved system diagnostics, and safer operator control.
            Each upgraded section was validated under load to confirm power balance, signal integrity, and network stability — ready for continuous operation.
          </p>

          <h2 className="font-semibold mt-12 mb-0">Impact That Moves Forward</h2>
          <p>
            The upgraded systems delivered by Ark Automation now support Mercedes-Benz Vans’ U.S. production with greater efficiency, visibility, and uptime.
            Our work extended the life and performance of critical automation infrastructure — empowering the plant to build smarter, safer, and more connected vehicles.
          </p>

          <h2 className="font-semibold mt-12 mb-0">Built for the Future</h2>
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


