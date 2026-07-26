import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, Clock } from "lucide-react";
import { botLink } from "@/lib/whatsapp";
import { buildCheckoutUrl } from "@/lib/checkout";
import {
  gaQuizStart,
  gaQuizComplete,
  gaQuizAbandon,
  gaBeginCheckout,
} from "@/lib/analytics";
import { trackInitiateCheckout } from "@/lib/pixel";
import {
  saveQuizContext,
  type QuizConcern,
  type QuizContext,
  type QuizExperience,
  type QuizGoal,
  type QuizTimeline,
} from "@/lib/quizContext";

/**
 * Fit quiz — an honest self-selection tool, not a compliment machine.
 * The score comes from a real rubric (intent + timing carry it), and a
 * genuinely low fit gets told so plainly: on a page whose thesis is
 * "מספרים, לא תחושות", a rigged score would be the fastest way to lose
 * the reader. Answers are stored so the rest of the page can speak to
 * the concern the visitor actually named.
 */

interface Option<T extends string> {
  label: string;
  value: T;
  points: number;
}

interface Question {
  id: keyof Pick<QuizContext, "goal" | "experience" | "timeline" | "concern">;
  label: string;
  options: Option<string>[];
}

/* Rubric — intent (40) + timing (35) + experience gap (17) + a named
   concern (8) = 100. Someone just browsing with no timeline lands in the
   40s and is told, honestly, that it's too early. */
const questions: Question[] = [
  {
    id: "goal",
    label: "מה המטרה שלך?",
    options: [
      { label: "רכישת דירה ראשונה", value: "first-home", points: 40 },
      { label: "השקעה בנדל״ן", value: "investment", points: 36 },
      { label: "שדרוג דירה", value: "upgrade", points: 34 },
      { label: "סתם מתעניין", value: "browsing", points: 8 },
    ],
  },
  {
    id: "timeline",
    label: "מתי אתם מתכננים לפעול?",
    options: [
      { label: "בחודשים הקרובים", value: "months", points: 35 },
      { label: "בשנה הקרובה", value: "year", points: 27 },
      { label: "עוד לא בטוח", value: "unsure", points: 8 },
    ],
  },
  {
    id: "experience",
    label: "מה רמת הניסיון שלכם בנדל״ן?",
    options: [
      { label: "אפס, מתחילים לגמרי", value: "none", points: 17 },
      { label: "קצת מכירים את השוק", value: "some", points: 15 },
      { label: "יש לנו ניסיון", value: "experienced", points: 11 },
    ],
  },
  {
    id: "concern",
    label: "מה הכי מטריד אתכם?",
    options: [
      { label: "פחד לשלם יותר מדי", value: "overpay", points: 8 },
      { label: "לא מבינים במשכנתאות", value: "mortgage", points: 8 },
      { label: "לא יודעים מאיפה להתחיל", value: "where-to-start", points: 8 },
      { label: "משא ומתן", value: "negotiation", points: 8 },
    ],
  },
];

/** What the program does about the specific fear they named. */
const concernInsight: Record<QuizConcern, string> = {
  overpay:
    "הפחד לשלם יותר מדי הוא בדיוק מה שהמחשבונים פותרים: משווים את הנכס לעסקאות שנסגרו באותו רחוב — ויודעים אם המחיר מוצדק לפני שמציעים.",
  mortgage:
    "משכנתא היא לא כישרון מולד. במודול המימון תבינו מסלולים, תמהיל וריביות — ותגיעו לבנק עם השאלות שהופכות אתכם ללקוח שקשה למכור לו.",
  "where-to-start":
    "התוכנית בנויה בדיוק בשביל זה: 67 שיעורים בסדר שבו תפגשו אותם במציאות — מהתקציב, דרך החיפוש והבדיקות, ועד החתימה.",
  negotiation:
    "מו״מ טוב הוא לא כריזמה — הוא נתונים. במודול המשא ומתן תלמדו מתי ללחוץ, מתי לשתוק, ואיך להיכנס לשיחה עם המספרים שמחזיקים את העמדה שלכם.",
};

/** Timing nudge — true statements only, no invented deadlines. */
const timelineNote: Record<QuizTimeline, string> = {
  months:
    "אתם מתכננים לקנות בחודשים הקרובים — את ההכנה עושים לפני הביקור הראשון בנכס, לא אחרי החתימה.",
  year: "שנה היא בדיוק הזמן הנכון ללמוד בלי לחץ — ולהגיע לחיפוש כשאתם כבר יודעים מה אתם מחפשים.",
  unsure: "",
};

interface QuizResult extends QuizContext {
  insight: string;
  note: string;
}

