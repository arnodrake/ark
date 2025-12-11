import Image from "next/image";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

export default function LucidMotors() {
  return (
    <>
      <Header />
      <main className="pt-16 mx-auto max-w-5xl px-6 py-16">
        <header className="mt-24 md:mt-28 lg:mt-32 space-y-3">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Lucid Motors: Precision in Motion</h1>
          <p className="text-neutral-700">Engineering the Electric Future — Ark Automation Inside Lucid’s Advanced Manufacturing Line</p>
          <p className="text-sm text-neutral-500">Casa Grande, Arizona | 2024 | 7 min read</p>
        </header>

        <figure className="mt-6 relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <Image src="/projects/Lucid.jpg" alt="Lucid Motors — header" fill sizes="100vw" className="object-cover" priority />
        </figure>

        <article className="prose prose-neutral max-w-none text-[1.06rem] md:text-[1.125rem]">
          <h2 className="font-semibold mt-8 mb-0">A Vision for Electric Precision</h2>
          <p>
            Lucid Motors set out to redefine what an electric vehicle can be — combining elegance, performance, and precision engineering.
            To make that vision real, their Arizona manufacturing facility required absolute accuracy across every automation and electrical system.
            Our team delivered the infrastructure that keeps Lucid’s production moving with quiet confidence and technical perfection.
          </p>

          <h2 className="font-semibold mt-12 mb-0">Powering Performance with Control</h2>
          <section className="mt-4 grid gap-8 md:grid-cols-5 items-start">
            <div className="md:col-span-3 space-y-4">
              <p>
                Our work began where precision meets scale: in the body assembly and powertrain lines.
                Ark Automation installed high-performance electrical distribution and control systems, designed to support Lucid’s next-generation automation platforms.
              </p>
              <p>
                We delivered network and control integration across robotic cells, conveyor systems, and material-handling zones — ensuring real-time communication between PLCs, sensors, and safety devices.
                Cable management systems were designed for clarity and maintenance, with every termination labeled, torque-verified, and continuity-tested.
              </p>
            </div>
            <figure className="md:col-span-2 relative w-full overflow-hidden rounded-lg">
              <Image src="/projects/Lucid2.jpg" alt="Lucid production line" width={1200} height={1800} className="w-full h-auto object-contain" />
            </figure>
          </section>

          <h2 className="font-semibold mt-12 mb-0">Integration Without Interruption</h2>
          <p>
            Lucid’s facility operates on a live production schedule, meaning upgrades had to be performed without disrupting active manufacturing.
            Our field teams coordinated installations during limited shutdown windows, sequencing work across electrical, automation, and mechanical trades.
          </p>
          <p>
            Each control cabinet was wired, tested, and verified in parallel, enabling Lucid to maintain uptime while expanding capability.
            Grounding, shielding, and routing were engineered to protect precision equipment from interference — vital for the plant’s laser-guided processes and high-voltage systems.
          </p>

          <h2 className="font-semibold mt-12 mb-0">Built for Accuracy and Longevity</h2>
          <section className="mt-4 grid gap-8 md:grid-cols-5 items-start">
            <div className="md:col-span-3 space-y-4">
              <p>
                Every connection within Lucid’s automation environment was designed to meet both UL and NFPA 70 standards, backed by detailed documentation and system validation.
                We supported commissioning of the plant’s advanced powertrain and battery module lines — integrating power, control, and safety into a single, traceable system architecture.
              </p>
              <p>
                The result is a control architecture that is maintainable and future-ready, supporting clean expansions with consistent standards and documentation across the facility.
              </p>
            </div>
            <figure className="md:col-span-2 relative w-full overflow-hidden rounded-lg">
              <Image src="/projects/Lucid3.jpg" alt="Lucid systems and control" width={1200} height={1800} className="w-full h-auto object-contain" />
            </figure>
          </section>

          <h2 className="font-semibold mt-12 mb-0">Impact That Drives the Future</h2>
          <p>
            Today, the systems delivered by Ark Automation help power one of the world’s most refined EV production facilities.
            The result: a manufacturing platform that runs cleaner, faster, and smarter — supporting Lucid’s mission to build the most advanced electric vehicles ever made.
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


