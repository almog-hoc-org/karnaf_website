import { useRef } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { CircleCheck, FolderOpen, PenLine, TriangleAlert } from "lucide-react";
import { Kicker } from "@/components/service/Kicker";
import { Reveal } from "@/components/v2/Reveal";
import { SplitReveal, useScrubbed } from "@/components/v2/scroll";
import { useStillMotion } from "@/hooks/use-still-motion";

/* ── The example file ────────────────────────────────────────────────
   An illustrative presale deal, labeled as such on the card and under the
   section — never a client's deal and never a promised result. It shows
   the questions an analyst asks, not numbers we can't stand behind. */
const LIST_PRICE = 2_000_000;
const ils = (n: number) => `₪${n.toLocaleString("en-US")}`;

type Verdict = "flag" | "fix" | "ok";

const findings: { q: string; a: string; verdict: Verdict; tag: string }[] = [
  {
    q: "המחיר מול עסקאות אמת",
    a: "דירות דומות באזור נסגרו מתחת למחירון. יש מרווח למשא ומתן — והוא מתחיל במספרים, לא בתחושה.",
    verdict: "flag",
    tag: "מרווח למו״מ",
  },
  {
    q: "מבצע 20/80",
    a: "ההטבה לא חינם: היא מגולמת במחיר. שואלים כמה הדירה שווה בלי המבצע — ומתמקחים על המספר הזה.",
    verdict: "flag",
    tag: "המחיר האמיתי",
  },
  {
    q: "הצמדה למדד על יתרת התשלום",
    a: "בודקים אם ה-80% צמודים עד המסירה, מה זה עלול לעלות, ומה אפשר לנטרל בחוזה.",
    verdict: "fix",
    tag: "לתיקון בחוזה",
  },
  {
    q: "מועד מסירה ופיצוי על איחור",
    a: "על הנייר — 36 חודשים. קוראים את סעיף האיחורים לפני שמתאהבים, לא אחרי שהמפתח מתעכב.",
    verdict: "fix",
    tag: "לתיקון בחוזה",
  },
  {
    q: "המימון ביום המסירה",
    a: "80% משולמים בעוד שלוש שנים. מתכננים מעכשיו איך תיראה המשכנתא — ומה קורה אם הריבית תזוז.",
    verdict: "ok",
    tag: "תוכנית מימון",
  },
];

/* Chip text stays navy (AA at 12px); only the icon carries the verdict color. */
const verdictStyle: Record<Verdict, { icon: typeof CircleCheck; chip: string; icon_: string }> = {
  flag: { icon: TriangleAlert, chip: "bg-accent/10 border-accent/30", icon_: "text-[hsl(var(--accent-deep))]" },
  fix: { icon: PenLine, chip: "bg-primary/[0.05] border-primary/15", icon_: "text-primary" },
  ok: { icon: CircleCheck, chip: "bg-card border-border", icon_: "text-[hsl(var(--whatsapp-deep))]" },
};

