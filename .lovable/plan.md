

## תוכנית שיפורים — צמצום רווחים ותיקונים

### 1. צמצום רווחים גלובלי (כל הדפים)

**דף הבית (Index) — קומפוננטות:**
- `StatsCounter`: `py-20` → `py-12`, `mb-12` → `mb-8`
- `Advantages`: `py-24` → `py-16`, `mb-16` → `mb-10`
- `Services`: `py-24` → `py-16`, `mb-16` → `mb-10`
- `Properties`: `py-24` → `py-16`, `mb-12` → `mb-8`
- `About`: `py-14` → `py-10`, `mb-6` → `mb-4`
- `BigCTA`: `py-32` → `py-20`, `mb-10` → `mb-8`
- `CommunitySection`: `py-20` → `py-14`, `mb-12` → `mb-8`
- `Footer`: `py-24` → `py-16`

**AnimatedSectionHeader (משפיע על כל הדפים):**
- `mb-12` (divider line) → `mb-8`
- `mb-4` (heading) → `mb-3`
- `mt-6` (divider) → `mt-4`

**PageHero:**
- `pb-12 md:pb-16` → `pb-8 md:pb-12`
- `mb-6` (title) → `mb-4`

### 2. יישור שדות טופס לימין

**ContactStrip + Footer:** הוספת `text-right` לשדה הטלפון (type=tel) ול-SelectTrigger כדי שהטקסט ייושר לימין.

### 3. הסרת המשפט "עם ידע, ליווי, ושקט בראש"

**Hero.tsx:** מחיקת אלמנט ה-`<p>` עם הטקסט "עם ידע, ליווי, ושקט בראש." (שורות 132-137).

### 4. עמוד הדרך לדירה — Trust Bar

**CoursePage.tsx:**
- שינוי האייטם `{ icon: Users, value: "300+", label: "בוגרים" }` ל-`{ icon: MessageCircle, value: "✓", label: "ליווי אישי בוואטסאפ" }` (עם אייקון `MessageCircle`)
- שינוי הגריד מ-`grid-cols-2 md:grid-cols-4` ל-`grid-cols-3` כדי שכל 3 האייטמים יהיו באותה שורה

### 5. עמוד "סיפורו של קרנף"

**AboutPage.tsx:**
- הסרת תת-הכותרת מ-PageHero (הסרת prop `subtitle`)
- צמצום רווחים: `py-20` → `py-12` בסקציות Timeline ו-Team
- `gap-12` → `gap-8` בסקציית "למה קרנף"
- `mb-8` → `mb-6` ברכיבי timeline

### קבצים לעריכה:
- `src/components/Hero.tsx`
- `src/components/StatsCounter.tsx`
- `src/components/Advantages.tsx`
- `src/components/Services.tsx`
- `src/components/Properties.tsx`
- `src/components/About.tsx`
- `src/components/BigCTA.tsx`
- `src/components/CommunitySection.tsx`
- `src/components/Footer.tsx`
- `src/components/ContactStrip.tsx`
- `src/components/rich-media/AnimatedSectionHeader.tsx`
- `src/layouts/PageHero.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/CoursePage.tsx`

