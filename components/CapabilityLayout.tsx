import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { getI18n } from "@/lib/i18n/server";
import type { CapabilitySlug } from "@/lib/i18n/types";
import { body, eyebrow, lead, pageTitle } from "@/lib/typography";

const CAPABILITY_SLUGS: CapabilitySlug[] = [
  "electrical-systems",
  "pneumatic-controls",
  "network-infrastructure",
  "automation-integration",
];

export type { CapabilitySlug };

export async function capabilityMetadata(slug: CapabilitySlug) {
  const { dict } = await getI18n();
  return {
    title: `${dict.capabilityNames[slug].replace(/\u00AD/g, "")} — Ark Automation`,
    description: dict.capabilities.pages[slug].intro,
  };
}

export default async function CapabilityLayout({ slug }: { slug: CapabilitySlug }) {
  const { dict } = await getI18n();
  const page = dict.capabilities.pages[slug];

  return (
    <main>
      <section className="mt-16 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 pt-14 pb-14 md:pt-24 md:pb-20">
          <p className={`${eyebrow} text-white/50`}>{dict.capabilities.eyebrow}</p>
          <h1 className={`font-display ${pageTitle} mt-4`}>{dict.capabilityNames[slug]}</h1>
          <p className={`${lead} mt-6 md:mt-8 max-w-2xl text-white/75`}>{page.intro}</p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-12 md:gap-12 md:px-6">
          <div className={`md:col-span-7 md:col-start-5 max-w-[68ch] space-y-6 text-neutral-700 ${body}`}>
            {page.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <nav aria-label={dict.capabilities.navLabel} className="md:col-span-3 md:col-start-1 md:row-start-1">
            <div className="md:sticky md:top-24 border-t border-neutral-200 pt-5">
              <p className={`${eyebrow} text-neutral-500`}>{dict.capabilities.navLabel}</p>
              <ul className="mt-4 space-y-1">
                {CAPABILITY_SLUGS.map((c) => {
                  const current = c === slug;
                  return (
                    <li key={c}>
                      <Link
                        href={`/capabilities/${c}`}
                        aria-current={current ? "page" : undefined}
                        className={`block py-1.5 text-[15px] transition-colors ${current ? "font-semibold text-neutral-950" : "text-neutral-500 hover:text-neutral-950"}`}
                      >
                        {dict.capabilityNames[c]}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-4 md:mt-24 md:px-6">
          <div className="flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-neutral-950">{dict.cta.planning}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-neutral-950 px-6 py-3 text-[15px] font-medium text-white transition hover:bg-neutral-800"
            >
              {dict.cta.getInTouch}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
