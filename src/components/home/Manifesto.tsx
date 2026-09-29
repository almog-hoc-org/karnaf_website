import { ScrollWords } from "@/components/v2/scroll";
import { Eyebrow } from "@/components/v2/Eyebrow";

/**
 * The page's thesis, read at the reader's own pace: the words light up
 * as the paragraph moves up the screen. Replaces the old three-card "why
 * us" grid — same argument (numbers, not gut feeling), said once, big.
 */
const Manifesto = () => (
  <section className="relative py-section-lg bg-background">
    <div className="container mx-auto px-5 md:px-6 max-w-5xl">
      <Eyebrow className="mb-8">הגישה שלנו</Eyebrow>
      <ScrollWords
        as="p"
        text="דירה היא ההחלטה הכלכלית הגדולה בחיים של רובנו — ורובנו מקבלים אותה לפי המחיר במודעה, מבצע של קבלן ועצה של שכן. אנחנו מלמדים לקנות לפי מספרים, לא לפי תחושות."
        highlight={["מספרים"]}
        className="text-[1.75rem] leading-[1.35] md:text-[2.75rem] md:leading-[1.25] lg:text-[3.25rem] font-black tracking-[-0.02em] text-foreground"
      />
    </div>
  </section>
);

export default Manifesto;
