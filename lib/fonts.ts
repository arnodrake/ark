import { Anton, Geist_Mono, IBM_Plex_Sans, IBM_Plex_Sans_JP, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";

export const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// CJK faces are split into many unicode-range files, so the browser only downloads glyphs a page uses.
export const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: false,
});

export const plexSansJP = IBM_Plex_Sans_JP({
  variable: "--font-plex-jp",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const notoSansJPBlack = Noto_Sans_JP({
  variable: "--font-noto-jp-black",
  weight: "900",
  display: "swap",
  preload: false,
});

export const fontVariables = [plexSans, anton, geistMono, notoSansSC, plexSansJP, notoSansJPBlack]
  .map((f) => f.variable)
  .join(" ");
