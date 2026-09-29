import { useId } from "react";
import { Link } from "react-router-dom";
import { MARKETING_CONSENT_NOTE, MARKETING_CONSENT_TEXT } from "@/lib/consent";

interface MarketingConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Render on a dark surface. */
  dark?: boolean;
  className?: string;
}

/**
 * Opt-in checkbox for marketing messages — unchecked by default and never
 * required to submit (see lib/consent.ts). The whole line is the tap
 * target, and the privacy note under it stays visible either way.
 */
const MarketingConsent = ({ checked, onChange, dark = false, className = "" }: MarketingConsentProps) => {
  const id = useId();
  const noteId = `${id}-note`;
  return (
    <div className={`text-start ${className}`}>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer min-h-[44px] py-1.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby={noteId}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[hsl(var(--accent))]"
        />
        <span className={`text-sm leading-relaxed ${dark ? "text-white/85" : "text-foreground/85"}`}>
          {MARKETING_CONSENT_TEXT}
        </span>
      </label>
      <p id={noteId} className={`text-xs leading-relaxed ps-8 ${dark ? "text-white/55" : "text-muted-foreground"}`}>
        {MARKETING_CONSENT_NOTE}{" "}
        <Link
          to="/privacy"
          className={`underline underline-offset-2 ${dark ? "hover:text-white" : "hover:text-accent"}`}
        >
          מדיניות הפרטיות
        </Link>
      </p>
    </div>
  );
};

export default MarketingConsent;
