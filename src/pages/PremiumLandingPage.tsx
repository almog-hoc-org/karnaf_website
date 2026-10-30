import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { getLeadContext } from "@/lib/leadContext";
import { isValidIsraeliPhone, PHONE_ERROR_MESSAGE } from "@/lib/validation";
import { setBottomBarHeight } from "@/lib/bottomBar";
import { useStillMotion } from "@/hooks/use-still-motion";
import BuildingBackdrop from "@/components/premium/BuildingBackdrop";
import JourneyRail from "@/components/premium/JourneyRail";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";
import mascotThumbs from "@/assets/mascot/mascot-thumbsup.webp";
import logo from "@/assets/mascot/karnaf-logo.png";

/**
 * /lp/premium — the paid-social landing page for 1:1 investor
 * accompaniment. One job: a visitor from an ad leaves their details and an
 * investor-accompaniment advisor calls them back.
 *
 * Centred single column on a fixed "architect's sheet" backdrop where a
 * house is drawn as the visitor scrolls (BuildingBackdrop); the journey
 * below the form fills with scroll (JourneyRail). Navy ink, green for
 * action and progress, orange only in the lit windows. No figures on the
 * page and no WhatsApp: the one action is leaving details.
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
        description: "בדקו את החיבור לאינטרנט ונסו שוב בעוד רגע.",
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

const FORM_ID = "lead-form";

const scrollToForm = () => {
  const el = document.getElementById(FORM_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => el.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }), 500);
};

const PremiumLandingPage = () => {
  const still = useStillMotion();
  const formRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLElement>(null);
  const [formInView, setFormInView] = useState(true);
  const [closeInView, setCloseInView] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => (e.target === el ? setFormInView(e.isIntersecting) : setCloseInView(e.isIntersecting))),
      { threshold: 0.1 }
    );
    io.observe(el);
    if (closeRef.current) io.observe(closeRef.current);
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const showBar = scrolled && !formInView && !closeInView;
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setBottomBarHeight("lp-premium-bar", showBar && mobile ? 80 : 0);
    return () => setBottomBarHeight("lp-premium-bar", 0);
  }, [showBar]);

  return (
    <div className="relative isolate min-h-screen">
      <SEOHead
        title="שיחת היכרות עם מלווה משקיעים | קרנף נדל״ן"
        description="ליווי אישי ברכישת נכס להשקעה או למגורים: אסטרטגיה, בדיקת עסקאות, משא ומתן וליווי עד החתימה. השאירו פרטים לשיחת היכרות אישית ללא עלות וללא התחייבות."
        path="/lp/premium"
        noindex
      />
      <BuildingBackdrop />

      <main id="main-content" className="relative z-10 mx-auto max-w-[34rem] px-5 pt-7 text-center sm:pt-10">
        {/* brand */}
        <Link
          to="/"
          className="rise-in inline-flex items-center gap-2.5 rounded-full border border-[hsl(36_16%_86%)] bg-white/80 py-1.5 pe-4 ps-1.5 backdrop-blur-sm"
          aria-label="קרנף נדל״ן — לדף הבית"
        >
          <img src={logo} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-contain" />
          <span className={`text-[0.92rem] font-semibold ${ink}`}>קרנף נדל״ן</span>
        </Link>

        <h1
          className={`rise-in mx-auto mt-8 max-w-[24rem] text-balance text-[2.15rem] font-bold leading-[1.18] sm:max-w-none sm:text-[2.6rem] ${ink}`}
          style={{ "--d": "0.08s" } as React.CSSProperties}
        >
          מלווה משקיעים אישי, לצדכם עד החתימה
        </h1>
        <span
          aria-hidden
          className="rise-in mx-auto mt-5 block h-[3px] w-10 rounded-full bg-[hsl(152_42%_30%)]"
          style={{ "--d": "0.16s" } as React.CSSProperties}
        />
        <p
          className={`rise-in mx-auto mt-5 max-w-[30rem] text-pretty text-[1.06rem] leading-[1.8] ${muted}`}
          style={{ "--d": "0.2s" } as React.CSSProperties}
        >
          בכל עסקת נדל״ן יושבים מולכם מוכר, יזם, מתווך ובנק, ולכל אחד מהם אינטרס משלו. מלווה המשקיעים של קרנף
          נדל״ן עובד רק בשבילכם ומייצג את האינטרס שלכם בכל שלב בדרך.
        </p>

        {/* form, with the rhino pointing at it */}
        <section
          id={FORM_ID}
          ref={formRef}
          aria-labelledby="form-title"
          className="relative mt-28 scroll-mt-28 rounded-2xl border border-[hsl(36_16%_88%)] bg-white px-6 pb-7 pt-10 shadow-[0_1px_2px_hsl(30_20%_20%/0.04),0_18px_40px_-22px_hsl(30_20%_20%/0.25)] sm:px-8 sm:pb-8"
        >
          <motion.img
            src={mascotWelcome}
            alt="הקרנף של קרנף נדל״ן מצביע על הטופס"
            width={362}
            height={500}
            className="pointer-events-none absolute -top-[7.6rem] right-1 h-[9.5rem] w-auto select-none drop-shadow-[0_8px_12px_hsl(217_40%_20%/0.15)] sm:right-3"
            initial={{ opacity: 0, y: 16 }}
            animate={still ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -5, 0] }}
            transition={
              still
                ? { duration: 0 }
                : { opacity: { duration: 0.6, delay: 0.3 }, y: { duration: 4, delay: 0.9, repeat: Infinity, ease: "easeInOut" } }
            }
          />
          <h2 id="form-title" className={`text-[1.35rem] font-semibold leading-snug ${ink}`}>
            השאירו פרטים לשיחת היכרות
          </h2>
          <p className={`mx-auto mb-7 mt-2 max-w-[24rem] text-[0.98rem] leading-relaxed ${muted}`}>
            זה כל מה שצריך. מלווה משקיעים מהצוות שלנו יחזור אליכם לשיחה אישית, ללא עלות וללא התחייבות.
          </p>
          <LeadForm />
        </section>

        {/* the journey */}
        <section aria-labelledby="journey-title" className="mt-24">
          <h2 id="journey-title" className={`text-balance text-[1.6rem] font-bold leading-tight sm:text-[1.85rem] ${ink}`}>
            הכול מתחיל בשיחה אחת
          </h2>
          <p className={`mx-auto mt-3 max-w-[26rem] text-pretty leading-[1.75] ${muted}`}>
            לא צריך להחליט שום דבר מראש. משאירים פרטים, ומשם ממשיכים יחד, צעד אחרי צעד.
          </p>
          <JourneyRail />
        </section>

        <figure className="mt-20 rounded-2xl border border-[hsl(36_16%_88%)] bg-white/85 px-6 py-8 backdrop-blur-sm">
          <blockquote className={`mx-auto max-w-[28rem] text-[1.08rem] leading-[1.85] ${ink}`}>
            ״אחרי שנים של חשיבה על השקעה בנדל״ן, סוף סוף מצאתי את האנשים הנכונים. הניתוח הפיננסי שקיבלתי היה מדויק,
            והליווי האישי גרם לי להרגיש שאני לא לבד בתהליך.״
          </blockquote>
          <figcaption className={`mt-4 text-[0.95rem] ${muted}`}>אירית מ., משקיעה בנדל״ן</figcaption>
        </figure>
      </main>

      {/* close */}
      <section ref={closeRef} className="relative z-10 mt-20 bg-[hsl(158_34%_14%)] px-5 pb-28 pt-14 text-center text-white md:pb-16">
        <div className="mx-auto max-w-[34rem]">
          <img
            src={mascotThumbs}
            alt=""
            width={500}
            height={281}
            loading="lazy"
            className="mx-auto -mt-28 h-36 w-auto"
          />
          <h2 className="mt-4 text-balance text-[1.7rem] font-bold leading-tight sm:text-[2rem]">
            השאירו פרטים, ואת השאר נעשה יחד
          </h2>
          <p className="mx-auto mt-3 max-w-[26rem] text-pretty leading-[1.75] text-white/75">
            שיחת היכרות אישית עם מלווה משקיעים, ללא עלות וללא התחייבות.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="mt-8 h-14 w-full max-w-[22rem] rounded-xl bg-[hsl(40_38%_97%)] text-[1.05rem] font-semibold text-[hsl(158_40%_16%)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            לשיחת היכרות ללא עלות
          </button>
        </div>
        <p className="mt-12 text-[0.85rem] text-white/55">
          <Link to="/privacy" className="hover:text-white">
            מדיניות פרטיות
          </Link>
          <span className="mx-3" aria-hidden>
            |
          </span>
          <Link to="/" className="hover:text-white">
            לאתר קרנף נדל״ן
          </Link>
        </p>
      </section>

      {/* mobile: one bar back to the form once it has scrolled away */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-[hsl(36_16%_86%)] bg-[hsl(40_38%_97%/0.95)] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={scrollToForm}
              className="h-[3.25rem] w-full rounded-xl bg-[hsl(152_42%_28%)] text-[1.02rem] font-semibold text-white"
            >
              השאירו פרטים לשיחת היכרות
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AccessibilityWidget />
    </div>
  );
};

export default PremiumLandingPage;
