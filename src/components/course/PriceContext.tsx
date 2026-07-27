import { Reveal } from "@/components/v2/Reveal";

/**
 * S10, beats 1-2 — the honest price choreography that replaces a
 * strikethrough anchor: what professional help around a deal actually
 * costs in Israel, an explicit statement that we are FOR those
 * professionals, and one line of arithmetic that puts ₪950 in scale.
 * Real market ranges only — no invented "value stack" numbers.
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
    <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
      <Reveal>
        <p className="text-eyebrow uppercase tracking-[0.32em] text-muted-foreground mb-4">
          רגע של פרופורציה
        </p>
        <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-4">
          כמה עולה מקצוענות בעסקת נדל״ן?
        </h2>
        <p className="text-body-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
          אלה המחירים המקובלים בשוק לליווי מקצועי סביב עסקה אחת:
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {references.map((ref) => (
            <div
              key={ref.label}
              className="rounded-2xl border border-border bg-background p-5 text-right flex flex-col"
            >
              <p className="text-sm text-muted-foreground mb-2 leading-snug">
                {ref.label}
              </p>
              <p className="font-black text-lg text-foreground tabular-nums mb-2">
                {ref.value}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                {ref.note}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          ונאמר את זה בבירור: אנחנו בעד אנשי המקצוע האלה, וכל אחד מהם שווה את
          שכרו. התוכנית לא מחליפה אף אחד מהם — היא דואגת שתגיעו אליהם מוכנים,
          תשאלו את השאלות הנכונות, ותשלמו רק על מה שבאמת נדרש.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="text-xl md:text-2xl font-bold text-foreground leading-snug max-w-2xl mx-auto">
          בעסקה של 2 מיליון ₪, ההכנה הזאת עולה{" "}
          <span className="text-accent">0.05%</span> מהמחיר.
          <br className="hidden md:block" />
          הטעות שהיא מונעת נמדדת באחוזים שלמים.
        </p>
      </Reveal>
    </div>
  );
};

export default PriceContext;
