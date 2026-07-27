/**
 * Single source of truth for the course's advertised numbers.
 *
 * TEMPORARY OVERRIDE (2026-07): the program was restructured into
 * 3 parts / 15 modules / 200+ short lessons (3-10 min each), but the
 * detailed syllabus hasn't been delivered yet — curriculum.ts still
 * holds the old 9-module outline. Until the new syllabus lands, the
 * advertised numbers are declared here explicitly. TODO: once
 * curriculum.ts is rebuilt (parts → modules → lesson counts), restore
 * the derivation so the site can never quote numbers the curriculum
 * doesn't actually contain.
 */
export const TOTAL_PARTS = 3;
export const TOTAL_MODULES = 15;

/** Ready-made labels for copy. */
export const LESSONS_LABEL = "מעל 200 שיעורים";
export const MODULES_LABEL = `${TOTAL_MODULES} מודולים`;
export const PARTS_LABEL = `${TOTAL_PARTS} חלקים`;

/** Lesson length range, minutes — used in copy ("שיעורים של 3 עד 10 דקות"). */
export const LESSON_MINUTES = "3-10";
