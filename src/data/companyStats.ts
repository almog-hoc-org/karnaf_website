/**
 * Company-wide proof numbers — single source of truth, ONE label per number.
 *
 * The same figure used to wear five different labels across the site
 * ("עסקאות מלוות" on one page, "לקוחות מרוצים" on the next), which reads as
 * one round number stretched to fit. Every stat block imports from here so
 * a visitor moving between pages sees the same claim everywhere.
 *
 * Labels are deliberately the conservative reading: 375+ counts clients and
 * students across all tracks (328 course students + accompanied clients),
 * which is true whether or not each accompanied client maps to one deal.
 * If the owner confirms 375+ is the number of accompanied *deals*, change
 * TOTAL_CLIENTS_LABEL here and nowhere else.
 */

/** Clients and students across every track (course + 1:1 accompaniment). */
export const TOTAL_CLIENTS = 375;
export const TOTAL_CLIENTS_STAT = `${TOTAL_CLIENTS}+`;
export const TOTAL_CLIENTS_LABEL = "לקוחות ותלמידים";

/** Students who bought one of the digital courses. */
export const COURSE_STUDENTS = 328;
export const COURSE_STUDENTS_STAT = `${COURSE_STUDENTS}`;
export const COURSE_STUDENTS_LABEL = "תלמידים בקורסים הדיגיטליים";

/** Years in the Israeli real-estate market (first own deal in ACTIVE_SINCE). */
export const ACTIVE_SINCE = 2017;
export const YEARS_EXPERIENCE = 8;
export const YEARS_EXPERIENCE_STAT = `${YEARS_EXPERIENCE}+`;
export const YEARS_EXPERIENCE_LABEL = "שנות ניסיון בשוק";
