"use client";

import Link from "next/link";
import Image from "next/image";
import SafeImage from "@/components/SafeImage";

type ProjectItem = {
  title: string; // headline
  summary: string; // description
  tag: string; // small label (brand/site)
  imageSrc?: string; // optional cover image under /public
  href?: string; // learn more link
};

const ITEMS: ProjectItem[] = [
  {
    tag: "Tesla",
    title: "Building the Core of Tomorrow's Gigafactory",
    summary:
      "Powering large-scale automation and production infrastructure at Tesla Giga Texas.",
    imageSrc: "/projects/gigatexas.jpg",
    href: "/projects/tesla-giga-texas",
  },
  {
    tag: "Lucid",
    title: "Precision in Motion",
    summary:
      "High-performance electrical and control installations across Lucid's advanced manufacturing environment.",
    imageSrc: "/projects/Lucid.jpg",
    href: "/projects/lucid-motors",
  },
  {
    tag: "Mercedes",
    title: "Innovation in Every Connection",
    summary:
      "Modernizing critical power and automation systems within active vehicle production facilities.",
    imageSrc: "/projects/Benz.jpg",
    href: "/projects/mercedes-benz",
  },
];

export default function RecentProjects() {
  return (
    <div className="bg-[#dbe9ea] py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="recent-projects-heading" className="text-xl sm:text-2xl md:text-3xl font-semibold text-neutral-900">
          Recent Projects
        </h2>

        <div className="mt-5 sm:mt-8 flex flex-col gap-5 sm:gap-6 md:grid md:grid-cols-3 md:gap-8">
          {ITEMS.map((p, i) => (
            <article
              key={i}
              className="group flex flex-col rounded-xl bg-white ring-1 ring-neutral-200 shadow-sm overflow-hidden transition duration-300"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden shrink-0">
                {p.imageSrc ? (
                  <SafeImage
                    src={p.imageSrc}
                    alt={`${p.tag} cover`}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:group-hover:scale-[1.06]"
                    priority={i === 0}
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="text-xs font-medium text-neutral-500">{p.tag}</div>
                <h3 className="mt-1.5 sm:mt-2 text-base sm:text-lg font-semibold text-neutral-900 leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-neutral-700 text-sm leading-[1.55] sm:leading-6">
                  {p.summary}
                </p>
                <Link
                  href={p.href ?? "#projects"}
                  className="mt-3 sm:mt-4 inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  Learn more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


