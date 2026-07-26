import { Reveal } from "@/components/v2/Reveal";
import { useCountUp } from "@/hooks/use-count-up";

/**
 * S3 — the emotional engine of the sales page: the price of walking in
 * unprepared, in honest arithmetic. Three deliberately different card
 * shapes (big number / plain text / quote) — calm tone, scary numbers.
 * This section is also the first half of the price choreography: ₪980
 * lands against these figures a few screens later.
 */
const MistakeCards = () => {
  const overpay = useCountUp(60000);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Card A — the big number */}
        <Reveal>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border border-border shadow-depth-1">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-4">
              פער של 3% במחיר
            </p>
            <p className="text-display-md font-black text-foreground tabular-nums leading-none mb-4">
              <span ref={overpay.ref}>{overpay.value.toLocaleString("he-IL")}</span>
              <span className="text-accent"> ₪</span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              בעסקה של 2 מיליון ₪, לשלם 3% מעל השוק זה 60,000 ₪. זה ההפרש בין
              מי שבדק עסקאות דומות ברחוב — למי שסמך על התחושה.
            </p>
          </article>
        </Reveal>

        {/* Card B — plain text, heavier body */}
        <Reveal delay={0.08}>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-primary text-primary-foreground shadow-depth-2">
            <p
              className="text-eyebrow uppercase tracking-[0.18em] mb-4"
              style={{ color: "hsl(36 33% 95% / 0.6)" }}
            >
              תמהיל משכנתא שגוי
            </p>
            <p className="text-lg font-bold leading-snug mb-4">
              אותו סכום, אותו בנק, תמהיל אחר — וההפרש לאורך חיי ההלוואה נמדד
              בעשרות אלפי שקלים.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(36 33% 95% / 0.7)" }}
            >
              הבנק לא יתקן אתכם. זו לא העבודה שלו.
            </p>
          </article>
        </Reveal>

        {/* Card C — quote shape */}
        <Reveal delay={0.16}>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border-r-4 border-accent shadow-depth-1">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-4">
              סעיף אחד בחוזה
            </p>
            <blockquote className="text-lg font-bold text-foreground leading-snug mb-4">
              ״מועד פינוי, הצמדות, ליקויים — סעיף אחד שלא הבנתם הוא סעיף שאתם
              חשופים בו.״
            </blockquote>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ראינו את זה ב-375+ עסקאות. כמעט תמיד זה סעיף שאפשר היה לתקן —
              לפני החתימה.
            </p>
          </article>
        </Reveal>
      </div>

      <Reveal delay={0.24}>
        <p className="text-center text-lg md:text-xl font-bold text-foreground mt-10 md:mt-12">
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
