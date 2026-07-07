# 2026-07 Premium Upgrade — what changed & what needs account setup

This document tracks the site-wide CRO/UX/performance overhaul and the
follow-up steps that require business accounts or credentials.

## What changed in code

### Conversion (CRO)
- **Price is public**: ₪5,490 (or up to 12 × ₪458) on `/course` — single
  source of truth in `src/lib/constants.ts` (`COURSE_PRICE`).
- **Checkout seam**: `VITE_CHECKOUT_URL` — set it to a hosted payment page
  (Grow/Meshulam, Cardcom, Stripe Payment Link) and every purchase CTA
  switches from WhatsApp fallback to direct checkout automatically.
- `/course` reordered: problem → method → curriculum → proof → **price** → FAQ,
  plus a sticky price bar (`CoursePriceBar`).
- Course JSON-LD now carries the real `price`/`priceCurrency`; the unbacked
  `aggregateRating` was removed (rich-results policy risk).
- Webinar popup: fires on 50% scroll or exit-intent, homepage/blog only,
  max once per 7 days, never on `/course`.
- Homepage compressed to a single narrative: Hero → method → proof (real
  client outcomes) → CourseStrip → About → one closing ask.

### Measurement
- `src/lib/analytics.ts`: GA4 + Microsoft Clarity, env-gated
  (`VITE_GA4_ID`, `VITE_CLARITY_ID`) — no scripts load until the IDs exist.
- Funnel events: `page_view`, `view_pricing` (pricing card in viewport),
  `begin_checkout` (purchase CTA click), `generate_lead`, `contact_click` —
  mirrored alongside the existing Meta Pixel events.
- Lead forms now validate Israeli phone numbers and carry a honeypot field.

### Performance
- Fonts self-hosted (`@fontsource-variable/rubik`; Suez One loads only with
  `/program`) — the render-blocking Google Fonts CSS is gone.
- Hero image: AVIF (75KB vs 272KB JPEG) with `<picture>` fallback +
  `<link rel="preload">` written into the SSG head.
- Removed GSAP + Lenis + react-query (~90KB gz of runtime) — Framer Motion
  is the single animation system; smooth scrolling is native CSS.
- Deleted ~16MB of unused assets (mascot PNG twins, unused team photos,
  a 648KB favicon.svg); team photos converted to WebP.
- `vercel.json`: security headers (HSTS, nosniff, frame, referrer,
  permissions) + immutable caching for hashed assets.
- Lighthouse CI budget on PRs (`.github/workflows/lighthouse.yml`).

## Needs an account / a decision (not doable from code)

1. **Hosted checkout** — open a Grow/Meshulam/Cardcom/Stripe page for the
   course at ₪5,490 with up to 12 installments, then set `VITE_CHECKOUT_URL`
   in Vercel env. This is the single highest-leverage conversion step.
2. **GA4 + Clarity** — create the properties, set `VITE_GA4_ID` /
   `VITE_CLARITY_ID` in Vercel env.
3. **Meta Conversions API** — server-side events from the existing
   `website-leads-intake` Supabase function (needs a CAPI access token).
4. **Refund / guarantee policy** — the pricing card has room for a risk-
   reversal line; wording is a business/legal decision, not taken here.
5. **Privacy policy legal review** — `/privacy` was drafted factually from
   the site's actual data flows; have counsel confirm it.
6. **Lead nurture automation** — Make.com scenario: lead intake → CRM →
   WhatsApp Business API follow-up sequence.
7. **CTA text contrast (optional design call)** — white on amber is 3.1:1,
   which passes WCAG AA only for large text. Flipping `--accent-foreground`
   to the deep navy would pass AA everywhere (5.1:1) and is a one-token
   change, but it visibly restyles every primary button — a brand decision.