/** One finding — lights up as the reader's scroll reaches it. */
const Finding = ({
  f,
  progress,
  range,
  still,
}: {
  f: (typeof findings)[number];
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) => {
  const opacity = useScrubbed(progress, range, [0.28, 1]);
  const x = useScrubbed(progress, range, [-10, 0]);
  const v = verdictStyle[f.verdict];
  return (
    <motion.li
      className="py-4 first:pt-0 last:pb-0"
      style={still ? { opacity: 1, x: 0 } : { opacity, x }}
    >
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <p className="font-bold text-foreground leading-snug">{f.q}</p>
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-primary border rounded-full px-2.5 py-1 ${v.chip}`}
        >
          <v.icon size={13} aria-hidden className={v.icon_} />
          {f.tag}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-[1.75]">{f.a}</p>
    </motion.li>
  );
};

/**
 * "Show, don't tell" for the 1:1 track: one illustrative presale deal read
 * the way the analyst reads it. The findings light up in order as the card
 * travels up the viewport, so the reader goes through the file at the
 * analyst's pace; the verdict lands last.
 */
const DealRead = () => {
  const still = useStillMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.8", "end 0.75"],
  });
  const n = findings.length;
  const slot = 0.8 / n;
  const verdictOpacity = useScrubbed(scrollYProgress, [0.82, 0.95], [0.28, 1]);

  return (
    <section className="py-section-lg bg-secondary/50 border-y border-border/60">
      <div className="container mx-auto px-5 md:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Kicker className="mb-5">ככה נראה ניתוח עסקה</Kicker>
            </Reveal>
            <SplitReveal
              text="לא ״נראה לי שווה״. חמש שאלות, לפני שחותמים."
              highlight={["חמש", "שאלות,"]}
              className="text-display-md md:text-display-lg text-foreground mb-6 leading-[1.02]"
            />
            <Reveal delay={0.08}>
              <p className="text-body-lg text-muted-foreground leading-[1.85] max-w-[52ch] mb-5">
                כל עסקה נבדקת לעומק — יד שנייה, דירה מקבלן או התחדשות עירונית. כדוגמה:
                דירה על הנייר עם מבצע מימון, עסקה נפוצה בשוק של 2026. כך האנליסט עובר
                עליה איתכם: מה בודקים, מה מסמנים, ומה מתקנים בחוזה לפני שמתחייבים.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[52ch]">
                <span className="font-bold text-foreground">דוגמה להמחשה</span> — לא עסקה של לקוח. המספרים והממצאים משתנים מעסקה לעסקה,
                ובליווי הם נבנים על הנתונים של הנכס שלכם.
              </p>
            </Reveal>
          </div>

          <div ref={cardRef}>
            <Reveal delay={0.06}>
              <article
                aria-label="דוגמה להמחשה: ניתוח עסקת 20/80"
                className="bg-card rounded-3xl border border-border shadow-depth-3 p-6 md:p-9"
              >
                <header className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-border">
                  <div>
                    <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 mb-2">
                      <FolderOpen size={14} aria-hidden />
                      תיק עסקה
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                      דירת 4 חדרים על הנייר
                    </h3>
                  </div>
                  <span className="shrink-0 text-xs font-semibold border border-dashed border-primary/30 text-muted-foreground rounded-full px-3 py-1">
                    דוגמה להמחשה
                  </span>
                </header>

                <dl className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { k: "מחיר מחירון", v: <span dir="ltr" className="tabular-nums">{ils(LIST_PRICE)}</span> },
                    { k: "מבנה תשלום", v: <span dir="ltr" className="tabular-nums">20/80</span> },
                    { k: "מסירה", v: "36 חודשים" },
                  ].map((m) => (
                    <div key={m.k} className="rounded-xl bg-secondary/60 px-3 py-2.5">
                      <dt className="text-[0.7rem] text-muted-foreground mb-0.5">{m.k}</dt>
                      <dd className="font-bold text-foreground text-sm md:text-base">{m.v}</dd>
                    </div>
                  ))}
                </dl>

                <ol className="divide-y divide-border">
                  {findings.map((f, i) => (
                    <Finding
                      key={f.q}
                      f={f}
                      progress={scrollYProgress}
                      range={[i * slot, i * slot + slot * 0.9]}
                      still={still}
                    />
                  ))}
                </ol>

                <motion.div
                  className="mt-6 rounded-2xl bg-[hsl(var(--ink))] text-white p-5 md:p-6"
                  style={{ opacity: still ? 1 : verdictOpacity }}
                >
                  <p className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-2">השורה התחתונה</p>
                  <p className="font-bold text-lg leading-snug">
                    להגיש הצעה — על המחיר בלי המבצע, עם סעיף איחורים מתוקן.
                  </p>
                  <p className="text-sm mt-2" style={{ color: "hsl(36 33% 95% / 0.7)" }}>
                    ואם המספרים לא מסתדרים, ההמלצה היא לוותר. גם זו תשובה.
                  </p>
                </motion.div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealRead;
