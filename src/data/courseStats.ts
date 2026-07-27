import { courseParts } from "@/data/curriculum";

/**
 * Single source of truth for the course's advertised numbers — parts
 * and chapters are derived from the real syllabus (curriculum.ts) so
 * the site can never quote a structure the syllabus doesn't contain.
 * Individual lessons are deliberately NOT counted anywhere in site
 * copy — richness is conveyed by parts/chapters + short-lesson length.
 */
export const TOTAL_PARTS = courseParts.length;
export const TOTAL_CHAPTERS = courseParts.reduce(
  (sum, part) => sum + part.modules.length,
  0
);

/** Ready-made labels for copy. */
export const CHAPTERS_LABEL = `${TOTAL_CHAPTERS} פרקים`;
export const PARTS_LABEL = `${TOTAL_PARTS} חלקים`;

/** Lesson length range, minutes — used in copy ("שיעורים של 3 עד 10 דקות"). */
export const LESSON_MINUTES = "3-10";
