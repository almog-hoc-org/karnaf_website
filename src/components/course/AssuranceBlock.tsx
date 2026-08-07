import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  CalendarClock,
  MessageCircle,
  PlayCircle,
  ArrowLeft,
} from "lucide-react";
import { Reveal } from "@/components/v2/Reveal";
import { botLink } from "@/lib/whatsapp";
import { CHECKOUT_URL } from "@/lib/constants";
import { buildCheckoutUrl } from "@/lib/checkout";
import { gaFreePreview } from "@/lib/analytics";

/**
 * S11 — risk reversal without a refund promise: radical transparency
 * (everything is written on this page), a full year of access, a free
 * first lesson to taste before paying, and a human channel for a
 * pre-purchase question. Ends with the condensed premium lane for
 * whoever needs hand-holding instead.
 */

const assurances = [
  {
    icon: Eye,
    title: "אין הפתעות",
    body: "כל פרק, כל שיעור וכל כלי מפורטים כאן למעלה. מה שראיתם הוא בדיוק מה שתקבלו.",
  },
  {
    icon: PlayCircle,
    title: "טועמים לפני שמחליטים",
    body: "השיעור הראשון פתוח לצפייה חינם בדף התוכנית — נכנסים, רואים איך זה בנוי, ואז מחליטים.",
    href: "preview",
  },
  {
    icon: CalendarClock,
    title: "שנה שלמה, בקצב שלכם",
    body: "אין דדליין. 12 חודשי גישה מלאה — גם אם הדירה שלכם תגיע רק באביב.",
  },
  {
    icon: MessageCircle,
    title: "שאלה לפני שמחליטים?",
    body: "כתבו לנו בוואטסאפ. עונים לעניין, בלי לחץ מכירתי.",
    href: "whatsapp",
  },
];

const AssuranceBlock = () => {
  // SSG renders the plain checkout URL; enriched client-side (see checkout.ts).
  const [previewHref, setPreviewHref] = useState(CHECKOUT_URL);
  useEffect(() => {
    setPreviewHref(buildCheckoutUrl({ preview: true }));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-black text-foreground text-center leading-tight mb-10">
          הסיכון הכי קטן בכל תהליך הרכישה.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {assurances.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 text-center">
              <item.icon size={20} className="text-accent mb-3 mx-auto" />
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
              {item.href === "whatsapp" && (
                <a
                  href={botLink("התוכנית הדיגיטלית — שאלה לפני רכישה")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-accent mt-2 py-3 min-h-[44px] underline-offset-4 hover:underline"
                >
                  לשאלה בוואטסאפ ←
                </a>
              )}
              {item.href === "preview" && (
                <a
                  href={previewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-no-btn-track
                  onClick={() => gaFreePreview("accepted")}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-accent mt-2 py-3 min-h-[44px] underline-offset-4 hover:underline"
                >
                  לצפייה בשיעור הראשון ←
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="text-center text-sm text-muted-foreground">
          מעדיפים שמישהו יעשה את הדרך איתכם, יד ביד עד המפתח?{" "}
          <Link
            to="/premium"
            className="inline-flex items-center gap-1 font-bold text-primary underline-offset-4 hover:underline"
          >
            יש לנו גם ליווי 1:1
            <ArrowLeft size={13} />
          </Link>
        </p>
      </Reveal>
    </div>
  );
};

export default AssuranceBlock;
