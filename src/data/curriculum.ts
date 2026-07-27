/**
 * The real course structure, as delivered by the owner (2026-07):
 * "המדריך המעשי לרכישת דירה" — 3 parts, 15 modules. The syllabus is
 * published at module level only; the 200+ individual lessons
 * (3-10 min each) are not enumerated on the site, so advertised
 * lesson copy lives in courseStats.ts as a declared label.
 */

export interface CoursePart {
  id: number;
  title: string;
  subtitle: string;
  modules: string[];
}

export const courseParts: CoursePart[] = [
  {
    id: 1,
    title: "נדל״ן: היסודות",
    subtitle: "הבסיס שכל רוכש חייב — במילים פשוטות",
    modules: [
      "היתרונות של רכישת נדל״ן בישראל",
      "סוגי העסקאות",
      "מבינים התחדשות עירונית",
      "איך להגדיר משך השקעה",
      "השפה של הרווח: מושגי חובה",
    ],
  },
  {
    id: 2,
    title: "החלק המעשי",
    subtitle: "מהאיתור ועד החתימה — צעד אחר צעד בשטח",
    modules: [
      "הדגמת איתור וניתוח עסקה אמיתית",
      "יורדים לשטח — כל מה שצריך לדעת",
      "תכנון פיננסי חכם של עסקת נדל״ן",
      "מאסטר קלאס משא ומתן: כל השיטות והטיפים",
      "נבחרת מנצחת: אנשי המקצוע ואיך לנהל אותם בחכמה",
      "עשרת הדיברות: עשה ואל תעשה בעסקת נדל״ן",
    ],
  },
  {
    id: 3,
    title: "כספת הידע — מיני קורסים",
    subtitle: "העמקות ממוקדות למי שרוצה יותר",
    modules: [
      "מיסוי נדל״ן — רק מה שצריך לדעת",
      "פינוי בינוי: ניתוח מהיר ויעיל",
      "יסודות המשכנתא: כך תנצחו את הבנק",
      "קרקעות ומכרזים לאנשי מילואים (ולא רק!)",
    ],
  },
];
