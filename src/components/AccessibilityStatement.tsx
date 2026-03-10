import { motion } from "framer-motion";
import { X, Accessibility } from "lucide-react";

interface Props {
  onClose: () => void;
}

const AccessibilityStatement = ({ onClose }: Props) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-foreground/40 backdrop-blur-sm"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[90] bg-card rounded-2xl shadow-2xl overflow-y-auto sm:max-w-lg sm:max-h-[85vh] w-full"
      dir="rtl"
      role="dialog"
      aria-label="הצהרת נגישות"
    >
      {/* Header */}
      <div className="sticky top-0 bg-card z-10 flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">הצהרת נגישות</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="סגור"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="p-5 space-y-4 text-sm leading-relaxed text-foreground">
        <p>
          <strong>קרנף נדל"ן</strong> מחויבת להנגשת האתר לכלל האוכלוסייה, לרבות אנשים עם
          מוגבלויות, וזאת בהתאם לחוק שוויון זכויות לאנשים עם מוגבלויות, התשנ"ח-1998,
          ובהתאם לתקן הישראלי IS 5568 המבוסס על הנחיות WCAG 2.1 ברמה AA.
        </p>

        <h3 className="font-bold text-foreground">פעולות שבוצעו להנגשת האתר</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>התאמת האתר לתקן WCAG 2.1 ברמה AA</li>
          <li>תוסף נגישות צף המאפשר התאמות אישיות</li>
          <li>התאמת גודל טקסט ומרווחי שורות</li>
          <li>מצבי ניגודיות גבוהה, היפוך צבעים וגווני אפור</li>
          <li>הדגשת קישורים וסמן מוגדל</li>
          <li>עצירת אנימציות עבור משתמשים רגישים</li>
          <li>פרופילים מותאמים: עיוורון צבעים, ADHD, אפילפסיה</li>
          <li>תמיכה בניווט מקלדת מלא</li>
          <li>שימוש בתגיות סמנטיות ותכונות ARIA</li>
          <li>שמירת העדפות נגישות בין ביקורים</li>
        </ul>

        <h3 className="font-bold text-foreground">דרכי פנייה בנושא נגישות</h3>
        <p className="text-muted-foreground">
          אם נתקלתם בבעיית נגישות באתר, נשמח לסייע. ניתן לפנות אלינו:
        </p>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong>רכז/ת נגישות:</strong> קרנף נדל"ן
          </li>
          <li>
            <strong>טלפון:</strong>{" "}
            <a href="tel:+972559966175" className="text-primary hover:underline">
              055-996-6175
            </a>
          </li>
          <li>
            <strong>דוא"ל:</strong>{" "}
            <a
              href="mailto:karnaf.yazamut@gmail.com"
              className="text-primary hover:underline"
            >
              karnaf.yazamut@gmail.com
            </a>
          </li>
        </ul>

        <h3 className="font-bold text-foreground">תאריך עדכון הצהרת הנגישות</h3>
        <p className="text-muted-foreground">הצהרה זו עודכנה לאחרונה בתאריך: מרץ 2026</p>

        <p className="text-xs text-muted-foreground pt-2 border-t border-border">
          אנו ממשיכים לפעול לשיפור הנגישות באתר ועומדים לרשותכם בכל שאלה או בקשה.
        </p>
      </div>
    </motion.div>
  </>
);

export default AccessibilityStatement;
