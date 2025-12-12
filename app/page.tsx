"use client";

import Section from "@/components/Section";
import HeroCarousel from "@/components/HeroCarousel";
import HeroVideo from "@/components/HeroVideo";
import { Anton } from "next/font/google";
import RecentProjects from "@/components/RecentProjects";
import Image from "next/image";
import SafeImage from "@/components/SafeImage";
import SiteFooter from "@/components/SiteFooter";
import { useState, Fragment } from "react";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const LOGOS: Record<string, string> = {
    Tesla: "/logos/tesla.svg",
    TSMC: "/logos/tsmc.svg",
    ASML: "/logos/asml.svg",
    TEL: "/logos/tel.svg",
    Lucid: "/logos/lucid.svg",
    Rivian: "/logos/rivian.svg",
    Mercedes: "/logos/mercedes.svg",
    Amazon: "/logos/amazon.svg",
  };

  function pickLogo(title: string): { src: string; brand: string } | null {
    const t = title.toLowerCase();
    if (t.includes("tesla")) return { src: LOGOS.Tesla, brand: "Tesla" };
    if (t.includes("tsmc") || t.includes("asml") || t.includes("tel")) return { src: LOGOS.TSMC, brand: "TSMC" };
    if (t.includes("lucid")) return { src: LOGOS.Lucid, brand: "Lucid" };
    if (t.includes("rivian")) return { src: LOGOS.Rivian, brand: "Rivian" };
    if (t.includes("mercedes")) return { src: LOGOS.Mercedes, brand: "Mercedes-Benz" };
    if (t.includes("amazon")) return { src: LOGOS.Amazon, brand: "Amazon" };
    return null;
  }

      function LogoTitle({ title }: { title: string }) {
    const [failed, setFailed] = useState(false);
    const t = title.toLowerCase();
    // 特例：半導體卡片同時顯示三個 Logo
        if (t.includes("tsmc") && t.includes("asml") && t.includes("tel")) {
      return (
              <div className="flex items-center gap-0 translate-x-[2px] scale-[0.65] md:scale-100 max-w-full overflow-hidden">
          <span className="sr-only">{title}</span>
              <div className="relative h-[30px] w-[126px] translate-x-[2px] shrink-0"><Image src={LOGOS.TSMC} alt="TSMC logo" fill className="object-contain" /></div>
              <div className="relative h-[18px] w-[68px] -ml-6 md:-ml-6 shrink-0"><Image src={LOGOS.ASML} alt="ASML logo" fill className="object-contain" /></div>
              <div className="relative h-[18px] w-[70px] -ml-1 top-[2px] translate-x-[2px] shrink-0"><Image src={LOGOS.TEL} alt="TEL logo" fill className="object-contain" /></div>
        </div>
      );
    }

    const match = pickLogo(title);
    if (!match || failed) {
      return <span className="text-lg font-semibold text-neutral-900">{title}</span>;
    }
        const boxClass = match.brand === "Lucid" ? "h-7 w-[100px]" : "h-7 w-[120px]";
    const extraShift = match.brand === "Lucid" || match.brand === "Rivian" ? "mr-2 md:mr-3" : "";
    return (
          <div className={`relative ${boxClass} ${extraShift} scale-[0.95] sm:scale-100`}>
        <span className="sr-only">{title}</span>
        <Image src={match.src} alt={`${match.brand} logo`} fill className="object-contain" onError={() => setFailed(true)} />
      </div>
    );
  }
  return (
    <main id="main">
      {/* Full-bleed Hero (background covers the viewport width) */}
      <section id="hero" className="relative overflow-hidden bg-black text-white">
        <div className="relative pt-36 md:pt-64 pb-32 md:pb-40 min-h-[70vh] md:min-h-[76vh]">
          <HeroVideo />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="max-w-3xl md:max-w-4xl mt-[3cm] md:mt-[4cm] md:-translate-y-[20px]">
              <h1 className={`${anton.className} text-[48px] md:text-[60px] lg:text-[72px] font-normal text-white/95 uppercase leading-[1]`}>
                <span className="block">DATA</span>
                <span className="block">POWER</span>
                <span className="block">AUTOMATION</span>
              </h1>
              <p className="mt-4 md:mt-5 text-[17px] md:text-[22px] text-white/80 max-w-3xl leading-relaxed md:leading-[1.6]">
                Our integrated electrical, network, and automation systems  
                are powering the world’s most advanced industrial operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects band below Hero */}
      <section aria-labelledby="recent-projects">
        <RecentProjects />
      </section>

      <Section id="future" dark center title={<span>Built for the Future</span>}>
        <div className="max-w-5xl mx-auto space-y-4">
          <p className="text-xl md:text-[22px] text-white/80 max-w-4xl mx-auto leading-relaxed md:leading-[1.6]">
            At Ark Automation, we deliver integrated electrical, network, and automation systems that power the world’s most advanced industrial systems.
          </p>
          <p className="text-xl md:text-[22px] text-white/80 max-w-4xl mx-auto leading-relaxed md:leading-[1.6]">
            Through advanced engineering and disciplined execution, we elevate industrial systems to the next level of reliability, efficiency, and safety.
          </p>
        </div>
      </Section>

      <Section id="capabilities" subdued padYClass="py-[5px]" className="bg-neutral-200">
        {/* Full-bleed wrapper: break out of Section inner padding/max-width */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="relative w-screen aspect-[1/1] md:aspect-[16/9] overflow-hidden">
            {/* 2x2 collage full-bleed, rectangular with uniform gutters */}
            <div className="absolute inset-0 px-[5px] py-0">
              <div className="grid grid-cols-2 grid-rows-2 gap-[5px] h-full">
              {[
                { src: "/projects/gigatexas.jpg", alt: "Electrical & automation – Tesla Giga Texas" },
                { src: "/projects/Lucid.jpg", alt: "Automation integration – Lucid Motors" },
                { src: "/projects/Benz.jpg", alt: "Mechanical & electrical – Mercedes-Benz" },
                { src: "/projects/Rivian.jpg", alt: "Rivian manufacturing" },
              ].map((img, i) => (
                <div key={`collage-${i}`} className="relative">
                  <SafeImage src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 50vw, 50vw" className="object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              ))}
              </div>
            </div>
            {/* Center ARK logo at exact cross-point */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Image src="/ARK.svg" alt="ARK" width={390} height={180} className="w-auto h-28 md:h-[216px] invert brightness-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]" />
            </div>
          </div>
        </div>
      </Section>



      <Section id="projects" dark className="relative overflow-hidden" title={<span className="relative z-10">Representative Projects</span>}>
        {/* 背景圖（不攔截互動、位於文字下方） */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <SafeImage src="/projects/gigatexas.jpg" alt="Giga Texas background" fill sizes="100vw" className="object-cover" priority={true as any} />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 px-1 md:px-0">
          {[
            {
              t: "Tesla – Texas",
              d:
                "Comprehensive electrical and mechanical installation for the new production line of Robotaxi, covering structural framing, power and control wiring, cabinets, safety enclosures, and production tooling.",
            },
            {
              t: "TSMC / ASML / TEL – Arizona",
              d:
                "High-precision electrical and network installation for semiconductor lithography and process equipment, including ASML photolithography systems and TEL CLEAN TRACK Coater/Developer units.",
            },
            {
              t: "Lucid Motors – Arizona",
              d:
                "Electrical, network, and steel-structure installation for an all-new Gravity SUV production line, including power and control wiring, cable trays, fencing, transformers, power distribution panels, and control cabinets.",
            },
            {
              t: "Rivian – Illinois",
              d:
                "Complete removal of legacy production lines and installation of new automation systems — including robots, cable trays, transformers, control cabinets, power and control wiring, and safety fencing.",
            },
            {
              t: "Mercedes-Benz – South Carolina",
              d:
                "Upgrades to existing production lines integrating new robots, transformers, power distribution panels, and control wiring to modernize assembly operations.",
            },
            {
              t: "Amazon Distribution Centers – Nationwide",
              d:
                "Conveyor and automation system installation, including power and control wiring, network systems, and nationwide mobilization support.",
            },
          ].map((p, i) => {
            const isSemi = p.t.includes("TSMC") && p.t.includes("ASML") && p.t.includes("TEL");
            return (
              <div key={p.t} className="rounded-xl border border-neutral-200 bg-white/90 backdrop-blur-sm p-5 md:p-6 shadow-sm transform-gpu transition-transform duration-200 hover:scale-105">
                {isSemi ? (
                  <div className="mb-2 overflow-visible">
                    {/* Mobile: title與logos同一水平線（logos靠右，間距更緊） */}
                    <div className="grid grid-cols-[1fr_auto] items-start gap-1 md:hidden">
                      <div className="min-w-0 font-semibold text-neutral-900 text-left leading-tight pr-1">
                        <span className="block whitespace-nowrap text-[15px] tracking-tight">{"TSMC\u00A0ASML\u00A0TEL"}</span>
                        <span className="block">– Arizona</span>
                      </div>
                      <div className="flex items-center justify-end gap-0 translate-y-[6px]">
                        <div className="relative h-[26px] w-[96px]"><Image src={LOGOS.TSMC} alt="TSMC logo" fill className="object-contain" /></div>
                        <div className="relative h-[22px] w-[62px] -ml-[14px]"><Image src={LOGOS.ASML} alt="ASML logo" fill className="object-contain" /></div>
                        <div className="relative h-[18px] w-[62px] ml-[4px]"><Image src={LOGOS.TEL} alt="TEL logo" fill className="object-contain" /></div>
                      </div>
                    </div>
                    {/* Desktop: 單行標題，右側組合logo */}
                    <div className="hidden md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-2">
                      <div className="min-w-0 text-[18px] font-semibold text-neutral-900 text-left pr-2 whitespace-nowrap">{"TSMC ASML TEL – Arizona"}</div>
                      <div className="flex items-center justify-end">
                        <LogoTitle title={p.t} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-2 grid grid-cols-[1fr_auto] items-start gap-2 sm:gap-3 overflow-visible">
                    <div className="min-w-0 text-[16px] md:text-[18px] font-semibold text-neutral-900 text-left whitespace-normal md:whitespace-nowrap break-words pr-1 md:pr-2">
                      {p.t}
                    </div>
                    <div className="flex-none w-auto max-w-[38%] sm:max-w-none items-center justify-end whitespace-nowrap scale-100 sm:scale-100 overflow-hidden flex shrink-0">
                      <LogoTitle title={p.t} />
                    </div>
                  </div>
                )}
                <p className="mt-2 text-neutral-700 text-[15px] md:text-base leading-7 md:leading-7 break-words">{p.d}</p>
              </div>
            );
          })}
        </div>
      </Section>




      <Section
        id="contact"
        dark
        padYClass="py-20 md:py-24"
        title={
          <span className={`${anton.className} uppercase block text-[36px] md:text-[54px] lg:text-[64px] leading-[1.25]`}>
            <span className="block">CONNECT WITH US</span>
            <span className="block">LET’S BRING YOUR PROJECT TO LIFE</span>
          </span>
        }
      >
        <div className="max-w-3xl text-center sm:text-left">
          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center sm:justify-start">
            <a href="mailto:info@arkautomationgroup.com" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-neutral-900 font-medium hover:bg-white/90">
              Email Us
            </a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-white font-medium hover:bg-white/10">
              Get a Quote
            </a>
          </div>
    </div>
      </Section>

      <SiteFooter />
    </main>
  );
}
