"use client";

import { createContext, useContext, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

export type ClientDictionary = Pick<Dictionary, "nav" | "capabilityNames" | "home" | "footer" | "cta" | "contact">;

const I18nContext = createContext<{ locale: Locale; dict: ClientDictionary } | null>(null);

export default function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: ClientDictionary;
  children: ReactNode;
}) {
  return <I18nContext.Provider value={{ locale, dict }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function useSetLocale() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const setLocale = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };
  return { setLocale, pending };
}
