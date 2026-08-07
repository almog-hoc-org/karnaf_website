import { Reveal } from "@/components/v2/Reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { Figure } from "@/components/ui/figure-number";

/**
 * S3 — the emotional engine of the sales page, staged as one artifact:
 * "the bill of walking in unprepared" — a paper ledger whose three lines
 * accumulate to a ruled total. Same honest arithmetic as before (the
 * owner-approved copy is preserved verbatim); only the stage changed
 * from a generic card grid to an owned metaphor. This is also the first
 * half of the price choreography: ₪950 lands against this bill on the
 * dark pricing set-piece a few screens later.
 */

const MistakeCards = () => {
  const overpay = useCountUp(60000);

  return (
    <div className="max-w-2xl mx-auto">
      <Reveal>
        <article className="rounded-2xl bg-card border border-border shadow-depth-2 overflow-hidden">
          {/* Receipt header */}
          <header className="px-6 md:px-8 py-5 border-b border-dashed border-border text-center">
            <p className="text-eyebrow uppercase tracking-[0.24em] text-muted-foreground font-bold">
              החשבון של חוסר ההכנה
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              שלוש טעויות נפוצות · עסקה אחת
            </p>
          </header>

          {/* Line 1 — the negotiation gap (the big counted number) */}
          <div className="px-6 md:px-8 py-6 border-b border-dashed border-border">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3 className="font-bold text-foreground">פער של 3% במחיר</h3>
              <Figure
                value={
                  <span ref={overpay.ref}>
                    {overpay.value.toLocaleString("he-IL")}
                  </span>
                }
                suffix="&nbsp;₪"
                size="sm"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              חלשים במשא ומתן? פער של 3% במחיר הדירה מוביל להבדל של
              60,000&nbsp;₪ בעסקה של 2&nbsp;מיליון. הידע הזה הוא חובה.
            </p>
          </div>

          {/* Line 2 — the mortgage mix */}
          <div className="px-6 md:px-8 py-6 border-b border-dashed border-border">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3 className="font-bold text-foreground">תמהיל משכנתא שגוי</h3>
              <p className="font-black text-foreground whitespace-nowrap">
                עשרות אלפי&nbsp;<span className="text-accent">₪</span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              אותו סכום, אותו בנק, תמהיל אחר — וההפרש לאורך חיי ההלוואה נמדד
              בעשרות אלפי שקלים. הבנק לא יתקן אתכם. זו לא העבודה שלו.
            </p>
          </div>

          {/* Line 3 — urban-renewal potential */}
          <div className="px-6 md:px-8 py-6">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3 className="font-bold text-foreground">פוטנציאל פינוי בינוי</h3>
              <p className="font-black text-foreground whitespace-nowrap">
                מאות אלפי&nbsp;<span className="text-accent">₪</span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              דירה בבניין עם פרויקט התחדשות מתקדם שווה מאות אלפי שקלים יותר —
              ומי שלא יודע לבדוק את הסטטוס, קונה (או מוכר) במחיר הלא נכון.
              את הבדיקה הזאת עושים לפני ההצעה, לא אחריה.
            </p>
          </div>

          {/* Ruled total */}
          <footer
            className="px-6 md:px-8 py-5 flex items-baseline justify-between gap-4"
            style={{ borderTop: "3px double hsl(var(--border))" }}
          >
            <p className="font-bold text-foreground">סה״כ, בלי הכנה:</p>
            <p className="font-black text-foreground text-left leading-snug">
              נמדד במאות אלפי&nbsp;<span className="text-accent">₪</span>
            </p>
          </footer>
        </article>
      </Reveal>
    </div>
  );
};

export default MistakeCards;
