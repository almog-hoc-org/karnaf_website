import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { getLeadContext } from "@/lib/leadContext";
import { isValidIsraeliPhone, PHONE_ERROR_MESSAGE } from "@/lib/validation";
import { premiumLink } from "@/lib/whatsapp";
import logo from "@/assets/mascot/karnaf-logo.png";

/**
 * /lp/premium — the paid-social landing page for 1:1 investor
 * accompaniment. One job: a visitor from an ad leaves their details and an
 * investor-accompaniment advisor calls them back.
 *
 * Calm and centred on purpose: near-white surface, navy ink, one green
 * accent for action and selection. No figures anywhere on the page.
 *
 * Standalone (no nav, popups or cross-sell) and noindex. Leads go through
 * the same submitWebsiteLead pipeline as /premium (CRM + Make → the premium
 * backup sheet and the shared accompaniment sheet), with their own source
 * so the shared sheet shows the campaign and the ad (utm_content).
 */

const LEAD_SOURCE = "premium-campaign";
const LEAD_SERVICE = "premium";

/* The page's own consent wording — recorded verbatim with the lead. */
const CONSENT_TEXT = "אני מאשר/ת לקרנף נדל״ן לשמור את הפרטים שלי ולשלוח לי עדכונים ותוכן מקצועי.";
const CONSENT_VERSION = "lp-premium-2026-10-30";

const GOALS = ["השקעה", "מגורים"] as const;

/** Estimated equity, in words — same brackets as /premium, merged to four. */
const EQUITY_OPTIONS = ["עד רבע מיליון ₪", "רבע עד חצי מיליון ₪", "חצי מיליון עד מיליון ₪", "מעל מיליון ₪"];

const VALUES = [
  {
    title: "אסטרטגיה שמתאימה לכם",
    body: "מגדירים יחד מה מחפשים, איפה ובאיזה תקציב, לפני שמתחילים לחפש.",
  },
  {
    title: "בדיקה מעמיקה של כל עסקה",
    body: "מחיר מול עסקאות אמת, מצב תכנוני ומשפטי ותנאי החוזה, כדי שתחליטו בעיניים פקוחות.",
  },
  {
    title: "משא ומתן וליווי עד החתימה",
    body: "יושבים לצדכם מול המוכר, היזם והבנק, ונשארים איתכם עד שהחוזה חתום.",
  },
];

const ink = "text-[hsl(217_42%_18%)]";
const muted = "text-[hsl(215_14%_42%)]";

