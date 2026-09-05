# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Karnaf Nadlan (קרנף נדל"ן) — a Hebrew RTL marketing website for a real estate knowledge & investment company. Two commercial tracks: the self-serve digital course "המדריך המעשי לרכישת דירה" (₪950, direct Schooler checkout) and premium 1:1 investor accompaniment (lead form → karnaf-crm + Google Sheets via Make). Built with React 18 + TypeScript + Vite, statically pre-rendered with `vite-react-ssg`, hosted on Vercel. Leads POST to an external karnaf-crm Supabase edge function — there is no backend in this repo.

## Commands

- `npm run dev` — dev server on port 8080
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

**Routing:** React Router v6 with lazy-loaded pages wrapped in `SharedLayout` (Navigation + FooterBar + WhatsApp FAB + Accessibility widget + Framer Motion page transitions). The desktop `StickyCTA` (course cross-sell) is hidden on `/contact`, `/course` and `/premium` — never downsell the 1:1 funnel.

**Path alias:** `@/` → `src/`

**Key directories:**
- `src/pages/` — route-level page components (Index, CoursePage, ServicesPage, etc.)
- `src/components/` — shared components; `components/ui/` is shadcn/ui primitives
- `src/layouts/SharedLayout.tsx` — wraps all routes with nav, footer, floating CTAs
- `src/data/` — static content (articles, curriculum, FAQ, team, testimonials). `companyStats.ts` is the single source for proof numbers (375+ לקוחות ותלמידים, 328 תלמידים, 8+ שנות ניסיון, מאז 2017) — one label per number, never hard-code them in copy
- `src/lib/constants.ts` — WhatsApp numbers (bot + business), social links, contact info, course price + checkout URL seam
- `src/lib/whatsapp.ts` — botLink/businessLink/premiumLink builders. Chat CTAs go to the CRM intake bot, with one deliberate exception: **every WhatsApp link on `/premium` opens the human business line** (`premiumLink()`), including site-wide chrome — nav, sticky bar and floating button resolve via `useWhatsAppLink` in `src/hooks/`
- `src/lib/checkout.ts` — buildCheckoutUrl (Schooler URL + utm/click-id passthrough)
- `src/lib/leadSubmission.ts` — dual lead delivery: Make/Sheets mirror + karnaf-crm intake. Every lead form navigates to `/thank-you?src=&service=` on success (`src/pages/ThankYouPage.tsx`, noindex) — that URL is the ad platforms' Lead conversion; `trackLead` in `lib/pixel.ts` attaches a relative `value` per source
- `src/lib/analytics.ts` — env-gated GA4/Clarity loader + funnel events (mirrors Meta Pixel)
- `src/lib/bottomBar.ts` — bottom bars (desktop `StickyCTA`, `/course` `CoursePriceBar`) publish their height to `--sticky-cta-h`; the WhatsApp FAB and accessibility button lift above it, and the FAB steps aside on `/course` while the price bar shows
- `src/components/WebinarCapture.tsx` — the free lead magnet (webinar) as a first-class form: home, blog index, `/course` after the close, and the quiz's "עוד מוקדם" result. `WEBINAR_URL` lives in `lib/constants.ts`
- `src/components/blog/ArticleOffer.tsx` — one offer per article by topic (course vs. premium), used mid-article and as the end banner
- `src/hooks/` — custom hooks

**Styling:** Tailwind CSS 3 + shadcn/ui design system. Colors defined as HSL CSS variables in `src/index.css` (Navy/Cream/Amber palette). Custom display font sizes (`display-lg/md/sm`), layered shadows (`depth-1` through `depth-4`, `glow-*`). Uses `tailwindcss-animate` for animations.

**Animation:** Framer Motion only (page transitions, reveals, scroll effects). Smooth scrolling is native CSS (`scroll-behavior` + `scroll-padding-top`). Do not add GSAP/Lenis back — they were removed deliberately for INP/bundle size (see docs/UPGRADE.md).

**Fonts:** Self-hosted via `@fontsource-variable/rubik` (imported in `src/main.tsx`). No Google Fonts `<link>` tags.

**Commerce:** One digital product, one price — ₪950 (anchored against real market prices of adjacent services, not a strikethrough tag), defined once in `src/lib/constants.ts`. Purchase CTAs go straight to the hosted Schooler checkout (default baked in; `VITE_CHECKOUT_URL` overrides). The course is fully self-serve — never add personal-support/analyst promises to course copy; 1:1 accompaniment belongs to /premium only.

**Image optimization:** `vite-plugin-image-optimizer` compresses PNG/JPEG/SVG at build time.

## RTL / Hebrew

This is an RTL Hebrew site. All text content is in Hebrew. Layout direction considerations apply to margins, paddings, and flex/grid alignments.
