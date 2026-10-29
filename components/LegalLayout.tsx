import SiteFooter from "@/components/SiteFooter";
import RichText from "@/components/RichText";
import { getI18n } from "@/lib/i18n/server";

export type LegalDocument = "privacy" | "terms";

export async function legalMetadata(doc: LegalDocument) {
  const { dict } = await getI18n();
  const { title, description } = dict.legal[doc];
  return { title: `${title.replace(/\u00AD/g, "")} — Ark Automation Inc.`, description };
}

export default async function LegalLayout({ doc }: { doc: LegalDocument }) {
  const { dict } = await getI18n();
  const { title, intro, sections } = dict.legal[doc];
  const notice = dict.legal.translationNotice;

  return (
    <main className="mt-16 bg-white text-neutral-950">
      <article className="mx-auto max-w-7xl px-4 md:px-6 pt-16 pb-24 md:pt-28 md:pb-36">
        <div className="max-w-[52rem]">
          <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            {title}
          </h1>
          <p className="mt-10 md:mt-14 text-lg md:text-xl leading-[1.6] text-neutral-800">{intro}</p>
          {notice ? <p className="mt-6 text-sm leading-[1.6] text-neutral-500">{notice}</p> : null}

          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 mt-20 md:mt-28">
              <h2 className="text-3xl md:text-[2.75rem] font-semibold tracking-tight leading-[1.12]">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-6 md:mt-8 space-y-5 text-base md:text-lg leading-[1.7] text-neutral-800 [&_a]:font-semibold [&_a]:text-neutral-950 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-neutral-950 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-neutral-400">
                {s.blocks.map((block, bi) =>
                  typeof block === "string" ? (
                    <p key={bi}>
                      <RichText text={block} />
                    </p>
                  ) : (
                    <ul key={bi}>
                      {block.list.map((item) => (
                        <li key={item}>
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
