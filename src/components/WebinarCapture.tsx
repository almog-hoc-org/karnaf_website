import { CalendarClock, ArrowLeft } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { WEBINAR_URL } from "@/lib/constants";

interface WebinarCaptureProps {
  /** Lead source reported to the CRM + pixel (see FORM_LABELS in lib/pixel.ts). */
  source: string;
  title?: string;
  body?: string;
  /** "strip" = one-row form for wide placements; "inline" = stacked, inside a card. */
  variant?: "strip" | "inline";
  /** Render on a dark surface. */
  dark?: boolean;
}

const DEFAULT_TITLE = "עוד לא מוכנים להחליט? התחילו מהוובינר החינמי.";
const DEFAULT_BODY =
  "שעה אחת שתחסוך לכם שנים של טעויות. הכלים, השיטה והטעויות שחייבים להכיר — לפני שקונים דירה.";

/**
 * The site's one free lead magnet, made first-class. Before this it lived
 * only inside a popup (once per 7 days) — a cold visitor who wasn't ready
 * to pay ₪950 today had nowhere to leave a trace. The form is the regular
 * ContactForm with the service fixed to "webinar", so the lead lands in
 * the CRM under the course product exactly like the popup path would.
 */
const WebinarCapture = ({
  source,
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  variant = "strip",
  dark = false,
}: WebinarCaptureProps) => {
  const strip = variant === "strip";
  const titleColor = dark ? "text-white" : "text-foreground";
  const bodyColor = dark ? "text-white/70" : "text-muted-foreground";

  return (
    <div
      className={`rounded-3xl border p-6 md:p-8 ${
        dark ? "border-white/10 bg-white/[0.04]" : "border-border bg-card"
      } ${strip ? "grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 items-center" : ""}`}
    >
      <div className={strip ? "" : "mb-5"}>
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/12 border border-accent/25 px-3.5 py-1.5 text-eyebrow font-bold uppercase tracking-[0.18em] text-accent mb-4">
          <CalendarClock size={14} />
          וובינר קרוב · בחינם
        </span>
        <h3 className={`text-xl md:text-2xl font-black leading-tight tracking-[-0.02em] mb-2 ${titleColor}`}>
          {title}
        </h3>
        <p className={`text-sm md:text-base leading-relaxed ${bodyColor}`}>{body}</p>
      </div>

      <div>
        <ContactForm
          source={source}
          serviceOptions={null}
          fixedService="webinar"
          submitLabel="שריינו לי מקום בוובינר"
          layout={strip ? "row" : "stack"}
          dark={dark}
        />
        <a
          href={WEBINAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline py-2 ${
            dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-accent"
          }`}
        >
          או להרשמה ישירה בדף הוובינר
          <ArrowLeft size={14} />
        </a>
      </div>
    </div>
  );
};

export default WebinarCapture;
