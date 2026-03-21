# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Karnaf Nadlan (קרנף נדל"ן) — a Hebrew RTL marketing website for a real estate investment company. Built with React 18 + TypeScript + Vite, hosted on Vercel with Supabase backend.

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
- `src/layouts/SharedLayout.tsx` — wraps all routes with nav, footer, scroll progress, smooth scroll (Lenis)
- `src/data/` — static content (articles, curriculum, FAQ, services, team, testimonials)
- `src/lib/constants.ts` — WhatsApp number, social links, contact info
- `src/integrations/supabase/` — Supabase client + generated types
- `src/hooks/` — custom hooks including GSAP reveal animations

**Styling:** Tailwind CSS 3 + shadcn/ui design system. Colors defined as HSL CSS variables in `src/index.css` (Navy/Cream/Amber palette). Custom display font sizes (`display-lg/md/sm`), layered shadows (`depth-1` through `depth-4`, `glow-*`). Uses `tailwindcss-animate` for animations.

**Animation:** Dual animation system — Framer Motion for page transitions and component animations, GSAP + ScrollTrigger for scroll-based reveals. Lenis for smooth scrolling.

**Image optimization:** `vite-plugin-image-optimizer` compresses PNG/JPEG/SVG at build time.

## RTL / Hebrew

This is an RTL Hebrew site. All text content is in Hebrew. Layout direction considerations apply to margins, paddings, and flex/grid alignments.
