import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface Question {
  id: string;
  label: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: "goal",
    label: "מה המטרה שלך?",
    options: ["רכישת דירה ראשונה", "השקעה בנדל״ן", "שדרוג דירה", "סתם מתעניין"],
  },
  {
    id: "experience",
    label: "מה רמת הניסיון שלך בנדל״ן?",
    options: ["אפס, מתחיל לגמרי", "קצת מכיר את השוק", "יש לי ניסיון"],
  },
  {
    id: "timeline",
    label: "מתי אתה מתכנן לפעול?",
    options: ["בחודשים הקרובים", "בשנה הקרובה", "עוד לא בטוח"],
  },
  {
    id: "concern",
    label: "מה הכי מטריד אותך?",
    options: ["פחד לשלם יותר מדי", "לא מבין במשכנתאות", "לא יודע מאיפה להתחיל", "משא ומתן"],
  },
];

const insights = [
  "עם הכלים והליווי שלנו, תוכל לזהות עסקאות מתחת למחיר השוק ולסגור בביטחון.",
  "התוכנית בנויה בדיוק בשביל השלב שלך — מהיסודות ועד חתימת חוזה.",
  "הנתונים מראים שבוגרי התוכנית חוסכים בממוצע עשרות אלפי שקלים בעסקה.",
  "המחשבונים והאנליסט האישי יהפכו את החיפוש שלך ממלחיץ לשיטתי ומדויק.",
  "אתה בדיוק בנקודה שבה ידע ממוקד יכול לחסוך לך שנים של טעויות.",
  "הקורס ייתן לך את הביטחון לנהל משא ומתן מול מוכרים ויזמים כמקצוען.",
  "עם ליווי צמוד של אנליסט, תקבל החלטות מבוססות נתונים — לא תחושות בטן.",
  "רוכשי דירה שנכנסים מוכנים חוסכים זמן, כסף ועצבים — התוכנית תכין אותך.",
  "הכלים המתקדמים שלנו יאפשרו לך לנתח כל עסקה בדקות ולדעת אם היא שווה.",
  "בין אם זו דירה ראשונה או השקעה — השיטה שלנו עובדת. 300+ בוגרים מוכיחים.",
];

function computeResult(answers: Record<string, number>) {
  const vals = Object.values(answers);
  const sum = vals.reduce((a, b) => a + b, 0);
  const product = vals.reduce((a, b) => a * (b + 1), 1);

  // Score: 94.1 - 99.4, deterministic per combination
  const scoreSeed = (sum * 17 + product * 7 + 31) % 53;
  const score = 94.1 + (scoreSeed / 53) * 5.3;

  // Insight: different hash so score and insight vary independently
  const insightSeed = (product * 13 + sum * 23 + 7) % insights.length;

  return {
    score: parseFloat(score.toFixed(1)),
    insight: insights[insightSeed],
  };
}

const FitQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; insight: string } | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const animRef = useRef<number>();

  const progress = result ? 100 : (step / questions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    const q = questions[step];
    const newAnswers = { ...answers, [q.id]: optionIndex };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setResult(computeResult(newAnswers)), 300);
    }
  };

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
      setDisplayScore(parseFloat((eased * target).toFixed(1)));
      if (t < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [result]);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setDisplayScore(0);
  };

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
            <p className="text-xs text-muted-foreground mb-2">
              שאלה {step + 1} מתוך {questions.length}
            </p>
            <h4 className="text-xl font-bold text-foreground mb-6">
              {questions[step].label}
            </h4>
            <div className="grid gap-3">
              {questions[step].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-right p-4 rounded-xl border transition-all duration-200
                    ${answers[questions[step].id] === i
                      ? "border-accent bg-accent/10 text-accent font-bold"
                      : "border-border bg-background hover:border-accent/40 hover:bg-accent/5 text-foreground"
                    }`}
                >
                  {option}
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
            <CheckCircle size={48} className="text-accent mx-auto" />
            <div>
              <p className="text-5xl font-black text-accent tabular-nums">{displayScore}%</p>
              <p className="text-foreground font-bold text-lg mt-2">התאמה לתוכנית</p>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              {result.insight}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-polygon bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2">
                  <MessageCircle size={18} />
                  בואו נדבר
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={reset}
                className="border-accent/30 text-accent hover:bg-accent/10"
              >
                נסו שוב
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FitQuiz;
