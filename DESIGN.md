# Design

## Theme

**Cinematic editorial — light cream surface, deep navy ink, single amber accent.**

הסצנה הפיזית: ישראלי בן 32 גולש בלילה לפני שינה במיטה, אחרי יום עבודה ארוך, מחפש "האם כדאי לי קורס נדל״ן". האתר צריך להרגיש כמו ספר נדל״ן עם cover מעוצב — לא כמו "buy now!" landing page. מצב הנפש: שקט-מהורהר, לא pitch-energetic. לכן: light cream background as default, dark cinematic sections כאיים של drama (CTA, course content), אבל לא הtext מוצף בdark mode.

## Color Palette

OKLCH-equivalent (HSL with low chroma at extremes per impeccable laws):

```css
:root {
  --background: 36 33% 95%;       /* tinted cream — chroma toward warm */
  --foreground: 217 50% 12%;      /* deep navy ink */
  --primary: 217 50% 8%;          /* near-black navy, but not #000 */
  --primary-foreground: 36 33% 95%;
  --accent: 24 80% 52%;           /* warm amber — single committed accent */
  --accent-foreground: 0 0% 100%;
  --muted: 36 33% 90%;
  --muted-foreground: 217 30% 30%;
  --card: 0 0% 100%;
  --border: 36 33% 85%;
}
```

**Color strategy: Restrained.** Tinted neutrals (cream + navy with amber accent ≤10% surface). Not Drenched, not Full-palette. The amber is the only saturated color and it earns each appearance — primarily on CTAs and key pricing numbers.

Pure `#000` and `#fff` are forbidden. Cream is `36 33% 95%` (warm tint). White cards are HSL `0 0% 100%` only inside cream context where they read as white-on-cream not white-on-white.

## Typography

- **Family:** Rubik (Google Fonts), single family. Hebrew + Latin coverage. No serif companion — single-family commitment.
- **Display weight:** 900 (black). Used for `.text-display-xl/lg/md/sm`.
- **Body weight:** 400-500.
- **Eyebrow weight:** 700, uppercase, letter-spacing 0.18em.
- **Hierarchy ratio:** ≥1.4 between scale steps. Display-xl is 6rem max, body is 1rem; not flat.

```css
.text-display-xl { font-size: clamp(3.5rem, 8vw, 6rem); line-height: 0.95; }
.text-display-lg { font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 0.98; }
.text-display-md { font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.0; }
.text-body-lg { font-size: 1.125rem; line-height: 1.85; }
```

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

**Cards:** Cream-on-cream cards with `1px solid hsl(36 33% 85%)` borders. Internal `p-6 md:p-8`. No nested cards.

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

- Library: framer-motion (page transitions) + custom IntersectionObserver-based `<Reveal>`.
- Lenis for smooth scroll.
- **Easing:** `ease-out-quart` / `ease-out-quint`. Never bounce, never elastic.
- **Duration:** 150-300ms for micro, 600-800ms for entrance reveals.
- `prefers-reduced-motion`: all Reveals collapse to instant.
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
| `<Eyebrow>` | small uppercase label |
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

- Hero photography: cinematic Israeli urban (Tel Aviv skyline, architectural close-ups, golden hour). Generated via nano-banana / Gemini 3 Pro Image, NOT stock-photo handshakes.
- OG image: 1200×630 with hero photo + brand wordmark overlay.
- Mascot (קרנף): consistent generated style, 3-quarter pose, cream background.
- No founder stock photos. Real photoshoot or none.

## RTL Hebrew Specifics

- `<html dir="rtl" lang="he">`.
- `tabular-nums` on all numbers (prices, stats, dates).
- Phone numbers: `dir="ltr"` inline.
- Quotes: gershayim `״` not ASCII `"`.
- Direction-aware icons: `ArrowLeft` is "next" in RTL, not `ArrowRight`.
- Logical CSS: prefer `ms-`/`me-`/`ps-`/`pe-` over `ml`/`mr`/`pl`/`pr` where Tailwind supports it.
