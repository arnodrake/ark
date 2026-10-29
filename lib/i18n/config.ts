export const LOCALES = ["en", "es", "de", "fr", "zh", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "ark-lang";

export type FlagCode = "us" | "mx" | "de" | "fr" | "cn" | "jp";

export const LANGUAGE_META: Record<
  Locale,
  { htmlLang: string; short: string; label: string; region: string; flag: FlagCode }
> = {
  en: { htmlLang: "en", short: "EN", label: "English", region: "United States", flag: "us" },
  es: { htmlLang: "es-MX", short: "ES", label: "Español", region: "México", flag: "mx" },
  de: { htmlLang: "de", short: "DE", label: "Deutsch", region: "Deutschland", flag: "de" },
  fr: { htmlLang: "fr", short: "FR", label: "Français", region: "France", flag: "fr" },
  zh: { htmlLang: "zh-CN", short: "中文", label: "中文", region: "中国", flag: "cn" },
  ja: { htmlLang: "ja", short: "日本語", label: "日本語", region: "日本", flag: "jp" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Replaces `{name}` placeholders. */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, key) => (key in values ? String(values[key]) : m));
}
