import Image from "next/image";
import Link from "next/link";
import SectionLink from "@/components/SectionLink";
import SiteFooter from "@/components/SiteFooter";
import { ReactNode } from "react";
import { format } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";
import type { ProjectSlug } from "@/lib/i18n/types";

/** Images keyed by section index; sections without an entry render as text only. */
export type CaseStudyMedia = Record<number, { src: string; position?: string; imageFirst?: boolean }>;

export type ProjectCaseStudyLayoutProps = {
  slug: ProjectSlug;
  year: string;
  readMinutes: number;
  heroSrc: string;
  media: CaseStudyMedia;
};

export async function caseStudyMetadata(slug: ProjectSlug) {
  const { dict } = await getI18n();
  const project = dict.caseStudy.projects[slug];
  return { title: `${project.title} — Ark Automation Inc.`, description: project.subtitle };
}

const proseClass =
  "text-base md:text-[17px] leading-[1.75] text-white/70 [&>p]:m-0 [&>p+p]:mt-5";

/** Bottom border keeps all content (incl. images) above the divider. */
const sectionShell = "py-12 md:py-20 border-b border-white/[0.08] last:border-b-0";

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-[1.75rem] md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-white leading-[1.12] max-w-3xl">
      {title}
    </h2>
  );
}

function MediaFigure({
  src,
  alt,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  objectPosition?: "top" | "center" | "bottom" | string;
}) {
  const positionClass =
    objectPosition === "top"
      ? "object-top"
      : objectPosition === "bottom"
        ? "object-bottom"
        : objectPosition === "center"
          ? "object-center"
          : "";

  return (
    <figure className="relative aspect-[16/10] md:aspect-[3/2] w-full overflow-hidden bg-neutral-900">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 480px, 100vw"
        className={`object-cover ${positionClass}`}
        style={positionClass ? undefined : { objectPosition }}
      />
    </figure>
  );
}

/** Text-only section — single column, no grid holes. */
export function ProjectSection({
  title,
  children,
  className,
  media,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  media?: { src: string; alt: string };
}) {
  return (
    <section className={`${sectionShell} ${className ?? ""}`}>
      <SectionHeading title={title} />
      <div className={`mt-6 md:mt-8 max-w-[68ch] ${proseClass}`}>{children}</div>
      {media ? (
        <ProjectFigure className="mt-8 md:mt-12" src={media.src} alt={media.alt} />
      ) : null}
    </section>
  );
}

/** Section with a side-by-side image — mobile: image under title, then text. */
export function ProjectMediaSection({
  title,
  children,
  imageSrc,
  imageAlt,
  imageFirst = false,
  imagePosition = "center",
}: {
  title: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageFirst?: boolean;
  imagePosition?: "top" | "center" | "bottom" | string;
}) {
  const text = <div className={proseClass}>{children}</div>;
  const figure = <MediaFigure src={imageSrc} alt={imageAlt} objectPosition={imagePosition} />;

  const textOrder = imageFirst ? "order-2 md:order-2" : "order-2 md:order-1";
  const figureOrder = imageFirst ? "order-1 md:order-1" : "order-1 md:order-2";

  return (
    <section className={sectionShell}>
      <SectionHeading title={title} />
      <div className="mt-6 md:mt-10 grid gap-6 md:gap-12 md:grid-cols-2 md:items-start">
        <div className={figureOrder}>{figure}</div>
        <div className={textOrder}>{text}</div>
      </div>
    </section>
  );
}

/** @deprecated Use ProjectMediaSection instead */
export function ProjectSplit({
  children,
  imageSrc,
  imageAlt,
  imageFirst = false,
}: {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageFirst?: boolean;
}) {
  const text = <div className={proseClass}>{children}</div>;
  const figure = <MediaFigure src={imageSrc} alt={imageAlt} />;

  const textOrder = imageFirst ? "order-2 md:order-2" : "order-2 md:order-1";
  const figureOrder = imageFirst ? "order-1 md:order-1" : "order-1 md:order-2";

  return (
    <div className="grid gap-4 md:gap-8 md:grid-cols-2 md:items-start">
      <div className={figureOrder}>{figure}</div>
      <div className={textOrder}>{text}</div>
    </div>
  );
}

export function ProjectFigure({
  src,
  alt,
  className,
  aspect = "16/10",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: "16/10" | "16/9" | "3/2";
}) {
  const aspectClass =
    aspect === "16/9" ? "aspect-video" : aspect === "3/2" ? "aspect-[3/2]" : "aspect-[16/10]";

  return (
    <figure
      className={`relative ${aspectClass} overflow-hidden bg-neutral-900 ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover"
      />
    </figure>
  );
}

export default async function ProjectCaseStudyLayout({
  slug,
  year,
  readMinutes,
  heroSrc,
  media,
}: ProjectCaseStudyLayoutProps) {
  const { dict } = await getI18n();
  const { title, subtitle, location, heroAlt, sections } = dict.caseStudy.projects[slug];
  const readTime = format(dict.caseStudy.readTime, { n: readMinutes });

  return (
    <>
      <main className="min-h-screen pt-16 bg-neutral-950 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-6">
          <header className="pt-6 sm:pt-8 md:pt-10 pb-8 md:pb-12 border-b border-white/[0.08]">
            <SectionLink
              section="recent-projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/55 transition hover:text-white -ml-0.5"
            >
              <span aria-hidden>←</span>
              {dict.caseStudy.back}
            </SectionLink>
            <p className="mt-4 sm:mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
              {dict.caseStudy.label}
            </p>
            <h1 className="mt-3 text-[2rem] sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.08] max-w-4xl">
              {title}
            </h1>
            <p className="mt-4 md:mt-5 text-lg md:text-xl text-white/65 max-w-3xl leading-[1.6]">
              {subtitle}
            </p>
            <div className="mt-4 md:mt-5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-white/45">
              <span>{location}</span>
              <span aria-hidden>·</span>
              <span>{year}</span>
              <span aria-hidden>·</span>
              <span>{readTime}</span>
            </div>

            <figure className="relative mt-6 md:mt-10 aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900">
              <Image
                src={heroSrc}
                alt={heroAlt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </figure>
          </header>

          <article>
            {sections.map((section, i) => {
              const paragraphs = section.paragraphs.map((p) => <p key={p}>{p}</p>);
              const m = media[i];
              return m ? (
                <ProjectMediaSection
                  key={section.title}
                  title={section.title}
                  imageSrc={m.src}
                  imageAlt={section.imageAlt ?? section.title}
                  imageFirst={m.imageFirst}
                  imagePosition={m.position}
                >
                  {paragraphs}
                </ProjectMediaSection>
              ) : (
                <ProjectSection key={section.title} title={section.title}>
                  {paragraphs}
                </ProjectSection>
              );
            })}
          </article>

          <div className="py-8 md:py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <p className="text-lg font-semibold text-white">
              {dict.cta.planning}
            </p>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border border-white/20 bg-white px-6 py-3 text-[15px] font-medium text-neutral-950 transition hover:bg-white/90"
            >
              {dict.cta.getInTouch}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
