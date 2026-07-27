import {
  Calculator,
  Percent,
  Landmark,
  ClipboardCheck,
  FileSpreadsheet,
  Scale,
} from "lucide-react";
import { Reveal } from "@/components/v2/Reveal";

/**
 * S7 — the tools. The point is not "look, we have calculators" but
 * "every decision in the deal stops being a feeling and becomes a
 * number". Each tool is therefore introduced by the question it answers
 * — the question the buyer already recognizes from their own process.
 */

const tools = [
  {
    icon: Calculator,
    name: "מחשבון עסקה",
    question: "המחיר שביקשו ממני הגיוני, או שאני משלם יותר מדי?",
  },
  {
    icon: Landmark,
    name: "מחשבון משכנתא ותמהיל",
    question: "כמה באמת יעלה לי ההחזר החודשי, ובאיזה תמהיל?",
  },
  {
    icon: Percent,
    name: "מחשבון מיסוי",
    question: "כמה מס רכישה או מס שבח אני צפוי לשלם בעסקה הזאת?",
  },
  {
    icon: Scale,
    name: "בדיקת כדאיות",
    question: "העסקה הזאת שווה את הכסף, או שעדיף לוותר ולחכות?",
  },
  {
    icon: ClipboardCheck,
    name: "צ׳קליסט ביקור בנכס",
    question: "מה בדיוק לבדוק בדירה לפני שמתאהבים בה?",
  },
  {
    icon: FileSpreadsheet,
    name: "קובץ מעקב נכסים",
    question: "איך משווים בין כל הדירות שראיתי בלי להתבלבל?",
  },
];

const ToolsShowcase = () => {
  return (
    <div>
      <Reveal>
        <p
          className="text-center text-body-lg leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: "hsl(36 33% 95% / 0.75)" }}
        >
          בכל שלב בעסקה עולה שאלה שאי אפשר לענות עליה בתחושת בטן. לכל שאלה כזאת
          יש בתוכנית כלי שמחזיר תשובה במספרים — בלי אקסלים ובלי רקע פיננסי.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-4xl mx-auto">
        {tools.map((tool, i) => (
          <Reveal key={tool.name} delay={i * 0.06}>
            <article
              className="h-full rounded-2xl p-5 md:p-6 border flex flex-col items-center text-center gap-3"
              style={{
                backgroundColor: "hsl(36 33% 95% / 0.04)",
                borderColor: "hsl(36 33% 95% / 0.12)",
              }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "hsl(24 80% 52% / 0.14)" }}
                aria-hidden
              >
                <tool.icon size={18} className="text-accent" />
              </span>
              <div>
                <h3 className="font-bold text-white mb-1.5 leading-snug">
                  {tool.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(36 33% 95% / 0.7)" }}
                >
                  עונה על: {tool.question}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default ToolsShowcase;
