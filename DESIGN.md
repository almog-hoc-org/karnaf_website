# Design

## Theme

**Editorial cream — a book on buying a home: cream page, navy ink, serif headlines, one amber accent.** Dark ink sections are islands (at most one or two per page), never the front door.

הסצנה הפיזית: ישראלי בן 32 גולש בלילה לפני שינה במיטה, אחרי יום עבודה ארוך, מחפש "האם כדאי לי קורס נדל״ן". האתר צריך להרגיש כמו ספר נדל״ן עם cover מעוצב — לא כמו "buy now!" landing page. מצב הנפש: שקט-מהורהר, לא pitch-energetic. לכן: light cream background as default, dark cinematic sections כאיים של drama (CTA, course content), אבל לא הtext מוצף בdark mode.

## Color Palette

OKLCH-equivalent (HSL with low chroma at extremes per impeccable laws):

The source of truth is `src/index.css`. Key committed values:

```css
:root {
  --background: 36 33% 95%;       /* tinted cream — chroma toward warm */
  --foreground: 215 26% 23%;      /* navy ink */
  --primary: 217 42% 15%;         /* deep navy, not #000 */
  --primary-foreground: 36 33% 95%;
  --accent: 24 80% 52%;           /* warm amber — single committed accent */
  --accent-foreground: 217 42% 15%; /* navy on amber — ~5.1:1, AA for all text */
  --muted-foreground: 215 16% 44%;  /* 4.75:1+ on cream — WCAG AA body text */
  --card: 0 0% 100%;
  --ink: 217 50% 8%;              /* cinematic dark sections */
}
```

**Color strategy: Restrained.** Tinted neutrals (cream + navy with amber accent ≤10% surface). Not Drenched, not Full-palette. The amber is the only saturated color and it earns each appearance — primarily on CTAs and key pricing numbers.

Pure `#000` and `#fff` are forbidden. Cream is `36 33% 95%` (warm tint). White cards are HSL `0 0% 100%` only inside cream context where they read as white-on-cream not white-on-white.

## Typography

- **Two voices, both self-hosted** (no Google Fonts `<link>`):
  - **Display — Frank Ruhl Libre Variable** (`@fontsource-variable/frank-ruhl-libre`, Hebrew cut preloaded). `text-display-md/lg/xl` set in it automatically (a `@layer components` rule in `index.css`); `font-serif` for smaller editorial moments (card titles, pull quotes). Weight 700.
  - **Text & UI — Rubik Variable**: body, labels, buttons, numbers, calculators. `text-display-sm` stays Rubik. Weight 900 only for big numbers.
- **Body weight:** 400-500.
- **Eyebrow (`text-eyebrow`):** 13px / 700 / 0.02em — Hebrew has no capitals: never `uppercase` or wide tracking. And no kicker above a heading unless it carries information (a part number); the heading speaks for itself.
- **Hierarchy ratio:** ≥1.4 between scale steps. Display-xl is 6rem max, body is 1rem; not flat.

Sizes live in `tailwind.config.ts` (`fontSize`): display-xl `clamp(3rem, 7vw, 6rem)` / 1.02, display-lg `clamp(2.25rem, 4vw, 3.75rem)` / 1.08, display-md `clamp(1.75rem, 3vw, 2.75rem)` / 1.15 — the serif needs a little more leading than the old black sans.

Body line-height 1.85 (Hebrew RTL needs more than 1.5 — diacritics/letters take vertical space).
Body line-length capped at ~70ch via `max-w-2xl` containers.

## Layout

**Section spacing tokens** (mobile → desktop):

| Token | Mobile | Desktop |
|-------|--------|---------|
| `py-section-sm` | 3rem | 4rem |
| `py-section-md` | 5rem | 7rem |
| `py-section-lg` | 7rem | 10rem |
| `py-section-xl` | 10rem | 14rem |

**Cadence rule:** Index page לא יותר מ-3 sections רצופים באותו size. Mix md and lg.

**Container:** `max-w-7xl mx-auto px-5 md:px-6`. Inner content `max-w-3xl` for prose, `max-w-5xl` for grids.

**Cards:** Cream-on-cream cards with warm `--border` (`36 22% 85%`) hairlines. Internal `p-6 md:p-8`. No nested cards.

**No glassmorphism, no side-stripe borders, no card-grid-of-three repeating endlessly.** Where 3-up grid exists (Services, Properties), each card has different content shape (number eyebrow, title, body, list, optional badge) — not identical icon-heading-text template.

## Elevation / Shadows

