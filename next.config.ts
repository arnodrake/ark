import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force correct project root so public/ assets are served from this app
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1280, 1440, 1920, 2048, 2560, 3840],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384, 640, 960],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
