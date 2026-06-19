import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { PropsWithChildren, ReactNode } from "react";

export type ProjectCaseStudyLayoutProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  location: string;
  year: string;
  readTime: string;
  heroSrc: string;
  heroAlt: string;
}>;

const proseClass =
  "text-[14px] md:text-[17px] leading-[1.65] md:leading-[1.68] text-white/70 [&>p]:m-0 [&>p+p]:mt-2.5 md:[&>p+p]:mt-3";

/** Bottom border keeps all content (incl. images) above the divider. */
const sectionShell = "py-5 md:py-9 border-b border-white/[0.08] last:border-b-0";

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-base md:text-[1.375rem] font-semibold tracking-tight text-white leading-snug">
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
    <figure className="relative aspect-[16/10] md:aspect-[3/2] w-full overflow-hidden rounded-lg md:rounded-xl ring-1 ring-white/10 bg-neutral-900">
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
      <div className={`mt-3 md:mt-4 max-w-3xl ${proseClass}`}>{children}</div>
      {media ? (
        <ProjectFigure className="mt-4 md:mt-6 max-w-4xl" src={media.src} alt={media.alt} />
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
      <div className="mt-3 md:mt-4 grid gap-4 md:gap-8 md:grid-cols-2 md:items-start">
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
      className={`relative ${aspectClass} overflow-hidden rounded-lg md:rounded-xl ring-1 ring-white/10 bg-neutral-900 ${className ?? ""}`}
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

export default function ProjectCaseStudyLayout({
  title,
  subtitle,
  location,
  year,
  readTime,
  heroSrc,
  heroAlt,
  children,
}: ProjectCaseStudyLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-neutral-950 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-6">
          <header className="pt-5 sm:pt-8 md:pt-10 pb-5 sm:pb-7 md:pb-9 border-b border-white/[0.08]">
            <Link
              href="/#recent-projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/55 transition hover:text-white -ml-0.5"
            >
              <span aria-hidden>←</span>
              Return
            </Link>
            <p className="mt-4 sm:mt-6 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
              Case Study
            </p>
            <h1 className="mt-2 text-[1.375rem] sm:text-[1.625rem] md:text-[2.25rem] lg:text-[2.625rem] font-semibold tracking-tight leading-[1.22] md:leading-[1.18] max-w-4xl">
              {title}
            </h1>
            <p className="mt-2.5 sm:mt-3.5 text-[14px] sm:text-[15px] md:text-lg text-white/65 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-white/45">
              <span>{location}</span>
              <span aria-hidden>·</span>
              <span>{year}</span>
              <span aria-hidden>·</span>
              <span>{readTime}</span>
            </div>

            <figure className="relative mt-4 sm:mt-6 md:mt-7 aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-lg md:rounded-2xl ring-1 ring-white/10">
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

          <article>{children}</article>

          <div className="py-5 sm:py-7 md:py-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <p className="text-[14px] sm:text-[15px] md:text-base text-white/55 text-center sm:text-left">
              Interested in a similar project?
            </p>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border border-white/20 bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-white/90"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
