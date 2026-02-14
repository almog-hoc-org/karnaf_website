export interface Lesson {
  title: string;
  duration: string;
  type: "video" | "document" | "quiz";
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  lessons: Lesson[];
}

export const curriculum: Module[] = [
  {
    id: 1,
    title: "הבנת השוק",
    subtitle: "יסודות שוק הנדל\"ן בישראל",
    duration: "45 דקות",
    lessons: [
      { title: "מבוא לשוק הנדל\"ן הישראלי", duration: "12 דקות", type: "video" },
      { title: "מגמות שוק ומחזורים כלכליים", duration: "10 דקות", type: "video" },
      { title: "אזורי ביקוש vs אזורי פיתוח", duration: "8 דקות", type: "video" },
      { title: "מפת מחירים — איך לקרוא את השוק", duration: "10 דקות", type: "document" },
      { title: "בוחן ידע — הבנת השוק", duration: "5 דקות", type: "quiz" },
    ],
  },
  {
    id: 2,
    title: "הכנה פיננסית",
    subtitle: "תכנון תקציב ומימון חכם",
    duration: "60 דקות",
    lessons: [
      { title: "כמה באמת עולה דירה? עלויות נלוות", duration: "10 דקות", type: "video" },
      { title: "הון עצמי — כמה צריך ומאיפה", duration: "12 דקות", type: "video" },
      { title: "סוגי משכנתאות — מסלולים ותמהילים", duration: "15 דקות", type: "video" },
      { title: "איך לבחור בנק ולנהל מו\"מ על ריבית", duration: "8 דקות", type: "video" },
      { title: "מחשבון משכנתא — תרגול מעשי", duration: "10 דקות", type: "document" },
      { title: "בוחן ידע — מימון והכנה פיננסית", duration: "5 דקות", type: "quiz" },
    ],
  },
  {
    id: 3,
    title: "אסטרטגיית חיפוש",
    subtitle: "איך למצוא את הנכס המושלם",
    duration: "40 דקות",
    lessons: [
      { title: "הגדרת קריטריונים — מה באמת חשוב", duration: "10 דקות", type: "video" },
      { title: "פלטפורמות חיפוש ומקורות מידע", duration: "12 דקות", type: "video" },
      { title: "איך לסנן עשרות נכסים ביעילות", duration: "10 דקות", type: "video" },
      { title: "רשימת בדיקה לביקור בנכס", duration: "8 דקות", type: "document" },
    ],
  },
  {
    id: 4,
    title: "בדיקת נאותות",
    subtitle: "בדיקות שחייבים לעשות לפני רכישה",
    duration: "50 דקות",
    lessons: [
      { title: "בדיקה משפטית — טאבו, חריגות ומשכנתאות", duration: "12 דקות", type: "video" },
      { title: "בדיקה הנדסית — מצב פיזי של הנכס", duration: "10 דקות", type: "video" },
      { title: "בדיקה תכנונית — תב\"ע וזכויות בנייה", duration: "10 דקות", type: "video" },
      { title: "ניתוח פיננסי של העסקה", duration: "12 דקות", type: "video" },
      { title: "בוחן ידע — בדיקת נאותות", duration: "6 דקות", type: "quiz" },
    ],
  },
  {
    id: 5,
    title: "טכניקות משא ומתן",
    subtitle: "איך לנהל מו\"מ ולהוריד מחיר",
    duration: "35 דקות",
    lessons: [
      { title: "עקרונות משא ומתן בנדל\"ן", duration: "10 דקות", type: "video" },
      { title: "טכניקות להורדת מחיר — מה עובד באמת", duration: "10 דקות", type: "video" },
      { title: "סימולציה — משא ומתן על דירה", duration: "10 דקות", type: "video" },
      { title: "טעויות נפוצות במשא ומתן", duration: "5 דקות", type: "document" },
    ],
  },
  {
    id: 6,
    title: "תהליך משפטי וסגירה",
    subtitle: "מהצעה ועד מפתח",
    duration: "55 דקות",
    lessons: [
      { title: "שלבי העסקה — ציר זמן מלא", duration: "10 דקות", type: "video" },
      { title: "זיכרון דברים — מה לכתוב ומה לא", duration: "12 דקות", type: "video" },
      { title: "חוזה רכישה — סעיפים קריטיים", duration: "15 דקות", type: "video" },
      { title: "יום המסירה — רשימת בדיקות", duration: "10 דקות", type: "document" },
      { title: "בוחן סיום — מוכנים לרכישה!", duration: "8 דקות", type: "quiz" },
    ],
  },
];
