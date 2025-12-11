# Ark Automation Inc. — Website

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion

## Development

```bash
npm install
npm run dev
```

- Local dev server: http://localhost:3000
- Uses App Router (`app/`)
- Tailwind v4 with CSS `@import "tailwindcss"` in `app/globals.css`

## Motion & Accessibility
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Durations: 0.4–0.8s
- Prefers-reduced-motion is respected
- Keyboard navigable with a skip link to `#main`

## Deployment (Vercel)
- Push to GitHub
- Import repository into Vercel
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output: handled automatically by Vercel

## Content Structure
- Hero with parallax background grid and glow
- Sections: Who We Are, Capabilities, Safety & Standards, Projects, Execution Approach, Coverage, Contact, Footer

## Notes
- Do not copy any third-party logos or assets.
- Images are optional; keep copy concise.
