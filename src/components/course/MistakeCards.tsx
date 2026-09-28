import { useRef, type ReactNode } from "react";
import { motion, useScroll } from "framer-motion";
import { useScrubbed } from "@/components/v2/scroll";
import { useCountUp } from "@/hooks/use-count-up";
import { useStillMotion } from "@/hooks/use-still-motion";

/* Each card rises from its own depth as the grid scrolls up — the four
   costs arrive one after another, pulled by the reader's own scroll. */
const Arrive = ({ i, progress, still, children }: { i: number; progress: ReturnType<typeof useScroll>["scrollYProgress"]; still: boolean; children: ReactNode }) => {
  const y = useScrubbed(progress, [0, 1], [40 + i * 28, 0]);
  const opacity = useScrubbed(progress, [0, 0.35 + i * 0.12], [0.2, 1]);
  return (
    <motion.div className="h-full" style={still ? { y: 0, opacity: 1 } : { y, opacity }}>
      {children}
    </motion.div>
  );
};

/**
 * S3 — the emotional engine of the sales page: the price of walking in
 * unprepared, in honest arithmetic. Four costs — the 3% overpay, the
 * mortgage mix, urban-renewal status and (2026's own trap) the developer
 * financing deal whose list price hides the real one. Calm tone, scary
 * numbers; the one external figure is attributed in the card.
 * This section is also the first half of the price choreography: ₪950
 * lands against these figures a few screens later.
 */
const MistakeCards = () => {
  const overpay = useCountUp(60000);
  const still = useStillMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "start 0.3"] });

  return (
    <div>
      {/* One calm, unified card style — the scary part is the numbers,
          not the palette. Amber marks only the figures and eyebrows. */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
        {/* Card A — the big number */}
        <Arrive i={0} progress={scrollYProgress} still={still}>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border border-border shadow-depth-1 text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent font-bold mb-4">
              פער של 3% במחיר
            </p>
            <p className="text-display-md text-foreground tabular-nums leading-none mb-4">
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
        </Arrive>

        {/* Card B — the mortgage mix */}
        <Arrive i={1} progress={scrollYProgress} still={still}>
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
        </Arrive>

        {/* Card C — urban-renewal potential */}
        <Arrive i={2} progress={scrollYProgress} still={still}>
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
        </Arrive>
        {/* Card D — 2026's own trap: the developer financing deal */}
        <Arrive i={3} progress={scrollYProgress} still={still}>
          <article className="h-full rounded-2xl p-6 md:p-8 bg-card border border-border shadow-depth-1 text-center">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-accent font-bold mb-4">
              מבצע 20/80 של קבלן
            </p>
            <p className="text-lg font-bold text-foreground leading-snug mb-4">
              מחיר המחירון נשאר — ההנחה מסתתרת במימון. מי שלא יודע לחשב, משווה
              מחירים שאי אפשר להשוות.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              לפי סקירת הכלכלן הראשי באוצר (ינואר 2026), דירה של 2&nbsp;מיליון&nbsp;₪
              במבצע 80/20 שווה בערך נוכחי כ-1.75–1.8 מיליון&nbsp;₪.
            </p>
          </article>
        </Arrive>
      </div>
    </div>
  );
};

export default MistakeCards;
