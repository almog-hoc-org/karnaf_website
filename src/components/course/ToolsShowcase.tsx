import { Calculator, Percent, Landmark, ClipboardCheck, FileSpreadsheet, Scale, Sparkles } from "lucide-react";
import { Reveal } from "@/components/v2/Reveal";

/**
 * S7 — the tools + AI analyst spotlight. Deliberately STATIC (show, don't
 * make them work): a faux-UI deal-analysis card sells the experience
 * without turning the sales page into a homework session. The single
 * amber glow of the dark half of the page lives on the AI card.
 */

const tools = [
  { icon: Calculator, label: "מחשבון עסקת נדל״ן" },
  { icon: Percent, label: "מחשבון מיסוי" },
  { icon: Landmark, label: "מחשבון משכנתא וכדאיות" },
  { icon: ClipboardCheck, label: "צ׳קליסט ביקור בנכס" },
  { icon: FileSpreadsheet, label: "קובץ מעקב נכסים" },
  { icon: Scale, label: "בדיקת כדאיות עסקה" },
];

const ToolsShowcase = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Faux deal-analysis card — the feeling of "I input numbers, I get an answer" */}
      <Reveal>
        <div
          className="rounded-2xl p-6 md:p-8 border shadow-depth-3"
          style={{
            backgroundColor: "hsl(36 33% 95% / 0.05)",
            borderColor: "hsl(36 33% 95% / 0.14)",
          }}
          aria-label="הדמיה של ניתוח עסקה במחשבון התוכנית"
        >
          <div
            className="flex items-center justify-between text-eyebrow uppercase tracking-[0.18em] mb-6"
            style={{ color: "hsl(36 33% 95% / 0.55)" }}
          >
            <span>ניתוח עסקה · הדמיה</span>
            <span className="font-mono">KARNAF TOOLS</span>
          </div>
          <div className="space-y-4" dir="rtl">
            {[
              { label: "מחיר מבוקש", value: "1,890,000 ₪" },
              { label: "עסקאות דומות ברחוב (ממוצע)", value: "1,812,000 ₪" },
              { label: "מס רכישה צפוי", value: "0 ₪" },
              { label: "החזר חודשי (תמהיל מוצע)", value: "6,480 ₪" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b pb-3"
                style={{ borderColor: "hsl(36 33% 95% / 0.08)" }}
              >
                <span className="text-sm" style={{ color: "hsl(36 33% 95% / 0.65)" }}>
                  {row.label}
                </span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {row.value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-bold text-white">שורה תחתונה</span>
              <span className="font-bold text-accent">מעל מחיר השוק — יש מקום למו״מ</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div>
        {/* Tool chips */}
        <Reveal>
          <ul className="grid grid-cols-2 gap-3 mb-8">
            {tools.map((tool) => (
              <li
                key={tool.label}
                className="flex items-center gap-3 rounded-xl px-4 py-3 border text-sm"
                style={{
                  backgroundColor: "hsl(36 33% 95% / 0.04)",
                  borderColor: "hsl(36 33% 95% / 0.12)",
                  color: "hsl(36 33% 95% / 0.85)",
                }}
              >
                <tool.icon size={16} className="text-accent shrink-0" />
                <span>{tool.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* AI analyst card — the one glow */}
        <Reveal delay={0.1}>
          <div
            className="rounded-2xl p-6 md:p-7 border relative overflow-hidden"
            style={{
              backgroundColor: "hsl(36 33% 95% / 0.05)",
              borderColor: "hsl(24 80% 52% / 0.4)",
              boxShadow: "0 0 60px hsl(24 80% 52% / 0.15)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-accent" />
              <span className="font-bold text-white">האנליסט החכם של התוכנית</span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "hsl(36 33% 95% / 0.75)" }}
            >
              שאלה בשתיים בלילה? האנליסט ה-AI עונה. על העסקה שלכם, במילים
              שלכם — בלי תור, בלי מבוכה.
            </p>
            <div
              className="rounded-xl rounded-tr-sm px-4 py-3 text-sm max-w-[85%]"
              style={{ backgroundColor: "hsl(36 33% 95% / 0.08)", color: "hsl(36 33% 95% / 0.9)" }}
              dir="rtl"
            >
              ״המוכר רוצה הצמדה למדד בחוזה — זה סביר?״
            </div>
            <div
              className="mt-2 rounded-xl rounded-tl-sm px-4 py-3 text-sm max-w-[85%] mr-auto border"
              style={{
                backgroundColor: "hsl(24 80% 52% / 0.1)",
                borderColor: "hsl(24 80% 52% / 0.25)",
                color: "hsl(36 33% 95% / 0.9)",
              }}
              dir="rtl"
            >
              תלוי בתקופה עד המסירה. בוא נעבור על שלושת הדברים שחשוב לבדוק…
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className="text-sm mt-6"
            style={{ color: "hsl(36 33% 95% / 0.6)" }}
          >
            לא צריך אקסל ולא רקע פיננסי. מזינים מספרים — מקבלים תשובה.
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default ToolsShowcase;
