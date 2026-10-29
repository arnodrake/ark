import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://arkautomationgroup.com";
  const now = new Date();

  const routes: string[] = [
    "/",
    "/contact",
    "/capabilities/electrical-systems",
    "/capabilities/pneumatic-controls",
    "/capabilities/network-infrastructure",
    "/capabilities/automation-integration",
    "/projects/tesla-giga-texas",
    "/projects/lucid-motors",
    "/projects/mercedes-benz",
    "/privacy",
    "/terms",
  ];

  return routes.map((path) => ({
    url: `${base}${path.startsWith("/") ? path : `/${path}`}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}



