import { BookOpen, Calculator, Search, FileCheck, Handshake, UserCheck, Target, BarChart3, Building, Scale, type LucideIcon } from "lucide-react";

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ComparisonRow {
  aspect: string;
  course: string;
  premium: string;
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
];

export const premiumFeatures = [
  "ניתוח פיננסי אישי והגדרת אסטרטגיה",
  "איתור, חיפוש וסינון נכסים בשבילכם",
  "ניהול משא ומתן מקצועי",
  "חיבור לבעלי מקצוע ותפירת חליפה אישית",
  "ליווי משפטי לאורך כל התהליך",
  "ניתוח שוק ואזורי השקעה מותאם",
  "תמיכה אישית לאורך כל הדרך",
  "ביקורי נכסים עם מומחה צמוד",
];

export const comparisonTable: ComparisonRow[] = [
  { aspect: "ליווי אישי", course: "קהילת בוגרים", premium: "מומחה צמוד 1-על-1" },
  { aspect: "ניתוח פיננסי", course: "כלים ומחשבונים עצמאיים", premium: "ניתוח מותאם אישית" },
  { aspect: "חיפוש נכסים", course: "ללמוד לחפש בעצמכם", premium: "אנחנו מחפשים בשבילכם" },
  { aspect: "משא ומתן", course: "טכניקות וסימולציות", premium: "ניהול משא ומתן מקצועי" },
  { aspect: "ליווי משפטי", course: "הכוונה כללית", premium: "חיבור לעו\"ד + פיקוח" },
  { aspect: "תוכן לימודי", course: "50+ שיעורים מקיפים", premium: "תוכן + יישום מלא" },
  { aspect: "זמן השקעה", course: "בקצב שלכם", premium: "אנחנו עושים את העבודה" },
  { aspect: "מתאים ל...", course: "רוכשי דירה ראשונה", premium: "משקיעים ורוכשים מנוסים" },
];

export const courseProcessSteps: ProcessStep[] = [
  { icon: BookOpen, title: "הרשמה וגישה", description: "נרשמים לתוכנית ומקבלים גישה מיידית לכל 50+ השיעורים הדיגיטליים" },
  { icon: Calculator, title: "לימוד והבנה", description: "עוברים על המודולים בקצב שלכם — שוק, מימון, חיפוש, משא ומתן ומשפטים" },
  { icon: Search, title: "תרגול מעשי", description: "משתמשים במחשבונים ובכלים לניתוח עסקאות אמיתיות" },
  { icon: FileCheck, title: "בדיקת נאותות", description: "לומדים לבדוק כל נכס לעומק — משפטי, הנדסי ופיננסי" },
  { icon: Handshake, title: "סגירת עסקה", description: "מנהלים משא ומתן וסוגרים עסקה בביטחון מלא" },
];

export const premiumProcessSteps: ProcessStep[] = [
  { icon: UserCheck, title: "פגישת היכרות", description: "פגישה אישית להבנת הצרכים, המטרות והמצב הפיננסי שלכם" },
  { icon: Target, title: "הגדרת אסטרטגיה", description: "בניית תוכנית פעולה מותאמת — סוג הנכס, אזור, תקציב ולוח זמנים" },
  { icon: BarChart3, title: "איתור וסינון", description: "אנחנו מחפשים, בודקים ומסננים נכסים — ומביאים לכם רק את הטובים ביותר" },
  { icon: Building, title: "משא ומתן וסגירה", description: "מנהלים עבורכם את המשא ומתן ומלווים עד חתימת החוזה" },
  { icon: Scale, title: "ליווי לאחר רכישה", description: "תמיכה גם אחרי הסגירה — השכרה, ניהול ואופטימיזציה של ההשקעה" },
];
