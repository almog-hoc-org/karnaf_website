import { Reveal } from "@/components/v2/Reveal";
import { useCountUp } from "@/hooks/use-count-up";

/**
 * S3 — the emotional engine of the sales page: the price of walking in
 * unprepared, in honest arithmetic. Three deliberately different card
 * shapes (big number / plain text / quote) — calm tone, scary numbers.
 * This section is also the first half of the price choreography: ₪950
 * lands against these figures a few screens later.
 */
const MistakeCards = () => {
  const overpay = useCountUp(60000);

  return (
    <div>
      {/* One calm, unified card style — the scary part is the numbers,
          not the palette. Amber marks only the figures and eyebrows. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Card A — the big number */}
        <Reveal>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border border-border shadow-depth-1 text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent font-bold mb-4">
              פער של 3% במחיר
            </p>
            <p className="text-display-md font-black text-foreground tabular-nums leading-none mb-4">
              <span className="whitespace-nowrap">
                <span ref={overpay.ref}>{overpay.value.toLocaleString("he-IL")}</span>
                <span className="text-accent"> ₪</span>
              </span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              חלשים במשא ומתן? פער של 3% במחיר הדירה מוביל להבדל של
              60,000&nbsp;₪ בעסקה של 2&nbsp;מיליון. הידע הזה הוא חובה.
            </p>
          </article>
        </Reveal>

        {/* Card B — the mortgage mix */}
        <Reveal delay={0.08}>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border border-border shadow-depth-1 text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent font-bold mb-4">
              תמהיל משכנתא שגוי
            </p>
            <p className="text-lg font-bold text-foreground leading-snug mb-4">
              אותו סכום, אותו בנק, תמהיל אחר — וההפרש לאורך חיי ההלוואה נמדד
              בעשרות אלפי שקלים.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              הבנק לא יתקן אתכם. זו לא העבודה שלו.
            </p>
          </article>
        </Reveal>

        {/* Card C — urban-renewal potential */}
        <Reveal delay={0.16}>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border border-border shadow-depth-1 text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent font-bold mb-4">
              פוטנציאל פינוי בינוי
            </p>
            <p className="text-lg font-bold text-foreground leading-snug mb-4">
              דירה בבניין עם פרויקט התחדשות מתקדם שווה מאות אלפי שקלים יותר —
              ומי שלא יודע לבדוק את הסטטוס, קונה (או מוכר) במחיר הלא נכון.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              את הבדיקה הזאת עושים לפני ההצעה, לא אחריה.
            </p>
          </article>
        </Reveal>
      </div>
    </div>
  );
};

export default MistakeCards;