```css
.shadow-depth-1  /* subtle, default cards */
.shadow-depth-2  /* hover state */
.shadow-depth-3  /* prominent CTA cards (pricing) */
.shadow-depth-4  /* modals */

.shadow-glow-accent  /* amber-glow under primary CTA */
```

Glow shadows used sparingly (פעם 1-2 בעמוד). Not on every card.

## Motion

- Library: framer-motion (page transitions + scroll-linked effects) + custom IntersectionObserver-based `<Reveal>` (fade-up with a 6px blur-in). Smooth scroll is native CSS (`scroll-behavior`) — Lenis was removed for INP.
- **Scroll choreography (2026-09):** the homepage is a scroll story — hero course-window tilts flat, syllabus marquee reacts to scroll speed, manifesto words light up, method panel pins while steps scroll, testimonials stack, closing CTA opens to full bleed. Primitives live in `src/components/v2/scroll/`; how-to and pitfalls in `docs/SCROLL-MOTION.md`. One "big" scroll effect per screen.
- **Easing:** `ease-out-quart` / `ease-out-quint`. Never bounce, never elastic.
- **Duration:** 150-300ms for micro, 600-800ms for entrance reveals.
- `prefers-reduced-motion` **and** the accessibility widget's stop-animations profiles (`useStillMotion`): all Reveals collapse to instant, scroll-linked effects rest at their final state.
- **No layout-property animation** — only transform/opacity/filter.

GSAP intentionally absent — too heavy for a static-rendered marketing site, framer-motion + IO Reveal cover the use case.

## Components (custom v2 library)

`src/components/v2/`:

| Component | Use |
|-----------|-----|
| `<Reveal>` | fade-up on scroll enter |
| `<Section>` / `<SectionDark>` | size-token container, optional accent glow |
| `<StickyCTA>` | bottom-fixed mobile CTA, publishes `--sticky-cta-h` |
| `<RoiCalculator>` | equity-based ROI math for first-time buyers |
| `<TransactionLifecycle>` | timeline of process steps |
| `<TiltCard>` | 3D tilt on mouse |
| `<MagneticButton>` | magnetic hover for primary CTAs |
| `<Sparkline>` | inline mini chart |
| `<ClipImage>` | masked image with editorial shape |
| `<Eyebrow>` | small label (Hebrew: no uppercase) |
| `scroll/<SplitReveal>` | headline rising word by word from a mask (`trigger="load"` is CSS-only, for the H1) |
| `scroll/<ScrollWords>` | statement whose words light up with scroll |
| `scroll/<StackCards>` | sticky cards dealt onto a stack |
| `scroll/<VelocityMarquee>` | endless ribbon that surges with scroll speed |
| `scroll/<ExpandOnScroll>` | inset card that opens to full bleed |
| `scroll/<ParallaxImage>` | bottom-up clip reveal + parallax |
| `scroll/<ScrollProgress>` | amber reading-progress line (RTL fill) |
| `<FitQuiz>` | multi-step qualification |

shadcn/ui primitives: Button, Accordion, Toast, Tooltip, Input, Select, Tabs, Form (in `components/ui/`).

## Animation Conventions

- **Entrance:** Reveal with `delay: i * 0.08` for staggered lists. Max 4-5 stagger items, then collapse.
- **Hover on cards:** `hover:-translate-y-1 hover:shadow-depth-3 transition-all duration-300`.
- **Hover on buttons:** color transition only (no scale — scale shifts layout).
- **Page transition:** framer-motion `<AnimatePresence>` in `SharedLayout` — 250ms fade.

## Iconography

Lucide React only. No emoji as icons. Standard sizes 16/18/24/32 (4px-grid). Stroke-width 2. Always paired with logical text label (not icon-only buttons unless WCAG-compliant aria-label).

## Imagery

- Heroes are type and a working tool, not photography: the home hero pairs the serif H1 with a live cost check (`components/home/HeroCostCheck.tsx`). No stock or generated city photos — real photography of the team or real deals only, when it exists.
- OG image: 1200×630, rendered from the site's own fonts and palette by `scripts/og-image.mjs` (run by hand, commit `public/og-image.jpg`).
- Mascot (קרנף): consistent generated style, 3-quarter pose, cream background.
- No founder stock photos. Real photoshoot or none.

## RTL Hebrew Specifics

- `<html dir="rtl" lang="he">`.
- `tabular-nums` on all numbers (prices, stats, dates).
- Phone numbers: `dir="ltr"` inline.
- Quotes: gershayim `״` not ASCII `"`.
- Direction-aware icons: `ArrowLeft` is "next" in RTL, not `ArrowRight`.
- Logical CSS: prefer `ms-`/`me-`/`ps-`/`pe-` over `ml`/`mr`/`pl`/`pr` where Tailwind supports it.
