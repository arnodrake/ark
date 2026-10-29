"use client";

import Section from "@/components/Section";
import HeroCarousel from "@/components/HeroCarousel";
import HeroVideo from "@/components/HeroVideo";
import RecentProjects from "@/components/RecentProjects";
import Image from "next/image";
import SafeImage from "@/components/SafeImage";
import CollageScrollReveal from "@/components/CollageScrollReveal";
import ProjectFocusCard, { ProjectFocusGrid, MobileViewportEdgeBlur } from "@/components/ProjectFocusCard";
import SiteFooter from "@/components/SiteFooter";
import { useState } from "react";
import { eyebrow, sectionTitle } from "@/lib/typography";
import { useI18n } from "@/components/I18nProvider";
import { CONTACT_EMAIL } from "@/components/RichText";

export default function Home() {
  const { dict, locale } = useI18n();
  const t = dict.home;
  const isCJK = locale === "zh" || locale === "ja";
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
        <div className="flex items-center gap-3 max-w-full">
          <span className="sr-only">{title}</span>
          <div className="relative h-[30px] w-[34px] shrink-0"><Image src={LOGOS.TSMC} alt="TSMC logo" fill className="object-contain" /></div>
          <div className="relative h-[18px] w-[64px] shrink-0"><Image src={LOGOS.ASML} alt="ASML logo" fill className="object-contain" /></div>
          <div className="relative top-[1px] h-[18px] w-[30px] shrink-0"><Image src={LOGOS.TEL} alt="TEL logo" fill className="object-contain" /></div>
        </div>
      );
    }

    const match = pickLogo(title);
    if (!match || failed) {
      return <span className="text-lg font-semibold text-neutral-900">{title}</span>;
    }
        const boxClass = match.brand === "Lucid" ? "h-7 w-[100px]" : "h-7 w-[120px]";
    return (
          <div className={`relative ${boxClass} origin-left scale-[0.95] sm:scale-100`}>
        <span className="sr-only">{title}</span>
        <Image src={match.src} alt={`${match.brand} logo`} fill className="object-contain object-left sm:object-right" onError={() => setFailed(true)} />
      </div>
    );
  }
  return (
    <main id="main">
      {/* Full-bleed Hero (background covers the viewport width) */}
      <section id="hero" className="relative overflow-hidden bg-black text-white">
        <div className="relative flex min-h-svh flex-col justify-center pt-24 pb-[6svh]">
          <HeroVideo />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5">
            <div className="-ml-1.5 md:-ml-6">
              <h1 className="font-display text-[clamp(3.25rem,6.4vw,6rem)] font-normal text-white uppercase leading-[1.06] tracking-[0.005em] [text-shadow:0_2px_28px_rgba(0,0,0,0.38),0_1px_3px_rgba(0,0,0,0.2)]">
                {t.heroLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h1>
              <p className="mt-6 md:mt-8 max-w-[38rem] text-[clamp(1.125rem,1.6vw,1.5rem)] text-white/85 leading-[1.55]">
                {t.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects band below Hero */}
      <section id="recent-projects" aria-labelledby="recent-projects-heading">
        <RecentProjects />
      </section>

      <Section id="future" dark>
        <div className="text-left md:text-center">
          <h2 className="mb-8 md:mb-12 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            {t.futureTitle}
          </h2>
          <div className="space-y-5 md:space-y-6 max-w-6xl md:mx-auto text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed lg:leading-[1.55] text-pretty">
            {t.futureParagraphs.map(([first, second]) => (
              <p key={first}>
                {first}<br className="hidden lg:inline" />
                {isCJK ? "" : " "}
                {second}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="capabilities" padYClass="py-[5px]" className="bg-neutral-300 overflow-hidden text-neutral-900">
        <CollageScrollReveal />
      </Section>



      <Section id="projects" dark noMotion className="relative overflow-hidden">
        {/* 背景圖（不攔截互動、位於文字下方） */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 scale-110">
            <SafeImage src="/projects/gigatexas.jpg" alt="Giga Texas background" fill sizes="100vw" className="object-cover blur-xl" priority={true as any} />
          </div>
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <MobileViewportEdgeBlur sectionId="projects" />
        <ProjectFocusGrid className="relative z-10">
          <ProjectFocusCard titleFocus className="mb-10">
            <h2 className={sectionTitle}>{t.representativeProjects}</h2>
          </ProjectFocusCard>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
          {t.projects.map((p) => (
            <li key={p.name}>
              <ProjectFocusCard interactive lift={false} className="h-full">
                <div className="group relative isolate flex h-full flex-col bg-white px-5 pt-5 pb-6 lg:px-6 lg:pt-6 lg:pb-7">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 shadow-[0_0_16px_4px_rgba(200,200,200,0.28),0_0_56px_18px_rgba(160,160,160,0.18)] transition-opacity duration-500 ease-out group-hover:opacity-100"
                  />
                  <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className={`${eyebrow} text-neutral-500`}>
                        {p.location}
                      </p>
                      <h3 className="mt-2 text-xl lg:text-[1.375rem] font-semibold leading-[1.3] tracking-tight text-neutral-950">
                        {p.name}
                      </h3>
                    </div>
                    <div className="flex shrink-0 items-center sm:justify-end sm:pt-0.5">
                      <LogoTitle title={p.name} />
                    </div>
                  </div>
                  <p className="mt-3 text-[15px] lg:text-base leading-relaxed text-neutral-600">{p.description}</p>
                </div>
              </ProjectFocusCard>
            </li>
          ))}
          </ul>
        </ProjectFocusGrid>
      </Section>




      <Section
        id="contact"
        dark
        padYClass="py-20 md:py-24"
        title={
          <span className="font-display font-normal tracking-[-0.01em] [-webkit-text-stroke:0.01em_currentColor] uppercase block text-[36px] md:text-[54px] lg:text-[64px] leading-[1.25]">
            {t.contactLines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </span>
        }
      >
        <div className="max-w-3xl text-center sm:text-left">
          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center sm:justify-start">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-neutral-900 font-medium hover:bg-white/90">
              {t.emailUs}
            </a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 text-white font-medium hover:bg-white/10">
              {t.getQuote}
            </a>
          </div>
    </div>
      </Section>

      <SiteFooter />
    </main>
  );
}
