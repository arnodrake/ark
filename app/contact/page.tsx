"use client";

import { useState } from "react";
import { Anton } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";

const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap" });

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

const SCOPES = [
  "Electrical Systems",
  "Pneumatic Controls",
  "Network Infrastructure",
  "Automation Integration",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [mode, setMode] = useState<"businesses" | "careers">("businesses");
  const isCareers = mode === "careers";
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (isCareers && resumeFile) {
        const fd = new FormData();
        Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)));
        fd.append("resume", resumeFile);
        await fetch("/api/contact", {
          method: "POST",
          body: fd,
        });
      } else {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setStatus("success");
      setMessage("Thanks — we will get back to you shortly.");

      const body = encodeURIComponent(
        isCareers
          ? `Name: ${data.name}\nOccupation: ${data.company}\nEmail: ${data.email}\nState: ${data.state}\nResume: ${resumeFile?.name || "(not attached)"}\n\nDetails:\n${data.details || ""}`
          : `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nState: ${data.state}\nProject Scope: ${data.scope}\n\nDetails:\n${data.details || ""}`
      );
      const subject = encodeURIComponent(isCareers ? "Career Inquiry" : "Project Inquiry");
      window.location.href = `mailto:admin@arkautomationgroup.com?subject=${subject}&body=${body}`;
    } catch (err) {
      setStatus("error");
      setMessage("Submission failed. Please email us directly at admin@arkautomationgroup.com");
    }
  }

  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-950 text-white mt-16">
        <div className="mx-auto max-w-7xl px-6 py-[164px]">
          <h1 className={`${anton.className} -ml-[100px] text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase text-white`}>
            CONNECT WITH US
          </h1>
        </div>
      </section>

      <section className="py-[50px] bg-neutral-50">
        <div className="mx-auto max-w-[1480px] px-6">
          <div className="rounded-xl bg-white p-6 md:p-8 shadow-sm border border-neutral-200">
            {/* Top buttons (toggle modes) */}
            <div className="mb-6 flex gap-4">
              <button
                type="button"
                onClick={() => setMode("businesses")}
                className={`inline-flex h-[59px] items-center rounded-md px-6 text-lg font-medium transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isCareers
                    ? "border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"
                    : "border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white"
                }`}
              >
                Businesses
              </button>
              <button
                type="button"
                onClick={() => setMode("careers")}
                className={`inline-flex h-[59px] items-center rounded-md px-6 text-lg font-medium transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isCareers
                    ? "border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white"
                    : "border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                Careers
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
              <div>
                <label className="block text-base font-medium text-neutral-700">Name</label>
                <input name="name" required className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-base font-medium text-neutral-700">{isCareers ? "Occupation" : "Company"}</label>
                <input name="company" className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-base font-medium text-neutral-700">Email</label>
                <input type="email" name="email" required className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-base font-medium text-neutral-700">State</label>
                <select name="state" required className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select a state</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {isCareers ? (
                <div className="md:col-span-2">
                  <label className="block text-base font-medium text-neutral-700">Resume</label>
                  <div className="mt-2 flex items-center gap-3 text-base">
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                      className="hidden"
                      id="resume-input"
                    />
                    <label htmlFor="resume-input" className="inline-flex h-[46px] items-center rounded-md border border-neutral-900 bg-white px-5 text-base font-medium text-neutral-900 transition-colors duration-300 hover:bg-neutral-900 hover:text-white cursor-pointer">
                      {resumeFile ? "Change file" : "Upload Resume"}
                    </label>
                    {resumeFile ? <span className="text-base text-neutral-600 truncate max-w-[60%]">{resumeFile.name}</span> : null}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2">
                  <label className="block text-base font-medium text-neutral-700">Project Scope</label>
                  <select name="scope" required className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="">Select a scope</option>
                    {SCOPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-base font-medium text-neutral-700">Additional details</label>
                <textarea name="details" rows={6} className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2 flex items-center gap-3 text-base">
                <button disabled={status === "submitting"} className="inline-flex h-[49px] items-center justify-center rounded-md bg-neutral-900 px-6 text-white text-lg font-medium hover:bg-neutral-800 disabled:opacity-60">
                  {status === "submitting" ? "Submitting..." : "Submit"}
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