const LeadForm = () => {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [equity, setEquity] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const thankYou = `/thank-you?src=${LEAD_SOURCE}&service=${LEAD_SERVICE}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "נא למלא שם";
    if (!isValidIsraeliPhone(phone)) next.phone = phone.trim() ? PHONE_ERROR_MESSAGE : "נא למלא מספר טלפון";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "כתובת המייל אינה תקינה";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${uid}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    if (company) {
      navigate(thankYou);
      return;
    }
    setSubmitting(true);
    try {
      const ad = getLeadContext().utm_content;
      const parts = ["מהות הפנייה: שיחת היכרות ללא התחייבות — קמפיין ליווי משקיעים"];
      if (goal) parts.push(`מטרה: ${goal}`);
      if (ad) parts.push(`מודעה: ${ad}`);
      await submitWebsiteLead({
        name: name.trim(),
        phone,
        email: email.trim() || undefined,
        equity: equity || undefined,
        stage: goal || undefined,
        service: LEAD_SERVICE,
        source: LEAD_SOURCE,
        message: parts.join(" | "),
        marketingConsent: consent,
        consentText: CONSENT_TEXT,
        consentVersion: CONSENT_VERSION,
      });
      navigate(thankYou);
    } catch {
      toast({
        title: "הפרטים לא נשלחו",
        description: "בדקו את החיבור לאינטרנט ונסו שוב, או כתבו לנו בוואטסאפ.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const field = (hasError?: string) =>
    `block w-full h-[3.25rem] rounded-xl border bg-white px-4 text-base ${ink} placeholder:text-[hsl(215_12%_60%)] outline-none transition-[border-color,box-shadow] duration-150 ${
      hasError
        ? "border-[hsl(0_65%_50%)] focus:ring-4 focus:ring-[hsl(0_65%_50%/0.12)]"
        : "border-[hsl(36_14%_84%)] hover:border-[hsl(36_10%_72%)] focus:border-[hsl(152_42%_30%)] focus:ring-4 focus:ring-[hsl(152_42%_30%/0.12)]"
    }`;
  const label = `mb-1.5 block text-[0.95rem] font-medium ${ink}`;
  const optional = <span className={`font-normal ${muted}`}> (לא חובה)</span>;
  const error = (key: keyof typeof errors) =>
    errors[key] ? (
      <p id={`${uid}-${key}-error`} role="alert" className="mt-1.5 text-sm text-[hsl(0_65%_45%)]">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 text-right">
      <div>
        <label htmlFor={`${uid}-name`} className={label}>
          שם מלא
        </label>
        <input
          id={`${uid}-name`}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          className={field(errors.name)}
        />
        {error("name")}
      </div>

      <div>
        <label htmlFor={`${uid}-phone`} className={label}>
          טלפון
        </label>
        <input
          id={`${uid}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
          className={`${field(errors.phone)} text-right`}
        />
        {error("phone")}
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className={label}>
          אימייל{optional}
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${uid}-email-error` : undefined}
          className={`${field(errors.email)} text-right`}
        />
        {error("email")}
      </div>

      <fieldset>
        <legend className={label}>מה המטרה?{optional}</legend>
        <div className="grid grid-cols-2 gap-2.5" role="radiogroup">
          {GOALS.map((g) => {
            const on = goal === g;
            return (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setGoal(on ? "" : g)}
                className={`h-[3.25rem] rounded-xl border text-base font-medium transition-colors duration-150 ${
                  on
                    ? "border-[hsl(152_42%_30%)] bg-[hsl(150_35%_95%)] text-[hsl(152_45%_24%)]"
                    : `border-[hsl(36_14%_84%)] bg-white ${ink} hover:border-[hsl(36_10%_72%)]`
                }`}
              >
                {g === "השקעה" ? "נכס להשקעה" : "דירה למגורים"}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${uid}-equity`} className={label}>
          הון עצמי משוער{optional}
        </label>
        <div className="relative">
          <select
            id={`${uid}-equity`}
            value={equity}
            onChange={(e) => setEquity(e.target.value)}
            className={`${field()} appearance-none pe-4 ps-10 ${equity ? "" : "text-[hsl(215_12%_55%)]"}`}
          >
            <option value="">בחרו טווח</option>
            {EQUITY_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 12 8"
            className={`pointer-events-none absolute left-4 top-1/2 h-2 w-3 -translate-y-1/2 ${muted}`}
          >
            <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Honeypot — invisible to people */}
      <div className="absolute -z-10 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>חברה</label>
        <input
          id={`${uid}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <label
        htmlFor={`${uid}-consent`}
        className="flex cursor-pointer items-start gap-3 rounded-xl bg-[hsl(40_30%_96%)] p-4"
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-describedby={`${uid}-consent-note`}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-[hsl(36_10%_68%)] bg-white transition-colors checked:border-[hsl(152_42%_30%)] checked:bg-[hsl(152_42%_30%)] focus-visible:ring-4 focus-visible:ring-[hsl(152_42%_30%/0.18)]"
          />
          <Check
            size={14}
            strokeWidth={3}
            aria-hidden
            className="pointer-events-none absolute left-[3px] top-[3px] text-white opacity-0 peer-checked:opacity-100"
          />
        </span>
        <span className="text-[0.93rem] leading-relaxed">
          <span className={ink}>{CONSENT_TEXT}</span>
          <span id={`${uid}-consent-note`} className={`mt-1 block text-[0.85rem] ${muted}`}>
            הפרטים שלכם נשמרים אצלנו בלבד ולעולם לא יועברו לצד שלישי.{" "}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-[hsl(152_42%_28%)]">
              מדיניות הפרטיות
            </Link>
          </span>
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-[hsl(152_42%_28%)] text-[1.05rem] font-semibold text-white transition-colors duration-150 hover:bg-[hsl(152_45%_23%)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(152_42%_30%/0.3)] disabled:opacity-75"
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
            שולחים את הפרטים
          </>
        ) : (
          "לתיאום שיחת היכרות"
        )}
      </button>
      <p className={`text-center text-[0.9rem] ${muted}`}>שיחת ההיכרות ללא עלות וללא התחייבות.</p>
    </form>
  );
};

const PremiumLandingPage = () => (
  <div className="min-h-screen bg-[hsl(40_33%_98%)]">
    <SEOHead
      title="שיחת היכרות עם מלווה משקיעים | קרנף נדל״ן"
      description="ליווי אישי ברכישת נכס להשקעה או למגורים: אסטרטגיה, בדיקת עסקאות, משא ומתן וליווי עד החתימה. השאירו פרטים לשיחת היכרות ללא עלות וללא התחייבות."
      path="/lp/premium"
      noindex
    />

    <main id="main-content" className="mx-auto max-w-[34rem] px-5 pb-16 pt-8 text-center sm:pt-12">
      <Link to="/" className="inline-flex flex-col items-center gap-2" aria-label="קרנף נדל״ן — לדף הבית">
        <img src={logo} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-contain" />
        <span className={`text-[0.95rem] font-semibold tracking-wide ${ink}`}>קרנף נדל״ן</span>
      </Link>

      <h1 className={`mx-auto mt-8 max-w-[22rem] text-balance text-[2rem] font-bold leading-[1.2] sm:max-w-none sm:text-[2.4rem] ${ink}`}>
        מישהו בצד שלכם של השולחן
      </h1>
      <span aria-hidden className="mx-auto mt-5 block h-[3px] w-10 rounded-full bg-[hsl(152_42%_30%)]" />
      <p className={`mx-auto mt-5 max-w-[30rem] text-pretty text-[1.05rem] leading-[1.8] ${muted}`}>
        בכל עסקת נדל״ן יושבים מולכם מוכר, יזם, מתווך ובנק, ולכל אחד מהם אינטרס משלו. מלווה המשקיעים של קרנף
        נדל״ן עובד רק בשבילכם, מהשיחה הראשונה ועד החתימה על החוזה.
      </p>

      <section
        aria-labelledby="form-title"
        className="mt-10 rounded-2xl border border-[hsl(36_16%_88%)] bg-white p-6 shadow-[0_1px_2px_hsl(30_20%_20%/0.04),0_12px_32px_-18px_hsl(30_20%_20%/0.18)] sm:p-8"
      >
        <h2 id="form-title" className={`text-[1.3rem] font-semibold leading-snug ${ink}`}>
          השאירו פרטים ונחזור אליכם
        </h2>
        <p className={`mt-1.5 mb-7 text-[0.95rem] leading-relaxed ${muted}`}>
          מלווה משקיעים מהצוות שלנו ייצור איתכם קשר לשיחת היכרות קצרה.
        </p>
        <LeadForm />
      </section>

      <section aria-labelledby="values-title" className="mt-16">
        <h2 id="values-title" className={`text-[1.35rem] font-semibold ${ink}`}>
          מה כולל הליווי
        </h2>
        <ul className="mt-8 space-y-8">
          {VALUES.map((v) => (
            <li key={v.title}>
              <span
                aria-hidden
                className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(150_35%_94%)] text-[hsl(152_45%_26%)]"
              >
                <Check size={18} strokeWidth={2.25} />
              </span>
              <h3 className={`text-[1.08rem] font-semibold ${ink}`}>{v.title}</h3>
              <p className={`mx-auto mt-1.5 max-w-[26rem] leading-[1.75] ${muted}`}>{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <figure className="mt-16 border-t border-[hsl(36_16%_88%)] pt-12">
        <blockquote className={`mx-auto max-w-[28rem] text-[1.1rem] leading-[1.85] ${ink}`}>
          ״אחרי שנים של חשיבה על השקעה בנדל״ן, סוף סוף מצאתי את האנשים הנכונים. הניתוח הפיננסי שקיבלתי היה מדויק,
          והליווי האישי גרם לי להרגיש שאני לא לבד בתהליך.״
        </blockquote>
        <figcaption className={`mt-4 text-[0.95rem] ${muted}`}>אירית מ., משקיעה בנדל״ן</figcaption>
      </figure>

      <p className={`mt-14 text-[0.95rem] ${muted}`}>
        מעדיפים לכתוב?{" "}
        <a
          href={premiumLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[hsl(152_45%_26%)] underline underline-offset-4 hover:text-[hsl(152_45%_20%)]"
        >
          שלחו לנו הודעה בוואטסאפ
        </a>
      </p>
    </main>

    <footer className={`border-t border-[hsl(36_16%_90%)] px-5 py-6 text-center text-[0.85rem] ${muted}`}>
      <Link to="/privacy" className="hover:text-[hsl(217_42%_18%)]">
        מדיניות פרטיות
      </Link>
      <span className="mx-3" aria-hidden>
        |
      </span>
      <Link to="/" className="hover:text-[hsl(217_42%_18%)]">
        לאתר קרנף נדל״ן
      </Link>
    </footer>

    <AccessibilityWidget />
  </div>
);

export default PremiumLandingPage;
