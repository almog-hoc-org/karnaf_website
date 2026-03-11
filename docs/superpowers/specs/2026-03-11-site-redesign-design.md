# Karnaf Site Redesign — Design Spec

**Date:** 2026-03-11
**Tone:** Authoritative-professional
**Focus:** CoursePage ("הדרך לדירה") + site-wide visual uplift
**Constraint:** All numbers, facts, and data stay exactly as they are. No invented claims.

## Decisions

- Course is sold via direct checkout link (Rav Messer Scholar), not WhatsApp
- Single tier — price to be added later (placeholder in pricing card)
- Audience: first-time buyers + beginner investors
- Pain points: fear of mistakes, lack of knowledge, loneliness in the process
- Video trailer URL is placeholder — show styled placeholder until real URL added

---

## CoursePage Redesign

### 1. Hero — Custom (replaces generic PageHero)

**Structure:**
- Dark gradient mesh background (deeper than standard PageHero)
- Provocative line (smaller): "רוב הישראלים קונים את הנכס היקר בחייהם — בלי שום הכנה."
- Main title (large, gradient glow): "הדרך לדירה"
- Subtitle: "תוכנית הליווי המקצועית שמלמדת אתכם לקנות דירה חכם — מא׳ ועד ת׳."
- Badge: "50+ שיעורים · 6+ כלים מתקדמים · ליווי צמוד"
- CTA button: scrolls to pricing section

**Trust bar below hero:**
Horizontal stats strip with counting animation (reuse StatsCounter pattern):
300+ בוגרים | 50+ שיעורים | 5+ שעות תוכן | 6+ כלים

### 2. Problem → Solution (NEW section)

Split layout:
- **Right ("הבעיה"):** cold gray background, red X icons, list of pain points
- **Left ("הפתרון"):** warm gradient background, orange check icons, list of benefits
- Solution side slightly elevated (shadow + scale)
- Animation: problems appear first, solution follows with delay

Pain points (factual):
- משלמים מעל למחיר השוק
- חותמים על חוזה בלי להבין
- לוקחים משכנתא לא מתאימה
- מפספסים הזדמנויות

Solution points (match actual program content):
- מבינים כל שלב בתהליך
- יודעים לנתח עסקה ולזהות הזדמנות
- נכנסים למשא ומתן עם כלים וביטחון
- מגובים בליווי צמוד של אנליסט נדל״ן

### 3. Video Trailer

- Styled frame: gradient border, large shadow, rounded corners
- Title: "ראו בעצמכם"
- Subtitle stays: "3 דקות שמסבירות בדיוק מה תקבלו ואיך זה עובד."
- Placeholder state when URL is default/rickroll: overlay with "הטריילר בדרך" + CTA to scroll to pricing

### 4. "מה בתוכנית?" — 3 Feature Cards + Curriculum

**Replaces:** ProcessStepper + Features list + separate sections
**Merges into:** One cohesive section

3 large cards (data from services.ts cards array — unchanged):
- עיקרי התוכנית / כלים ומחשבונים / ליווי מקצועי
- Gradient borders, glass-card effect, enlarged icons
- Hover: lift + orange shadow + border intensify
- Middle card badge: "הלב של התוכנית"
- Feature lists with orange checkmarks (same content)

Below cards: CurriculumAccordion (unchanged, add summary bar: "9 מודולים · 56 שיעורים · 5+ שעות")

**Removed:** ProcessStepper (redundant), separate Features section (merged)

### 5. FitQuiz

- Keep as-is — it works well and is interactive
- **Visual uplift only:** gradient border on the card, subtle background pattern
- After result: add CTA button "לרכישת התוכנית" that scrolls to pricing

### 6. Pricing Card (NEW — replaces WhatsApp CTA)

Centered, prominent card:
- Gradient border, glow shadow, slightly larger than surrounding content
- GraduationCap icon
- Title: "הצטרפו לתוכנית"
- Price: placeholder "₪XXX" (owner will update)
- Value list with checkmarks: 50+ שיעורים, 6+ כלים, ליווי צמוד, גישה ל-12 חודשים, קהילת בוגרים
- **Primary CTA:** "לרכישה מאובטחת" → external checkout link (placeholder href)
- **Secondary:** WhatsApp link "יש שאלות? דברו איתנו"
- Trust badges below: "תשלום מאובטח" · "גישה מיידית" · "ליווי צמוד"

### 7. Testimonials

- Keep TestimonialVideoCard structure
- **Uplift:** larger quote text, more prominent star rating, subtle gradient background on cards
- Course testimonials filter stays

### 8. FAQ

- Keep as-is — clean and functional
- Minor: add subtle gradient background to match section rhythm

### 9. Final CTA

- Keep BigCTA component (already well-designed)
- **Change:** primary button links to checkout (not WhatsApp)
- Secondary text link to WhatsApp stays

---

## Homepage Improvements

### Hero
- Keep current structure (it's already strong)
- **Tighten copy:** ensure CTA "לתוכנית הדרך לדירה" is prominent and clear

### Services section (homepage)
- **Visual uplift:** apply same glass-card + gradient-border treatment as CoursePage cards
- This creates visual consistency between homepage preview and course page

### StatsCounter
- No changes needed — already works well

### Advantages
- **Visual uplift:** gradient borders on the 3 TiltCards, subtle background depth
- Consistent with course page card treatment

### BigCTA
- Keep as-is (already has good visual treatment)

---

## Site-Wide Visual Improvements

### New CSS utilities needed:
- `.mesh-gradient-bg` — subtle animated mesh gradient for hero/feature sections
- `.card-premium` — glass-card + gradient-border + enhanced hover (combines existing utilities)
- `.section-divider` — decorative gradient line between sections for rhythm

### Section rhythm:
- Alternate between white/warm backgrounds more deliberately
- Add subtle top/bottom gradient dividers between sections

### Typography:
- No font changes (Heebo is good)
- Ensure consistent use of text-display for headlines across all pages

---

## What Does NOT Change

- All numbers: 375+, 300+, 50+, 8+, 5+, 6+ — exact as in code
- All testimonial quotes — verbatim
- All curriculum data — verbatim
- All FAQ answers — verbatim
- Navigation structure
- Footer
- Color scheme (primary orange, warm light theme)
- Font (Heebo)
- Mascot usage patterns
- Accessibility features
