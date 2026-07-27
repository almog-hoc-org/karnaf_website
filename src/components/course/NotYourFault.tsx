import { Reveal } from "@/components/v2/Reveal";

/**
 * S3.5 — the relief beat between the pain (S3) and the founders' story
 * (S4): the reader just saw what mistakes cost, and the natural reflex
 * is shame ("everyone else gets this"). This section removes it — nobody
 * ever taught this — and reframes buying right as a learnable skill,
 * which is the door the rest of the page walks through. Empowerment
 * tone, not fear: the brand serves buyers, it doesn't pressure them.
 */
const NotYourFault = () => {
  return (
    <div className="text-center">
      <Reveal>
        <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-6 leading-[0.98] tracking-tight">
          והנה האמת שאף אחד לא אומר:
          <br />
          <span className="text-accent">זו לא אשמתכם.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-body-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
          בבית הספר לימדו אתכם טריגונומטריה. באוניברסיטה — את המקצוע שלכם.
          ואז מגיע היום שבו אתם חותמים על ההתחייבות הכספית הגדולה של חייכם —
          ומסתבר שאת השיעור הזה פשוט אף אחד לא העביר. כולם מניחים שתלמדו
          ״תוך כדי תנועה״, אבל בעסקה הזאת אין סיבוב תרגול.
        </p>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="text-lg md:text-xl font-bold text-foreground max-w-2xl mx-auto leading-snug">
          החדשות הטובות? לקנות דירה נכון זה לא כישרון מולד.{" "}
          <span className="text-accent">זו מיומנות</span> — ומיומנות לומדים:
          בסדר הנכון, עם הכלים הנכונים, ומהר משנדמה לכם.
        </p>
      </Reveal>
    </div>
  );
};

export default NotYourFault;