function computeResult(answers: Record<string, Option<string>>): QuizResult {
  const score = questions.reduce(
    (sum, q) => sum + (answers[q.id]?.points ?? 0),
    0
  );
  const goal = answers.goal.value as QuizGoal;
  const timeline = answers.timeline.value as QuizTimeline;
  const experience = answers.experience.value as QuizExperience;
  const concern = answers.concern.value as QuizConcern;
  const fit: QuizContext["fit"] = score >= 75 ? "high" : score >= 55 ? "medium" : "low";

  return {
    goal,
    timeline,
    experience,
    concern,
    score,
    fit,
    insight: concernInsight[concern],
    note: timelineNote[timeline],
  };
}

const FitQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option<string>>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const animRef = useRef<number>();
  // Refs so the unmount cleanup reads live values without re-subscribing.
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const stepRef = useRef(0);

  const progress = result ? 100 : (step / questions.length) * 100;

  const handleSelect = (option: Option<string>) => {
    const q = questions[step];
    const newAnswers = { ...answers, [q.id]: option };
    if (!startedRef.current) {
      startedRef.current = true;
      gaQuizStart();
    }
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      const next = step + 1;
      stepRef.current = next;
      setTimeout(() => setStep(next), 300);
    } else {
      setTimeout(() => {
        const computed = computeResult(newAnswers);
        completedRef.current = true;
        gaQuizComplete(computed.score, computed.fit);
        saveQuizContext({
          goal: computed.goal,
          timeline: computed.timeline,
          experience: computed.experience,
          concern: computed.concern,
          score: computed.score,
          fit: computed.fit,
        });
        setResult(computed);
      }, 300);
    }
  };

  // Report drop-off: started answering but never reached the result.
  useEffect(() => {
    return () => {
      if (startedRef.current && !completedRef.current) {
        gaQuizAbandon(stepRef.current + 1);
      }
    };
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!result) return;
    const target = result.score;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setDisplayScore(Math.round(eased * target));
      if (t < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [result]);

  const isLowFit = result?.fit === "low";

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-10 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="h-1.5 bg-border rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm text-muted-foreground mb-2">
              שאלה {step + 1} מתוך {questions.length}
            </p>
            <h3 className="text-xl font-bold text-foreground mb-6">
              {questions[step].label}
            </h3>
            <div className="grid gap-3">
              {questions[step].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-right p-4 rounded-xl border transition-all duration-200 min-h-[48px]
                    ${answers[questions[step].id]?.value === option.value
                      ? "border-accent bg-accent/10 text-accent font-bold"
                      : "border-border bg-background hover:border-accent/40 hover:bg-accent/5 text-foreground"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6"
          >
            {isLowFit ? (
              <Clock size={44} className="text-muted-foreground mx-auto" />
            ) : (
              <CheckCircle size={48} className="text-accent mx-auto" />
            )}

            <div>
              <p
                className={`text-5xl font-black tabular-nums ${
                  isLowFit ? "text-muted-foreground" : "text-accent"
                }`}
              >
                {displayScore}%
              </p>
              <p className="text-foreground font-bold text-lg mt-2">
                {isLowFit ? "כנראה שעוד מוקדם" : "התאמה לתוכנית"}
              </p>
            </div>

            {isLowFit ? (
              <>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  לפי מה שעניתם, אתם עדיין לא בתוך תהליך רכישה — והתוכנית באמת
                  תיתן לכם הרבה יותר כשתהיו. עד אז תעקבו אחרינו: יש לנו מספיק
                  תוכן חינמי כדי להתחיל להתמצא.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 font-bold text-primary underline-offset-4 hover:underline"
                  >
                    למאמרים והמדריכים שלנו ←
                  </a>
                  <a
                    href={botLink("התוכנית הדיגיטלית — בדיקת התאמה")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline py-2"
                  >
                    <MessageCircle size={14} />
                    בכל זאת יש לכם שאלה? וואטסאפ
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {result.insight}
                </p>
                {result.note && (
                  <p className="text-sm font-bold text-foreground max-w-md mx-auto">
                    {result.note}
                  </p>
                )}
                <div className="flex flex-col items-center justify-center gap-3">
                  <a
                    href={buildCheckoutUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      trackInitiateCheckout("quiz");
                      gaBeginCheckout("quiz");
                    }}
                  >
                    <Button className="group w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 rounded-full px-8 py-6 text-base active:scale-[0.98] transition-transform">
                      מתחילים עכשיו — גישה מיידית
                      <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                    </Button>
                  </a>
                  <a
                    href={botLink("התוכנית הדיגיטלית — בדיקת התאמה")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline py-2"
                  >
                    <MessageCircle size={14} />
                    יש שאלה קודם? וואטסאפ
                  </a>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FitQuiz;
