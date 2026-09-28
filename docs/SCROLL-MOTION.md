# תנועת גלילה — איך זה בנוי (2026-09)

דף הבית עבר משפה של "רכיבים שמופיעים" (fade-up כשנכנסים למסך) לשפה של
**סיפור שהגלילה מנגנת**: הגלילה של הגולש היא ראש ההקראה, ורוב האפקטים
קשורים למיקום הגלילה עצמו ולא לטיימר. זה המנגנון שעליו בנויים אתרי
ה-AI-SaaS העדכניים (הז׳אנר של reddgrow.ai) — כאן הוא ממומש ב-Framer Motion
בלבד, בלי GSAP/Lenis (ראו `docs/UPGRADE.md`), ומלא בתוכן אמיתי של קרנף.

> **הערה על ההשראה:** השדרוג נבנה כשסביבת הענן חסמה את `reddgrow.ai`, ולכן
> לפי הכוריאוגרפיה המקובלת בז׳אנר ולא כהעתק. ב-2026-09-28 הגישה נפתחה והאתר
> נבדק אחד-לאחד — הממצאים, מה מתאים לקרנף ומה לא, ב-`docs/REDDGROW-ANALYSIS.md`.

## שני סוגי תנועה

| סוג | מתי | איך |
|-----|-----|-----|
| **Scroll-linked** (מקושר גלילה) | האפקט הוא פונקציה של מיקום הגלילה — גוללים אחורה, הוא חוזר אחורה | `useScroll` → `useScrubbed` / `useTransform` → `style` |
| **Scroll-triggered** (מופעל בכניסה) | האפקט רץ פעם אחת כשהאלמנט נכנס למסך | `IntersectionObserver` / `useInView` + transition |

כלל אצבע: מה שמספר סיפור (חלון שנפתח, מילים שנדלקות, קלפים שנערמים) —
מקושר גלילה. מה שרק צריך להגיע (כותרת, פסקה) — מופעל בכניסה.

## ארגז הכלים — `src/components/v2/scroll/`

| רכיב | מה הוא עושה | איפה בשימוש |
|------|--------------|-------------|
| `ScrollProgress` | פס התקדמות ענבר בראש המסך, מתמלא מימין (RTL) | `SharedLayout` — כל האתר |
| `SplitReveal` | כותרת שעולה מילה-מילה מתוך "חריץ" (mask). `trigger="load"` = CSS טהור שרץ מהצביעה הראשונה (ל-H1), `trigger="inview"` = בכניסה למסך | Hero, כותרות הבית, BigCTA, About |
| `ScrollWords` | פסקה שכל מילה בה "נדלקת" בסדר הקריאה ככל שהפסקה עולה במסך | Manifesto |
| `VelocityMarquee` | סרט אינסופי שנע לבד, מאיץ עם מהירות הגלילה ומתהפך כשגוללים למעלה | TopicMarquee (שמות הפרקים) |
| `StackCards` | קלפים שננעצים זה על זה; כל קלף שנוחת מקטין ומכהה את מה שמתחתיו | ProofSection (סיפורי לקוחות) |
| `ExpandOnScroll` | בלוק שמגיע ככרטיס מוקטן ומעוגל ונפתח לרוחב מלא (clip-path בלבד — אין reflow) | BigCTA (גם ב-/about וב-/testimonials) |
| `ParallaxImage` | תמונה שנחשפת מלמטה למעלה + נעה לאט מהדף (פרלקסה) | About |
| `useScrubbed` | `useTransform` בטוח לגלילה מקושרת-אלמנט (ראו "מלכודות") | כל האפקטים המקושרים |

אפקטים ספציפיים לדף הבית (בתוך הרכיבים עצמם):

- **חלון הקורס ב-Hero** — `rotateX 24°→0`, `scale 0.9→1` על פני 520px
  ראשונים של גלילה (`useScroll().scrollY`), עם `perspective: 1400px` על
  ההורה ו-`transformOrigin` בקצה העליון. החלון בנוי מהסילבוס האמיתי
  (`curriculum.ts`) — לא "דשבורד עם מספרים ממוצאים" (PRODUCT.md אוסר).
- **PathChooser** — שתי הדלתות נכנסות מצדדים מנוגדים ונפגשות. בנייד
  (כרטיסים אחד מתחת לשני) הן פשוט עולות.
- **DealStory ("תיק העסקה")** — במה נעוצה בסגנון reddgrow: עטיפה בגובה
  ~4.3 מסכים ובתוכה `sticky` בגובה מסך מלא. `scrollYProgress` של העטיפה
  (`["start start","end end"]`) קובע את השלב (4 חלונות, `BOUNDS`) ומזיז
  ברציפות את סימני "סרגל המחיר" — מחיר השוק מתרחק מהמבוקש, ההצעה שלכם
  והנגדית של המוכר הולכות זו לקראת זו ונפגשות ביעד — וכל סימן הוא שכבה
  ברוחב מלא שזזה ב-`translateX` (אחוז מהרוחב שלה = אחוז מהסרגל), בלי
  layout. הטקסט מתחלף במקום (popLayout), פס ההתקדמות מתמלא ברציפות, והאור
  מתחמם עד החתימה. בנייד אותה במה: הטקסט בגובה קבוע מעל הכרטיס, כך
  שהכרטיס לא זז בין שלבים. במצב שקט (`useStillMotion`) — אותם שלבים, בלי
  תנועה רציפה (`restTrack`). קוראי מסך מקבלים את כל הסיפור ברשימה נסתרת.
