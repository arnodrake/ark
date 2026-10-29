"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { useI18n } from "@/components/I18nProvider";
import type { ProjectSlug } from "@/lib/i18n/types";
import { eyebrow, sectionTitle } from "@/lib/typography";

type ProjectItem = {
  title: string;
  summary: string;
  tag: string;
  imageSrc?: string;
  href?: string;
};

const IMAGES: Record<ProjectSlug, string> = {
  "tesla-giga-texas": "/projects/gigatexas.jpg",
  "lucid-motors": "/projects/Lucid.jpg",
  "mercedes-benz": "/projects/Benz.jpg",
};

function ProjectCard({ item, priority, viewLabel }: { item: ProjectItem; priority?: boolean; viewLabel: string }) {
  return (
    <Link
      href={item.href ?? "#projects"}
      className="group relative isolate flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 shadow-[0_0_16px_4px_rgba(200,200,200,0.28),0_0_56px_18px_rgba(160,160,160,0.18)] transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-neutral-800">
        {item.imageSrc ? (
          <SafeImage
            src={item.imageSrc}
            alt={`${item.tag} cover`}
            fill
            sizes="(min-width:768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
            priority={priority}
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col bg-white px-6 pt-6 pb-7 lg:px-7 lg:pt-7 lg:pb-8">
        <p className={`${eyebrow} text-neutral-500`}>
          {item.tag}
        </p>
        <h3 className="mt-3 text-xl lg:text-[1.375rem] font-semibold leading-[1.3] tracking-tight text-neutral-950">
          {item.title}
        </h3>
        <p className="mt-4 text-[15px] lg:text-base leading-relaxed text-neutral-600">
          {item.summary}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-neutral-950">
          {viewLabel}
          <span
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function RecentProjects() {
  const { dict } = useI18n();
  const items: ProjectItem[] = (Object.keys(IMAGES) as ProjectSlug[]).map((slug) => ({
    ...dict.home.recent[slug],
    imageSrc: IMAGES[slug],
    href: `/projects/${slug}`,
  }));

  return (
    <div className="bg-neutral-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 id="recent-projects-heading" className={`${sectionTitle} text-white`}>
          {dict.home.recentProjects}
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {items.map((item, i) => (
            <li key={item.href}>
              <ProjectCard item={item} priority={i === 0} viewLabel={dict.home.viewProject} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
