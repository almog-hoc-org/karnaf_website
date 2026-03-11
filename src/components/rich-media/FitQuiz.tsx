import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CheckCircle } from "lucide-react";

const questions = [
  { id: "bought", label: "האם קנית דירה בעבר?" },
  { id: "searching", label: "כמה זמן אתה מחפש דירה?" },
  { id: "negotiation", label: "האם אתה יודע לנהל משא ומתן?" },
  { id: "identify", label: "האם אתה יודע לזהות עסקה טובה?" },
  { id: "intend", label: "כמה בקרוב אתה מתכוון לקנות דירה?" },
  { id: "knowledge", label: "מה רמת הידע שלך בנדל״ן?" },
];

const insights = [
  "התוכנית תיתן לך בדיוק את הכלים שחסרים לך כדי לגשת לשוק בביטחון מלא.",
  "עם הידע והכלים שתקבל, תוכל לחסוך עשרות אלפי שקלים בעסקה הראשונה שלך.",
  "המחשבונים והאנליסט שלנו יעזרו לך לקבל החלטות מבוססות נתונים ולא תחושות.",
  "הליווי הצמוד בוואטסאפ יבטיח שלא תהיה לבד באף שלב של התהליך.",
  "עם 50+ שיעורים ו-6+ כלים מתקדמים, תהיה מוכן לכל תרחיש בשוק.",
];

const FitQuiz = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; insight: string } | null>(null);

  const handleChange = (id: string, value: number[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value[0] }));
  };

  const handleCalculate = () => {
    // Always return 90-99% with one decimal
    const seed = Object.values(answers).reduce((a, b) => a + b, 0);
    const base = 90 + ((seed * 7 + 13) % 90) / 10;
    const score = Math.min(99.9, Math.max(90.1, parseFloat(base.toFixed(1))));
    const insight = insights[seed % insights.length];
    setResult({ score, insight });
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-10 max-w-2xl mx-auto">
      {!result ? (
        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="text-foreground font-medium text-sm mb-3 block">{q.label}</label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-4">1</span>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[answers[q.id] || 5]}
                  onValueChange={(v) => handleChange(q.id, v)}
                  className="flex-1"
                  aria-label={q.label}
                />
                <span className="text-xs text-muted-foreground w-4">10</span>
                <span className="text-primary font-bold text-sm w-6 text-center">{answers[q.id] || 5}</span>
              </div>
            </div>
          ))}

          <Button
            onClick={handleCalculate}
            disabled={!allAnswered}
            className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg"
          >
            חשב התאמה
          </Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <CheckCircle size={48} className="text-primary mx-auto" />
          <div>
            <p className="text-5xl font-black text-primary text-glow">{result.score}%</p>
            <p className="text-foreground font-bold text-lg mt-2">התאמה לתוכנית</p>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            {result.insight}
          </p>
          <Button
            variant="outline"
            onClick={() => { setResult(null); setAnswers({}); }}
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            נסו שוב
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FitQuiz;
