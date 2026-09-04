import type { QuizConcern, QuizContext } from "@/lib/quizContext";

/**
 * Quiz-driven personalization copy. The visitor named a fear; the price
 * section and the final close answer that specific fear instead of the
 * generic pitch. Every variant is true of the product — personalization
 * changes emphasis, never facts.
 */

export interface ConcernCopy {
  /** Line above the price card, addressing the named fear. */
  pricingLine: string;
  /** Which testimonial to surface at the decision point. */
  testimonial: { quote: string; author: string };
  /** Closing line in the final CTA section. */
  closingLine: string;
}

const NOAM = {
  quote: "״רכשתי דירה מתחת למחיר השוק בזכות הכלים שקיבלתי.״",
  author: "— נועם ד., בוגר התוכנית",
};

const ROTEM = {
  quote: "״הסרטונים קצרים וממוקדים, והמחשבונים חסכו לי שעות של חישובים.״",
  author: "— רותם ש., בוגרת התוכנית",
};

export const CONCERN_COPY: Record<QuizConcern, ConcernCopy> = {
  overpay: {
    pricingLine:
      "אמרתם שהפחד הגדול הוא לשלם יותר מדי — בפרק הרלוונטי לומדים בדיוק איך להשוות לעסקאות שנסגרו באותו רחוב, ולמנוע את זה.",
    testimonial: NOAM,
    closingLine:
      "אתם לא רוצים לגלות אחרי החתימה ששילמתם 60,000 ₪ מעל השוק. אפשר פשוט לבדוק לפני.",
  },
  mortgage: {
    pricingLine:
      "אמרתם שמשכנתאות זה מה שהכי לא ברור — פרק המימון בנוי בדיוק בשביל להגיע לבנק כלקוח שיודע מה הוא מבקש.",
    testimonial: ROTEM,
    closingLine:
      "תמהיל שנבחר נכון שווה עשרות אלפי שקלים לאורך ההלוואה. זה נלמד בערב אחד.",
  },
  "where-to-start": {
    pricingLine:
      "אמרתם שאתם לא יודעים מאיפה להתחיל — התוכנית בנויה כרצף אחד, בסדר שבו הדברים קורים במציאות.",
    testimonial: ROTEM,
    closingLine:
      "אתם לא צריכים לדעת הכל היום. אתם צריכים את הסדר הנכון — והוא מתחיל בשיעור הראשון.",
  },
  negotiation: {
    pricingLine:
      "אמרתם שמשא ומתן זה מה שמלחיץ — פרק המשא ומתן מלמד להיכנס לשיחה עם נתונים במקום עם תחושת בטן.",
    testimonial: NOAM,
    closingLine:
      "מי שיושב מול המוכר עם מספרים לא צריך להיות קשוח. הוא פשוט צודק.",
  },
};

/** Honest, personal urgency — based on the buyer's own stated timeline. */
export function timelineUrgency(ctx: QuizContext | null): string | null {
  if (!ctx) return null;
  if (ctx.timeline === "months")
    return "לפי מה שסימנתם, אתם קונים בחודשים הקרובים — את ההכנה עושים לפני הביקור הראשון בנכס, לא אחרי החתימה.";
  if (ctx.timeline === "year")
    return "יש לכם שנה — בדיוק הזמן ללמוד בלי לחץ ולהגיע לחיפוש כשאתם כבר יודעים מה אתם מחפשים.";
  return null;
}
