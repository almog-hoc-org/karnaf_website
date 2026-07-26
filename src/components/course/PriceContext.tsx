import { Reveal } from "@/components/v2/Reveal";

/**
 * S10 beats 1+2 — the honest price choreography that replaces the old
 * strikethrough anchor: real market costs of adjacent professional
 * services, an integrity line (we're FOR those professionals), and one
 * arithmetic line that makes ₪980 land as a rounding error against the
 * deal. No fabricated "worth" numbers anywhere.
 */

const references = [
  { label: "שעת ייעוץ אצל עו״ד מקרקעין", value: "מאות ₪" },
  { label: "שמאות מלאה לנכס אחד", value: "1,500–3,000 ₪" },
  { label: "יועץ משכנתאות לעסקה אחת", value: "3,000–6,000 ₪" },
];

const PriceContext = () => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
      <Reveal>
        <p className="text-eyebrow uppercase tracking-[0.32em] text-muted-foreground mb-4">
          בשביל פרופורציה
        </p>
        <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-8">
          כמה עולה ידע בעולם הנדל״ן?
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {references.map((ref) => (
            <div
              key={ref.label}
              className="rounded-2xl border border-border bg-background p-5"
            >
              <p className="text-sm text-muted-foreground mb-2 leading-snug">
                {ref.label}
              </p>
              <p className="font-bold text-foreground tabular-nums">{ref.value}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          וחשוב לומר: אנחנו בעד אנשי המקצוע האלה. הקורס לא מחליף אותם — הוא
          דואג שתגיעו אליהם מוכנים, תשאלו את השאלות הנכונות, ותשלמו רק על מה
          שבאמת צריך.
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
