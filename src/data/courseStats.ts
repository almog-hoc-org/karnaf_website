import { curriculum } from "@/data/curriculum";

/**
 * Single source of truth for the course's advertised numbers — derived
 * from the real syllabus so the site can never quote a lesson count the
 * curriculum doesn't actually contain.
 */
export const TOTAL_MODULES = curriculum.length;
export const TOTAL_LESSONS = curriculum.reduce(
  (sum, mod) => sum + mod.lessons.length,
  0
);

/** Ready-made label, e.g. "62 שיעורים". */
export const LESSONS_LABEL = `${TOTAL_LESSONS} שיעורים`;
export const MODULES_LABEL = `${TOTAL_MODULES} מודולים`;
