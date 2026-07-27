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
              בעסקה של 2 מיליון&nbsp;₪, שלושה אחוזים מעל מחיר השוק הם
              60,000&nbsp;₪. זה כל ההפרש בין מי שבדק עסקאות דומות באותו רחוב
              לבין מי שסמך על תחושה.
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

        {/* Card C — the contract clause */}
        <Reveal delay={0.16}>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border border-border shadow-depth-1 text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent font-bold mb-4">
              סעיף אחד בחוזה
            </p>
            <blockquote className="text-lg font-bold text-foreground leading-snug mb-4">
              ״מועד פינוי, הצמדות, ליקויים — סעיף אחד שלא הבנתם הוא סעיף שאתם
              חשופים בו.״
            </blockquote>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ראינו את זה שוב ושוב ב-375+ עסקאות. וכמעט תמיד — זה סעיף שאפשר היה
              לתקן לפני החתימה.
            </p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.24}>
        <p className="text-center text-lg md:text-xl font-bold text-foreground mt-8 md:mt-10">
          אנחנו לא מספרים לכם את זה כדי להפחיד.
          <span className="text-muted-foreground font-medium">
            {" "}אנחנו מספרים כי זה קרה גם לנו.
          </span>
        </p>
      </Reveal>
    </div>
  );
};

export default MistakeCards;
