import { useEffect, useState } from "react";
import {
  getQuizContext,
  QUIZ_CONTEXT_EVENT,
  type QuizContext,
} from "@/lib/quizContext";

/**
 * Live read of the visitor's fit-quiz answers. Returns null during SSG
 * and until the quiz is completed, so personalized sections always have
 * a generic fallback and the pre-rendered HTML stays stable.
 */
export function useQuizContext(): QuizContext | null {
  const [ctx, setCtx] = useState<QuizContext | null>(null);

  useEffect(() => {
    setCtx(getQuizContext());
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<QuizContext>).detail;
      setCtx(detail ?? getQuizContext());
    };
    window.addEventListener(QUIZ_CONTEXT_EVENT, onUpdate);
    return () => window.removeEventListener(QUIZ_CONTEXT_EVENT, onUpdate);
  }, []);

  return ctx;
}
