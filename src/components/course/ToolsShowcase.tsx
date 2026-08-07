import {
  Calculator,
  Percent,
  Landmark,
  ClipboardCheck,
  FileSpreadsheet,
  Scale,
} from "lucide-react";
import { Reveal } from "@/components/v2/Reveal";
import GapCalculator from "@/components/course/GapCalculator";

/**
 * S7 — the tools. Show, don't tell: one live mini-calculator the visitor
 * can actually drag (the 3% negotiation gap in shekels), then a compact
 * roll-call of the rest. The old six identical icon+text cards told the
 * story; this lets the visitor feel it.
 */

const tools = [
  { icon: Calculator, name: "מחשבון עסקה" },
  { icon: Landmark, name: "מחשבון משכנתא ותמהיל" },
  { icon: Percent, name: "מחשבון מיסוי" },
  { icon: Scale, name: "בדיקת כדאיות" },
  { icon: ClipboardCheck, name: "צ׳קליסט ביקור בנכס" },
  { icon: FileSpreadsheet, name: "קובץ מעקב נכסים" },
];

const ToolsShowcase = () => {
  return (
    <div>
      <Reveal>
        <p
          className="text-center text-body-lg leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "hsl(36 33% 95% / 0.75)" }}
        >
          בכל שלב בעסקה עולה שאלה שאי אפשר לענות עליה בתחושת בטן. לכל שאלה
          כזאת יש בתוכנית כלי שמחזיר תשובה במספרים — בלי אקסלים ובלי רקע
          פיננסי.
        </p>
      </Reveal>

      <GapCalculator />

      <Reveal delay={0.08}>
        <p
          className="text-center text-sm font-bold mt-10 mb-4"
          style={{ color: "hsl(36 33% 95% / 0.75)" }}
        >
          ובתוכנית מחכים עוד 6 כלים כאלה:
        </p>
        <ul className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
          {tools.map((tool) => (
            <li
              key={tool.name}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold text-white"
              style={{
                backgroundColor: "hsl(36 33% 95% / 0.05)",
                borderColor: "hsl(36 33% 95% / 0.14)",
              }}
            >
              <tool.icon size={14} className="text-accent" aria-hidden />
              {tool.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
};

export default ToolsShowcase;
