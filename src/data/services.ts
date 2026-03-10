import { BookOpen, Calculator, Search, Headphones, Home, type LucideIcon } from "lucide-react";

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const courseFeatures = [
  "שיעורים דיגיטליים מובנים צעד אחר צעד",
  "מחשבונים וכלים לניתוח עסקאות",
  "ידע מעשי מא׳ עד ת׳ על תהליך הרכישה",
  "גישה מלאה לתכנים — ללמוד בקצב שלכם",
  "תבניות מסמכים להורדה",
  "קהילת בוגרים פעילה",
  "עדכונים שוטפים של תוכן חדש",
  "גישה לשיעורים ממכשיר נייד",
  "ליווי צמוד בוואטסאפ של אנליסט נדל״ן",
];

export const courseProcessSteps: ProcessStep[] = [
  { icon: BookOpen, title: "הרשמה וגישה", description: "נרשמים לתוכנית ומקבלים גישה מיידית לכל 50+ השיעורים, מחשבונים וכלים מתקדמים, וליווי צמוד של אנליסט נדל״ן" },
  { icon: Calculator, title: "למידה בקצב שלכם", description: "מאיפה מתחילים? יסודות חשובים, ממה חשוב להיזהר?, איך עושים משא ומתן ועוד המון תוכן בלעדי ומדויק" },
  { icon: Search, title: "תרגול מעשי", description: "משתמשים במחשבונים ובכלים לניתוח עסקאות אמיתיות, עם ליווי ומענה לשאלות בוואטסאפ מהאנליסטים שלנו" },
  { icon: Home, title: "דירה משלכם", description: "נכנסים לשוק הנדל״ן בביטחון וידע שיחסוך לכם כאב ראש, זמן וכסף רב ויקרב אתכם לדירה משלכם" },
];
