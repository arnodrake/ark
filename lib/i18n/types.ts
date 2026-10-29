/**
 * Inline markup in strings: **bold**, [label](/href), {email}. A "\n" renders as a line break.
 */
export type LegalBlock = string | { list: string[] };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type CaseStudySection = { title: string; paragraphs: string[]; imageAlt?: string };

export type CapabilitySlug =
  | "electrical-systems"
  | "pneumatic-controls"
  | "network-infrastructure"
  | "automation-integration";

export type ProjectSlug = "tesla-giga-texas" | "lucid-motors" | "mercedes-benz";

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    businesses: string;
    contact: string;
    language: string;
    representativeProjects: string;
    ourMission: string;
    openMenu: string;
    closeMenu: string;
    back: string;
    selectLanguage: string;
    backToTop: string;
    skipToContent: string;
  };
  capabilityNames: Record<CapabilitySlug, string>;
  home: {
    heroLines: [string, string, string];
    heroSubtitle: string;
    recentProjects: string;
    viewProject: string;
    recent: Record<ProjectSlug, { tag: string; title: string; summary: string }>;
    futureTitle: string;
    /** Each paragraph is split where the desktop line break goes. */
    futureParagraphs: [string, string][];
    representativeProjects: string;
    projects: { name: string; location: string; description: string }[];
    contactLines: [string, string];
    emailUs: string;
    getQuote: string;
  };
  footer: { tagline: string; privacy: string; terms: string; rights: string };
  cta: { planning: string; getInTouch: string };
  capabilities: {
    eyebrow: string;
    navLabel: string;
    pages: Record<CapabilitySlug, { intro: string; paragraphs: string[] }>;
  };
  caseStudy: {
    back: string;
    label: string;
    readTime: string;
    projects: Record<
      ProjectSlug,
      {
        title: string;
        subtitle: string;
        location: string;
        heroAlt: string;
        sections: CaseStudySection[];
      }
    >;
  };
  contact: {
    eyebrow: string;
    title: string;
    /** `{email}` is replaced by the mailto link. */
    lead: string;
    businesses: string;
    careers: string;
    name: string;
    company: string;
    occupation: string;
    email: string;
    state: string;
    selectState: string;
    resume: string;
    uploadResume: string;
    changeFile: string;
    scope: string;
    selectScope: string;
    details: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    resumeTooLarge: string;
  };
  legal: {
    /** Shown on translated legal pages; empty for English. */
    translationNotice: string;
    privacy: { title: string; description: string; intro: string; sections: LegalSection[] };
    terms: { title: string; description: string; intro: string; sections: LegalSection[] };
  };
};
