export interface Lesson {
  title: string;
  duration: string;
  type: "video" | "document" | "quiz" | "tool";
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
    title: "תיאוריה",
    subtitle: "יסודות הנדל״ן בישראל",
    duration: "45 דקות",
    lessons: [
      { title: "למה נדל\"ן — יתרונות וחסרונות לקנות דירה בישראל", duration: "10 דקות", type: "video" },
      { title: "אנשי מקצוע בעסקת נדל\"ן", duration: "8 דקות", type: "video" },
      { title: "תשואה הונית vs תשואה פירותית", duration: "10 דקות", type: "video" },
      { title: "אסטרטגיה ומשך השקעה", duration: "8 דקות", type: "video" },
      { title: "סוגי עסקאות נדל\"ן — presale, יד2, פליפ ועוד", duration: "12 דקות", type: "video" },
    ],
  },
  {
    id: 2,
    title: "התחדשות עירונית",
    subtitle: "הזדמנויות בהתחדשות עירונית",
    duration: "50 דקות",
    lessons: [
      { title: "מה זה התחדשות עירונית", duration: "8 דקות", type: "video" },
      { title: "הגדרות ומושגים שחשוב להכיר", duration: "8 דקות", type: "document" },
      { title: "ציר הזמן של פרויקט התחדשות", duration: "10 דקות", type: "video" },
      { title: "פוטנציאל הרווח", duration: "8 דקות", type: "video" },
      { title: "שאלות חובה בשלב החיפוש", duration: "6 דקות", type: "document" },
      { title: "איך מזהים פרויקט פוטנציאלי?", duration: "10 דקות", type: "video" },
      { title: "טעויות כואבות והדרך להימנע מהן", duration: "8 דקות", type: "video" },
    ],
  },
  {
    id: 3,
    title: "פרקטיקה",
    subtitle: "מתיאוריה לשטח",
    duration: "60 דקות",
    lessons: [
      { title: "הגדרת תקציב ומימון", duration: "10 דקות", type: "video" },
      { title: "10 הדיברות לדירה ראשונה ⭐", duration: "15 דקות", type: "video" },
      { title: "יורדים לשטח — הכנה מקדימה", duration: "8 דקות", type: "video" },
      { title: "מה צריך לשאול", duration: "8 דקות", type: "document" },
      { title: "בדיקות חשובות בזמן הביקור", duration: "10 דקות", type: "video" },
      { title: "טעויות ומלכודות", duration: "8 דקות", type: "video" },
      { title: "את מי להכיר ועם מי לדבר", duration: "6 דקות", type: "video" },
    ],
  },
  {
    id: 4,
    title: "משא ומתן",
    subtitle: "טכניקות ועקרונות מרכזיים",
    duration: "40 דקות",
    lessons: [
      { title: "יסודות ועקרונות", duration: "10 דקות", type: "video" },
      { title: "טכניקות מרכזיות", duration: "10 דקות", type: "video" },
      { title: "הצעת מחיר ופתרונות למו\"מ", duration: "10 דקות", type: "video" },
      { title: "איך לגייס את המתווך לטובתנו", duration: "8 דקות", type: "video" },
    ],
  },
  {
    id: 5,
    title: "דוגמאות לעסקאות אמיתיות",
    subtitle: "מקרי בוחן מהשטח",
    duration: "35 דקות",
    lessons: [
      { title: "שיפוץ וחלוקה", duration: "8 דקות", type: "video" },
      { title: "תמ\"א", duration: "8 דקות", type: "video" },
      { title: "קרקע ויזמות", duration: "8 דקות", type: "video" },
      { title: "presale מקבלן", duration: "6 דקות", type: "video" },
      { title: "פינוי בינוי", duration: "8 דקות", type: "video" },
    ],
  },
  {
    id: 6,
    title: "כלים ומחשבונים",
    subtitle: "פורטל כלים מתקדם",
    duration: "כלים",
    lessons: [
      { title: "מחשבון עסקת נדל\"ן", duration: "כלי", type: "tool" },
      { title: "מחשבון מיסוי", duration: "כלי", type: "tool" },
      { title: "מחשבון משכנתא", duration: "כלי", type: "tool" },
      { title: "צ׳קליסט ביקור בנכס", duration: "כלי", type: "tool" },
      { title: "ציר זמן של עסקת נדל\"ן", duration: "כלי", type: "tool" },
      { title: "אבני דרך לפרויקט התחדשות", duration: "כלי", type: "tool" },
      { title: "מילון מושגים מקצועי", duration: "כלי", type: "document" },
      { title: "קובץ מעקב נכסים", duration: "כלי", type: "tool" },
      { title: "מחשבון בדיקת כדאיות", duration: "כלי", type: "tool" },
      { title: "אנליסט AI מתקדם למענה על שאלות", duration: "כלי", type: "tool" },
    ],
  },
  {
    id: 7,
    title: "הרחבות מקצועיות — מיסוי נדל״ן",
    subtitle: "כל מה שצריך לדעת על מיסים",
    duration: "45 דקות",
    lessons: [
      { title: "סוגי מיסים בנדל\"ן", duration: "8 דקות", type: "video" },
      { title: "מס רכישה", duration: "8 דקות", type: "video" },
      { title: "חוק השליש", duration: "6 דקות", type: "video" },
      { title: "מס שכירות", duration: "6 דקות", type: "video" },
      { title: "מס שבח (מכירה)", duration: "8 דקות", type: "video" },
    ],
  },
  {
    id: 8,
    title: "הרחבות מקצועיות — משכנתא ומימון",
    subtitle: "להבין את המשכנתא לעומק",
    duration: "55 דקות",
    lessons: [
      { title: "מה זה משכנתא?", duration: "6 דקות", type: "video" },
      { title: "תהליך לקיחת משכנתא", duration: "10 דקות", type: "video" },
      { title: "מושגים במשכנתא", duration: "8 דקות", type: "document" },
      { title: "סודות הבנק שחייבים להכיר", duration: "10 דקות", type: "video" },
      { title: "לוח שפיצר והחזר חודשי", duration: "8 דקות", type: "video" },
      { title: "מבנה המשכנתא", duration: "8 דקות", type: "video" },
      { title: "כלים לבניית תמהיל מנצח ⭐", duration: "10 דקות", type: "video" },
      { title: "אישור עקרוני", duration: "6 דקות", type: "video" },
      { title: "משא ומתן בין הבנקים", duration: "8 דקות", type: "video" },
    ],
  },
  {
    id: 9,
    title: "כלי מחקר וניתוח",
    subtitle: "אתרים וכלים חיצוניים שחייבים להכיר",
    duration: "30 דקות",
    lessons: [
      { title: "אתר רשות המיסים", duration: "5 דקות", type: "video" },
      { title: "אתר מדלן", duration: "5 דקות", type: "video" },
      { title: "האתר להתחדשות עירונית", duration: "4 דקות", type: "video" },
      { title: "אתר הנדל\"ן הממשלתי", duration: "4 דקות", type: "video" },
      { title: "הפקת נסח טאבו", duration: "3 דקות", type: "video" },
      { title: "אתר המידע התכנוני", duration: "3 דקות", type: "video" },
      { title: "רשות מקרקעי ישראל", duration: "3 דקות", type: "video" },
      { title: "מערכת GIS", duration: "3 דקות", type: "video" },
      { title: "קווים כחולים", duration: "3 דקות", type: "video" },
      { title: "NotebookLM", duration: "3 דקות", type: "video" },
    ],
  },
];
