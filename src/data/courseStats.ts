import { courseParts } from "@/data/curriculum";

/**
 * Single source of truth for the course's advertised numbers — parts
 * and modules are derived from the real syllabus (curriculum.ts) so
 * the site can never quote a structure the syllabus doesn't contain.
 * The lesson count is a declared label: the 200+ lessons are not
 * enumerated on the site, only their total is advertised.
 */
export const TOTAL_PARTS = courseParts.length;
export const TOTAL_MODULES = courseParts.reduce(
  (sum, part) => sum + part.modules.length,
  0
);

/** Ready-made labels for copy. */
export const LESSONS_LABEL = "מעל 200 שיעורים";
export const MODULES_LABEL = `${TOTAL_MODULES} מודולים`;
export const PARTS_LABEL = `${TOTAL_PARTS} חלקים`;

/** Lesson length range, minutes — used in copy ("שיעורים של 3 עד 10 דקות"). */
export const LESSON_MINUTES = "3-10";
