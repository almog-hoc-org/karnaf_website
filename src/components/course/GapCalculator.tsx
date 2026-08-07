import { useState } from "react";
import { Reveal } from "@/components/v2/Reveal";
import { Figure } from "@/components/ui/figure-number";

/**
 * S7's set-piece: instead of telling the visitor the tools turn decisions
 * into numbers, this one does it in their hands. Drag the asking price —
 * see a 3% negotiation gap in shekels, live. The 3% figure is the same
 * one the mistake ledger and the hero hook use — one number, one story.
 * SSG renders the default (₪2M → ₪60,000) so the static HTML already
 * carries the real figure.
 */

const MIN = 800_000;
const MAX = 5_000_000;
const STEP = 50_000;
const DEFAULT_PRICE = 2_000_000;
const GAP_RATE = 0.03;

const formatIls = (n: number) => n.toLocaleString("he-IL");

const GapCalculator = () => {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const gap = Math.round(price * GAP_RATE);

  return (
    <Reveal>
      <div
        className="max-w-2xl mx-auto rounded-3xl border p-6 md:p-10 text-center"
        style={{
          backgroundColor: "hsl(36 33% 95% / 0.05)",
          borderColor: "hsl(36 33% 95% / 0.14)",
        }}
      >
        <p className="text-eyebrow uppercase tracking-[0.24em] text-accent font-bold mb-6">
          נסו בעצמכם
        </p>

        <label
          htmlFor="gap-price"
          className="block font-bold text-white mb-1"
        >
          כמה עולה הדירה שאתם מסתכלים עליה?
        </label>
        <p
          className="text-2xl font-black tabular-nums text-white mb-5"
          aria-live="polite"
        >
          {formatIls(price)}&nbsp;₪
        </p>

        <input
          id="gap-price"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          aria-label="מחיר הדירה המבוקש"
          aria-valuetext={`${formatIls(price)} שקלים`}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer mb-2"
          style={{ backgroundColor: "hsl(36 33% 95% / 0.22)" }}
          dir="rtl"
        />
        <div
          className="flex justify-between text-xs tabular-nums mb-8"
          style={{ color: "hsl(36 33% 95% / 0.55)" }}
        >
          <span>{formatIls(MIN)}&nbsp;₪</span>
          <span>{formatIls(MAX)}&nbsp;₪</span>
        </div>

        <p className="mb-2" style={{ color: "hsl(36 33% 95% / 0.75)" }}>
          פער מו״מ של 3% במחיר הזה שווה
        </p>
        <p className="mb-6">
          <Figure value={formatIls(gap)} suffix="&nbsp;₪" size="lg" dark ledger />
        </p>
        <p
          className="text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: "hsl(36 33% 95% / 0.65)" }}
        >
          זה הכסף שנשאר אצלכם — או נעלם — בשיחה אחת מול המוכר. בתוכנית:
          מאסטר קלאס שלם למשא ומתן, ומחשבון שעושה את החשבון הזה על העסקה
          האמיתית שלכם.
        </p>
      </div>
    </Reveal>
  );
};

export default GapCalculator;
