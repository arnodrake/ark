import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import HashScroll from "@/components/HashScroll";
import I18nProvider from "@/components/I18nProvider";
import { fontVariables } from "@/lib/fonts";
import { LANGUAGE_META } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.arkautomationgroup.com";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: [{ url: "/ARK.svg", type: "image/svg+xml" }],
      apple: "/ARK.svg",
      shortcut: "/ARK.svg",
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      images: ["/projects/gigatexas.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, dict } = await getI18n();
  const clientDict = {
    nav: dict.nav,
    capabilityNames: dict.capabilityNames,
    home: dict.home,
    footer: dict.footer,
    cta: dict.cta,
    contact: dict.contact,
  };

  return (
    <html lang={LANGUAGE_META[locale].htmlLang} className={fontVariables}>
      <head>
        {/* Hero media */}
        <link rel="preload" as="image" href="/ARK.svg" />
        <link rel="preload" as="image" href="/ARK%20AUTOMATION.svg" />
        <link
          rel="preload"
          as="image"
          href="/projects/gigatexas.jpg"
          imageSrcSet="/projects/gigatexas.jpg"
          imageSizes="100vw"
        />

        {/* Favicon / App icon */}
        <link rel="icon" href="/ARK.svg" type="image/svg+xml" />
        <link rel="mask-icon" href="/ARK.svg" color="#000000" />

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ark Automation Inc.",
              url: SITE_URL,
              logo: `${SITE_URL}/ARK.svg`,
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <I18nProvider locale={locale} dict={clientDict}>
          <a className="skip-link" href="#main">{dict.nav.skipToContent}</a>
          <Header />
          {/* no top padding; header overlays hero */}
          {children}
          <ScrollToTop />
          <HashScroll />
        </I18nProvider>
      </body>
    </html>
  );
}
