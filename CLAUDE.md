# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Karnaf Nadlan (קרנף נדל"ן) — a Hebrew RTL marketing website for a real estate knowledge & investment company. Two commercial tracks: the self-serve digital course "הדרך לדירה" (₪980, direct Schooler checkout) and premium 1:1 investor accompaniment (lead form → karnaf-crm + Google Sheets via Make). Built with React 18 + TypeScript + Vite, statically pre-rendered with `vite-react-ssg`, hosted on Vercel. Leads POST to an external karnaf-crm Supabase edge function — there is no backend in this repo.

## Commands

- `npm run dev` — dev server on port 8080
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

**Routing:** React Router v6 with lazy-loaded pages wrapped in `SharedLayout` (Navigation + FooterBar + WhatsApp FAB + Accessibility widget + Framer Motion page transitions).

**Path alias:** `@/` → `src/`

**Key directories:**
- `src/pages/` — route-level page components (Index, CoursePage, ServicesPage, etc.)
- `src/components/` — shared components; `components/ui/` is shadcn/ui primitives
- `src/layouts/SharedLayout.tsx` — wraps all routes with nav, footer, floating CTAs
- `src/data/` — static content (articles, curriculum, FAQ, team, testimonials)
- `src/lib/constants.ts` — WhatsApp numbers (bot + business), social links, contact info, course price + checkout URL seam
- `src/lib/whatsapp.ts` — botLink/businessLink builders (all chat CTAs go to the CRM intake bot)
- `src/lib/checkout.ts` — buildCheckoutUrl (Schooler URL + utm/click-id passthrough)
- `src/lib/leadSubmission.ts` — dual lead delivery: Make/Sheets mirror + karnaf-crm intake
- `src/lib/analytics.ts` — env-gated GA4/Clarity loader + funnel events (mirrors Meta Pixel)
- `src/hooks/` — custom hooks

**Styling:** Tailwind CSS 3 + shadcn/ui design system. Colors defined as HSL CSS variables in `src/index.css` (Navy/Cream/Amber palette). Custom display font sizes (`display-lg/md/sm`), layered shadows (`depth-1` through `depth-4`, `glow-*`). Uses `tailwindcss-animate` for animations.

**Animation:** Framer Motion only (page transitions, reveals, scroll effects). Smooth scrolling is native CSS (`scroll-behavior` + `scroll-padding-top`). Do not add GSAP/Lenis back — they were removed deliberately for INP/bundle size (see docs/UPGRADE.md).

**Fonts:** Self-hosted via `@fontsource-variable/rubik` (imported in `src/main.tsx`). No Google Fonts `<link>` tags.

**Commerce:** One digital product, one price — ₪980 (anchored against the old ₪5,490), defined once in `src/lib/constants.ts`. Purchase CTAs go straight to the hosted Schooler checkout (default baked in; `VITE_CHECKOUT_URL` overrides). The course is fully self-serve — never add personal-support/analyst promises to course copy; 1:1 accompaniment belongs to /premium only.

**Image optimization:** `vite-plugin-image-optimizer` compresses PNG/JPEG/SVG at build time.

## RTL / Hebrew

This is an RTL Hebrew site. All text content is in Hebrew. Layout direction considerations apply to margins, paddings, and flex/grid alignments.
