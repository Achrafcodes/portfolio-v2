# Achraf Es-Soussy — Portfolio

Personal portfolio and client-facing site. Live case studies for
[Reckon](https://reckon-kappa.vercel.app), [Hustl](https://hustl-ivory.vercel.app),
and [Raqib](https://raqib-one.vercel.app).

## Stack

- Next.js 16 (App Router, SSG) + TypeScript
- Tailwind CSS v4
- WebGL hero background, scroll-reveal animation system
- SEO: sitemap, robots, Open Graph image, JSON-LD

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build && npm start
```

Site constants (domain, email, socials) live in `lib/site.ts`.
Project/case-study content lives in `lib/projects.ts`.
