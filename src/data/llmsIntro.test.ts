import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  COURSE_ACCESS_MONTHS,
  COURSE_INSTALLMENTS,
  COURSE_INSTALLMENT_PRICE,
  COURSE_PRICE,
  EMAIL,
  PHONE_NUMBER,
} from "@/lib/constants";
import {
  ACTIVE_SINCE,
  COURSE_STUDENTS,
  TOTAL_CLIENTS_STAT,
  YEARS_EXPERIENCE_STAT,
} from "@/data/companyStats";

/* scripts/llms-intro.md is hand-written (it opens llms.txt for AI
   crawlers), so its facts are checked against the site's single sources
   of truth — a price or stat change fails here until the intro follows. */
const intro = readFileSync(resolve(process.cwd(), "scripts/llms-intro.md"), "utf8");

describe("llms.txt intro", () => {
  it("quotes the current course offer", () => {
    expect(intro).toContain(`${COURSE_PRICE} ₪`);
    expect(intro).toContain(`${COURSE_INSTALLMENTS} תשלומים של ${COURSE_INSTALLMENT_PRICE} ₪`);
    expect(intro).toContain(`${COURSE_ACCESS_MONTHS} חודשים`);
  });

  it("quotes the company stats from companyStats.ts", () => {
    expect(intro).toContain(TOTAL_CLIENTS_STAT);
    expect(intro).toContain(String(COURSE_STUDENTS));
    expect(intro).toContain(YEARS_EXPERIENCE_STAT);
    expect(intro).toContain(String(ACTIVE_SINCE));
  });

  it("has the current contact details", () => {
    expect(intro).toContain(PHONE_NUMBER);
    expect(intro).toContain(EMAIL);
  });
});
