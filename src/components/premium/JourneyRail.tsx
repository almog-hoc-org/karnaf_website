import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Compass, Handshake, PenLine, PhoneCall, ScanSearch, FileSignature } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useScrubbed } from "@/components/v2/scroll/useScrubbed";
import { useStillMotion } from "@/hooks/use-still-motion";

/**
 * The accompaniment journey as a centred rail that fills with scroll.
 * Each stage card lights up when the fill reaches it. The first two stages
 * are everything the visitor has to do; a short line then separates them
 * from what follows if the accompaniment is a fit.
 *
 * Element-bound scroll progress → mapped through useScrubbed
 * (docs/SCROLL-MOTION.md). Reduced motion: rail full, every card lit.
 */

interface Stage {
  title: string;
  body: string;
  icon: LucideIcon;
}

const NOW: Stage[] = [
  { title: "משאירים פרטים", body: "שם וטלפון. זה כל מה שצריך כדי להתחיל.", icon: PenLine },
  {
    title: "שיחת היכרות אישית",
    body: "מלווה משקיעים חוזר אליכם, מכיר אתכם ואת המטרות שלכם ואומר בכנות אם הליווי מתאים. ללא עלות וללא התחייבות.",
    icon: PhoneCall,
  },
];

const THEN: Stage[] = [
  { title: "אסטרטגיה שמתאימה לכם", body: "מגדירים יחד מה מחפשים, איפה ובאיזה תקציב, לפני שמתחילים לחפש.", icon: Compass },
  {
    title: "בדיקה מעמיקה של כל עסקה",
    body: "מחיר מול עסקאות אמת, מצב תכנוני ומשפטי ותנאי החוזה, כדי שתחליטו בעיניים פקוחות.",
    icon: ScanSearch,
  },
  { title: "משא ומתן לצדכם", body: "יושבים לצדכם מול המוכר, היזם והבנק, עם הנתונים ביד.", icon: Handshake },
  { title: "עד החתימה", body: "נשארים איתכם עד שהחוזה חתום ואתם בטוחים בצעד שעשיתם.", icon: FileSignature },
];

const ALL = [...NOW, ...THEN];

const StageCard = ({ stage, on }: { stage: Stage; on: boolean }) => {
  const Icon = stage.icon;
  return (
    <li className="relative z-10 mx-auto w-full max-w-[24rem]">
      <div
        className={`rounded-2xl border bg-white/85 px-5 py-5 backdrop-blur-[3px] text-center transition-[border-color,box-shadow] duration-500 ${
          on
            ? "border-[hsl(152_38%_70%)] shadow-[0_10px_30px_-16px_hsl(152_40%_25%/0.35)]"
            : "border-[hsl(36_16%_88%)] shadow-none"
        }`}
      >
        <span
          className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 ${
            on ? "bg-[hsl(152_42%_28%)] text-white" : "bg-[hsl(40_25%_94%)] text-[hsl(215_14%_50%)]"
          }`}
          aria-hidden
        >
          <Icon size={20} strokeWidth={1.9} />
        </span>
        <h3 className="text-[1.08rem] font-semibold text-[hsl(217_42%_18%)]">{stage.title}</h3>
        <p className="mt-1.5 leading-[1.75] text-[hsl(215_14%_42%)]">{stage.body}</p>
      </div>
    </li>
  );
};

const JourneyRail = () => {
  const ref = useRef<HTMLOListElement>(null);
  const still = useStillMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const fill = useScrubbed(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(ALL.length, Math.floor(v * ALL.length + 0.35)));
  });

  const on = (i: number) => still || i < Math.max(reached, 1);

  return (
    <ol ref={ref} className="relative mt-10 space-y-6" aria-label="שלבי הליווי">
      {/* the rail, behind the cards */}
      <span aria-hidden className="absolute bottom-4 left-[calc(50%-1.5px)] top-4 w-[3px] rounded-full bg-[hsl(36_16%_86%)]" />
      <motion.span
        aria-hidden
        className="absolute bottom-4 left-[calc(50%-1.5px)] top-4 w-[3px] origin-top rounded-full bg-[hsl(152_42%_32%)]"
        style={{ scaleY: still ? 1 : fill }}
      />

      {NOW.map((s, i) => (
        <StageCard key={s.title} stage={s} on={on(i)} />
      ))}

      <li className="relative z-10 mx-auto w-fit rounded-full bg-[hsl(40_38%_97%)] px-5 py-2 text-[0.95rem] font-medium text-[hsl(152_42%_26%)]">
        ואם הליווי מתאים לכם:
      </li>

      {THEN.map((s, i) => (
        <StageCard key={s.title} stage={s} on={on(i + NOW.length)} />
      ))}
    </ol>
  );
};

export default JourneyRail;
