"use client";

import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import RichText, { CONTACT_EMAIL } from "@/components/RichText";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/lib/i18n/config";
import type { CapabilitySlug } from "@/lib/i18n/types";
import { eyebrow, lead, pageTitle } from "@/lib/typography";

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

// Submitted values stay in English so inquiry emails read the same regardless of the visitor's language.
const SCOPES: { slug: CapabilitySlug; value: string }[] = [
  { slug: "electrical-systems", value: "Electrical Systems" },
  { slug: "pneumatic-controls", value: "Pneumatic Controls" },
  { slug: "network-infrastructure", value: "Network Infrastructure" },
  { slug: "automation-integration", value: "Automation Integration" },
];

export default function ContactPage() {
  const { dict } = useI18n();
  const t = dict.contact;
  const withEmail = (template: string) => format(template, { email: CONTACT_EMAIL });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<"businesses" | "careers">("businesses");
  const isCareers = mode === "careers";
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isCareers && resumeFile && resumeFile.size > 4 * 1024 * 1024) {
      setStatus("error");
      setMessage(withEmail(t.resumeTooLarge));
      return;
    }
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const submitData = { ...data, mode };

    try {
      let res: Response;
      if (isCareers && resumeFile) {
        const fd = new FormData();
        Object.entries(submitData).forEach(([k, v]) => fd.append(k, String(v)));
        fd.append("resume", resumeFile);
        res = await fetch("/api/contact", {
          method: "POST",
          body: fd,
        });
      } else {
        res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        });
      }
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
      setStatus("success");
      setMessage(t.success);
    } catch {
      setStatus("error");
      setMessage(withEmail(t.error));
    }
  }

  return (
    <main>
      <section className="mt-16 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 pt-14 pb-14 md:pt-24 md:pb-20">
          <p className={`${eyebrow} text-white/50`}>{t.eyebrow}</p>
          <h1 className={`font-display ${pageTitle} mt-4`}>{t.title}</h1>
          <p className={`${lead} mt-6 md:mt-8 max-w-2xl text-white/75`}>
            <RichText
              text={t.lead}
              emailClassName="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
            />
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="rounded-xl bg-white p-5 sm:p-6 md:p-10 shadow-sm border border-neutral-200">
            {/* Top buttons (toggle modes) */}
            <div className="mb-8 flex gap-3">
              <button
                type="button"
                onClick={() => setMode("businesses")}
                className={`inline-flex h-11 items-center rounded-md px-5 text-[15px] font-medium transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isCareers
                    ? "border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"
                    : "border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white"
                }`}
              >
                {t.businesses}
              </button>
              <button
                type="button"
                onClick={() => setMode("careers")}
                className={`inline-flex h-11 items-center rounded-md px-5 text-[15px] font-medium transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isCareers
                    ? "border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white"
                    : "border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                {t.careers}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-base">
              <div>
                <label className="block text-sm font-medium text-neutral-700">{t.name}</label>
                <input name="name" required className="mt-2 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">{isCareers ? t.occupation : t.company}</label>
                <input name="company" className="mt-2 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">{t.email}</label>
                <input type="email" name="email" required className="mt-2 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">{t.state}</label>
                <select name="state" required className="mt-2 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">{t.selectState}</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {isCareers ? (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700">{t.resume}</label>
                  <div className="mt-2 flex items-center gap-3 text-base">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                      className="hidden"
                      id="resume-input"
                    />
                    <label htmlFor="resume-input" className="inline-flex h-11 items-center rounded-md border border-neutral-900 bg-white px-5 text-[15px] font-medium text-neutral-900 transition-colors duration-300 hover:bg-neutral-900 hover:text-white cursor-pointer">
                      {resumeFile ? t.changeFile : t.uploadResume}
                    </label>
                    {resumeFile ? <span className="text-base text-neutral-600 truncate max-w-[60%]">{resumeFile.name}</span> : null}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700">{t.scope}</label>
                  <select name="scope" required className="mt-2 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="">{t.selectScope}</option>
                    {SCOPES.map((s) => (
                      <option key={s.slug} value={s.value}>{dict.capabilityNames[s.slug].replace(/\u00AD/g, "")}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700">{t.details}</label>
                <textarea name="details" rows={6} className="mt-2 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 text-base">
                <button disabled={status === "submitting"} className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md bg-neutral-900 px-7 text-white text-[15px] font-medium hover:bg-neutral-800 disabled:opacity-60">
                  {status === "submitting" ? t.submitting : t.submit}
                </button>
                {message ? <span className="text-base text-neutral-600">{message}</span> : null}
              </div>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}


