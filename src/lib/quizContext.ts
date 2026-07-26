/**
 * Fit-quiz context — the visitor's own answers, kept for the rest of the
 * session so the price section, the final close and the sticky bar can
 * speak to the concern they actually named. Same storage pattern as
 * src/lib/leadContext.ts.
 */

const STORAGE_KEY = "karnaf_quiz_context";

export type QuizGoal = "first-home" | "investment" | "upgrade" | "browsing";
export type QuizTimeline = "months" | "year" | "unsure";
export type QuizExperience = "none" | "some" | "experienced";
export type QuizConcern = "overpay" | "mortgage" | "where-to-start" | "negotiation";

export interface QuizContext {
  goal: QuizGoal;
  timeline: QuizTimeline;
  experience: QuizExperience;
  concern: QuizConcern;
  score: number;
  fit: "high" | "medium" | "low";
}

/** Notify same-page listeners (personalized sections) without a reload. */
export const QUIZ_CONTEXT_EVENT = "karnaf:quiz-context";

export function saveQuizContext(ctx: QuizContext): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
    window.dispatchEvent(new CustomEvent(QUIZ_CONTEXT_EVENT, { detail: ctx }));
  } catch {
    // Storage unavailable — personalization simply stays generic.
  }
}

export function getQuizContext(): QuizContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuizContext) : null;
  } catch {
    return null;
  }
}
