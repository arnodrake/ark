import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ark Automation — Built for the Future",
  description:
    "Industrial electrical, conveyor assembly, and automation integration across the U.S.",
  icons: {
    icon: [{ url: "/ARK.svg", type: "image/svg+xml" }],
    apple: "/ARK.svg",
    shortcut: "/ARK.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect & Preload for high-quality media without compression */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Hero media */}
        <link rel="preload" as="image" href="/ARK.svg" />
        <link rel="preload" as="image" href="/ARK%20AUTOMATION.svg" />
        <link rel="preload" as="image" href="/projects/gigatexas.jpg" />
        <link rel="preload" as="image" href="/hero/Sequence01.jpg" />
        <link rel="preload" as="video" href="/hero/Sequence01.webm" />
        <link rel="preload" as="video" href="/hero/Sequence01.mp4" />

        {/* Favicon / App icon */}
        <link rel="icon" href="/ARK.svg" type="image/svg+xml" />
        <link rel="mask-icon" href="/ARK.svg" color="#000000" />
        {/* Basic OpenGraph */}
        <meta property="og:title" content="Ark Automation — Built for the Future" />
        <meta property="og:description" content="Industrial electrical, network, and automation integration across the U.S." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/projects/gigatexas.jpg" />

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ark Automation Inc.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              logo: "/ARK.svg",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {/* no top padding; header overlays hero */}
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