- **Navigation** — בגלילה הבר הופך ל"גלולה" צפה; נעלם בגלילה למטה, חוזר
  בכל גלילה למעלה (ולעולם לא כשתפריט פתוח או כשהפוקוס בתוכו).

## המתכון הבסיסי

```tsx
const ref = useRef<HTMLDivElement>(null);
// offset: [מתי מתחיל, מתי נגמר] — "<נקודה באלמנט> <נקודה במסך>"
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "start 0.45"], // מהרגע שהחלק העליון נכנס מלמטה, עד שהוא ב-45% מגובה המסך
});
const x = useScrubbed(scrollYProgress, [0, 1], [70, 0]);
const opacity = useScrubbed(scrollYProgress, [0, 0.6], [0.25, 1]);

return <motion.div ref={ref} style={still ? { x: 0, opacity: 1 } : { x, opacity }} />;
```

## מלכודות שנתקלנו בהן (ואיך הן פתורות)

1. **האצת חומרה שבורה ב-framer-motion 12.** `useTransform(progress, [..], [..])`
   על `scrollYProgress` עם `target` מועבר ל-`ScrollTimeline` נייטיב — אבל
   הוא נבנה בזמן render, כש-`target.current` עדיין `null`, ולכן נקשר לגלילת
   **כל הדף** במקום לאלמנט. בפועל: opacity שהיה אמור להגיע ל-1 נתקע על
   ~0.5. הפתרון: `useScrubbed` — צורת הפונקציה של `useTransform`, שלעולם
   לא מואצת. **כל מיפוי של progress עם target עובר דרכו.** (גלילה ברמת
   הדף — `scrollY` בלי target — לא מושפעת.)
2. **Hydration.** הדף מרונדר מראש (SSG). `useReducedMotion` של framer
   עונה כבר ברינדור הראשון בצד לקוח, ורכיב שמרנדר עץ אחר במצב "שקט" לא
   תואם ל-HTML → React #418. לכן `useStillMotion` (`src/hooks/`) מתחיל
   `false` בשרת ובלקוח ומתעדכן אחרי mount.
3. **"שקט" אחרי mount.** מאחר שהמצב מתהפך אחרי mount, אסור להחליף
   `style={still ? undefined : {...}}` — framer משאיר את הערך האחרון
   שכתב (כרטיס נשאר חצי שקוף). תמיד להעביר ערכי מנוחה מפורשים:
   `{ x: 0, opacity: 1 }`, `clipPath: "none"`.
4. **`filter` שנשאר.** `blur(0px)` (שונה מ-`none`) הופך אלמנט ל-containing
   block לכל `position: fixed` שבתוכו. `Reveal` מסיים ב-
   `transitionEnd: { filter: "none" }`.
5. **H1 בלי שער JS.** כותרת ה-Hero ושאר העותק מעל הקפל מונפשים ב-CSS
   keyframes (`.word-mask--load`, `.rise-in`) שרצים מהצביעה הראשונה של
   ה-HTML המרונדר מראש — לא מחכים ל-hydration. (נמדד: LCP במובייל, CPU×4,
   ירד מ-~2.7s ל-~0.56s.)
6. **עברית ב-mask.** חריץ `overflow: hidden` חותך עולים (ל) ויורדים
   (ן ף ץ ק) בגובה שורה צפוף — יש padding/margin שלילי של `0.14em`, ו-
   `vertical-align: top` כי ה-baseline של inline-block עם overflow הוא
   הקצה התחתון שלו.
7. **RTL במרקיז.** המסילה רצה ב-`dir="ltr"` (אחוזי translate צפויים),
   וכל פריט שומר `dir="rtl"`.
8. **Sticky + מדידה.** `StackCards` מודד הגעה של כל קלף על סמן אפס-גובה
   שאינו sticky — offset של אלמנט sticky זז בזמן שהוא נעוץ.

## נגישות

כל אפקט מכבד גם `prefers-reduced-motion` וגם את פרופילי "עצירת
אנימציות" / ADHD / אפילפסיה של ווידג׳ט הנגישות (`useStillMotion` מאזין
למחלקות על `body`). במצב שקט: StackCards הופך לרשימה, ScrollWords לטקסט
מלא, המרקיז לשורה סטטית, וכל ה-transforms במצב מנוחה. נבדק ב-Chromium:
אפס אלמנטים שקופים/זזים ואפס שגיאות hydration בשני המצבים.

## להוסיף לדף אחר

1. כותרת: `<SplitReveal text="..." highlight={["מילה"]} className="text-display-md ..." />`
2. הצהרה גדולה: `<ScrollWords text="..." highlight={["..."]} />`
3. סגירה דרמטית: לעטוף `SectionDark` ב-`<ExpandOnScroll>`.
4. אפקט מקושר חדש: `useScroll({ target, offset })` → `useScrubbed` →
   `style`, עם ערכי מנוחה ל-`still`.

אל תשימו יותר מאפקט "גדול" אחד (חלון / ערימה / נעיצה) לכל מסך — הכוח
של הכוריאוגרפיה הוא שכל סצנה מקבלת במה.
