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
    tag: "Tesla Giga Texas",
    title: "Building the Core of Tomorrow’s Gigafactory",
    summary:
      "Powering Tesla’s new Model Y production with advanced electrical and automation systems.",
    imageSrc: "/projects/gigatexas.jpg",
    href: "/projects/tesla-giga-texas",
  },
  {
    tag: "Lucid Motors",
    title: "Precision in Motion",
    summary:
      "High-performance electrical and control installations driving Lucid’s next-generation EV manufacturing in Arizona.",
    imageSrc: "/projects/Lucid.jpg",
    href: "/projects/lucid-motors",
  },
  {
    tag: "Mercedes-Benz",
    title: "Innovation in Every Connection",
    summary:
      "Automation and power upgrades enhancing efficiency and reliability across Mercedes-Benz facilities.",
    imageSrc: "/projects/Benz.jpg",
    href: "/projects/mercedes-benz",
  },
];

export default function RecentProjects() {
  return (
    <div className="bg-[#dbe9ea] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900">Recent Projects</h2>

        {/* Mobile: horizontal snap; Desktop: grid */}
        <div className="mt-8 grid grid-flow-col auto-cols-[85%] gap-6 overflow-x-auto snap-x md:grid-flow-row md:grid md:auto-cols-auto md:grid-cols-3 md:overflow-visible md:gap-8">
          {ITEMS.map((p, i) => (
            <article
              key={i}
              className="group snap-start rounded-xl bg-white ring-1 ring-neutral-200 shadow-sm overflow-hidden transition duration-300"
            >
              {/* Cover */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                {p.imageSrc ? (
                  <SafeImage
                    src={p.imageSrc}
                    alt={`${p.tag} cover`}
                    fill
                    sizes="(min-width:1024px) 33vw, 85vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]"
                    priority={i === 0}
                  />
                ) : null}
              </div>
              <div className="p-5">
                <div className="text-xs font-medium text-neutral-500">{p.tag}</div>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{p.title}</h3>
                <p className="mt-2 text-neutral-700 text-sm leading-6">{p.summary}</p>
                <Link href={p.href ?? "#projects"} className="mt-4 inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800">
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


