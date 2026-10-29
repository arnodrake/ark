"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function SiteFooter() {
  const { dict } = useI18n();
  return (
    <footer className="bg-neutral-950 py-10 text-white">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-sm text-white/70">{dict.footer.tagline}</p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <nav className="flex gap-4 text-sm text-white/70">
            <Link href="/privacy" className="hover:text-white">{dict.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-white">{dict.footer.terms}</Link>
          </nav>
          <span className="text-sm text-white/70">© {new Date().getFullYear()} Ark Automation Inc.<br className="sm:hidden" /> {dict.footer.rights}</span>
        </div>
      </div>
      {/* iOS safe area bottom padding to avoid white strip when overscrolling */}
      <div style={{ height: 'env(safe-area-inset-bottom)' }} className="bg-neutral-950" />
    </footer>
  );
}
