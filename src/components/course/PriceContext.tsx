import { Reveal } from "@/components/v2/Reveal";
import { Figure } from "@/components/ui/figure-number";

/**
 * S10, beats 1-2 — the honest price choreography that replaces a
 * strikethrough anchor: what professional help around a deal actually
 * costs in Israel, an explicit statement that we are FOR those
 * professionals, and one line of arithmetic that puts ₪950 in scale.
 * Real market ranges only — no invented "value stack" numbers.
 * Styled for the dark pricing set-piece (ink + grain): the page's most
 * important frame gets the most staged treatment.
 */

const references = [
  {
    label: "עורך דין לליווי עסקה",
    value: "10,000 ₪ ומעלה",
    note: "לעיתים נגזר כאחוז משווי הנכס — עד כ-2%, כלומר עשרות אלפי שקלים",
  },
  {
    label: "ייעוץ משכנתאות",
    value: "6,000–10,000 ₪",
    note: "לעסקה אחת",
  },
  {
    label: "שמאות מקרקעין",
    value: "1,500–3,000 ₪",
    note: "לנכס בודד",
  },
  {
    label: "ליווי אישי מלא (1:1)",
    value: "2.5%–3% מהעסקה",
    note: "בעסקה של 2 מיליון ₪ — 50,000 ₪ ומעלה. כך עולה גם הליווי שלנו",
  },
];

const PriceContext = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-10">
      <Reveal>
        <p
          className="text-eyebrow uppercase tracking-[0.32em] mb-4"
          style={{ color: "hsl(36 33% 95% / 0.6)" }}
        >
          רגע של פרופורציה
        </p>
        <h2 className="text-display-md md:text-display-lg font-black text-white leading-[0.98] tracking-tight mb-4">
          כמה עולה מקצוענות בעסקת&nbsp;נדל״ן?
        </h2>
        <p
          className="text-body-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: "hsl(36 33% 95% / 0.72)" }}
        >
          אלה המחירים המקובלים בשוק לליווי מקצועי סביב עסקה אחת:
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {references.map((ref) => (
            <div
              key={ref.label}
              className="rounded-2xl border p-5 text-right flex flex-col"
              style={{
                backgroundColor: "hsl(36 33% 95% / 0.05)",
                borderColor: "hsl(36 33% 95% / 0.14)",
              }}
            >
              <p
                className="text-sm mb-2 leading-snug"
                style={{ color: "hsl(36 33% 95% / 0.65)" }}
              >
                {ref.label}
              </p>
              <p className="font-black text-lg text-white tabular-nums mb-2">
                {ref.value}
              </p>
              <p
                className="text-xs leading-relaxed mt-auto"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                {ref.note}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <p
          className="text-sm leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "hsl(36 33% 95% / 0.6)" }}
        >
          ונאמר את זה בבירור: אנחנו בעד אנשי המקצוע האלה, וכל אחד מהם שווה את
          שכרו. התוכנית לא מחליפה אף אחד מהם — היא דואגת שתגיעו אליהם מוכנים,
          תשאלו את השאלות הנכונות, ותשלמו רק על מה שבאמת נדרש.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-xl md:text-2xl font-bold text-white leading-snug max-w-2xl mx-auto">
          בעסקה של 2 מיליון&nbsp;₪, ההכנה הזאת עולה{" "}
          <Figure value="0.05" suffix="%" size="sm" dark className="align-baseline" />{" "}
          מהמחיר.
          <br className="hidden md:block" />
          הטעות שהיא מונעת נמדדת באחוזים שלמים.
        </p>
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4"
          style={{ color: "hsl(36 33% 95% / 0.7)" }}
        >
          ובמילים פשוטות: פחות מעשירית משכר הטרחה של עורך הדין בעסקה — כדי
          לדעת מה בכלל לשאול אותו.
        </p>
      </Reveal>
    </div>
  );
};

export default PriceContext;
