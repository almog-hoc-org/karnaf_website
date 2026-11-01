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
import HouseBuild from "@/components/premium/HouseBuild";
import founders from "@/assets/team/founders-campaign.webp";
import { YEARS_EXPERIENCE } from "@/data/companyStats";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";
import mascotThumbs from "@/assets/mascot/mascot-thumbsup.webp";
import logo from "@/assets/mascot/karnaf-logo.png";

/**
 * /lp/premium — the paid-social landing page for 1:1 investor
 * accompaniment. One job: a visitor from an ad leaves their details and an
 * investor-accompaniment advisor calls them back.
 *
 * Centred single column on an architect's sheet. The form comes right after
 * a short hero; below it a pinned frame draws a house stage by stage
 * (HouseBuild), then the founders, a client quote and a light closing band.
 * Navy ink, green for action and progress, orange only in the lit windows.
 * No figures on the page and no WhatsApp: the one action is leaving details,
 * and every button that leads to the form carries the same label.
 *
 * Standalone (no nav, popups or cross-sell) and noindex. Leads go through
 * the same submitWebsiteLead pipeline as /premium (CRM + Make → the premium
 * backup sheet and the shared accompaniment sheet), with their own source
 * so the shared sheet shows the campaign and the ad (utm_content).
 */

const LEAD_SOURCE = "premium-campaign";
const LEAD_SERVICE = "premium";

/* Required agreement to store the details and call back about this
   request. It is NOT marketing (spam-law 30A) consent, so leads from this
   page go out with marketingConsent: false; the wording is recorded in the
   lead's message instead. */
const AGREE_TEXT = "אני מאשר/ת לקרנף נדל״ן לשמור את הפרטים וליצור איתי קשר.";

/** One label for every control that leads to (or submits) the form. */
const CTA_LABEL = "לתיאום שיחת היכרות";

const GOALS = ["השקעה", "מגורים"] as const;

/** Estimated equity, in words — same brackets as /premium, merged to four. */
const EQUITY_OPTIONS = ["עד 250,000 ש״ח", "250,000 עד 500,000 ש״ח", "500,000 עד 1,000,000 ש״ח", "מעל 1,000,000 ש״ח"];


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
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; consent?: string }>({});
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
    if (!consent) next.consent = "כדי שנוכל לחזור אליכם, סמנו את האישור";
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
      const parts = ["מהות הפנייה: שיחת היכרות ללא התחייבות, קמפיין ליווי משקיעים"];
      if (goal) parts.push(`מטרה: ${goal}`);
      if (ad) parts.push(`מודעה: ${ad}`);
      parts.push(`אישר/ה: ${AGREE_TEXT}`);
      await submitWebsiteLead({
        name: name.trim(),
        phone,
        email: email.trim() || undefined,
        equity: equity || undefined,
        stage: goal || undefined,
        service: LEAD_SERVICE,
        source: LEAD_SOURCE,
        message: parts.join(" | "),
        marketingConsent: false,
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
    `block w-full h-[3.25rem] lg:h-12 rounded-xl border bg-white px-4 text-base ${ink} placeholder:text-[hsl(215_12%_60%)] outline-none transition-[border-color,box-shadow] duration-150 ${
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
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 text-right lg:grid-cols-2 lg:gap-x-3 lg:gap-y-3">
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
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              phone: phone.trim() && !isValidIsraeliPhone(phone) ? PHONE_ERROR_MESSAGE : undefined,
            }))
          }
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

      <fieldset className="lg:col-span-2">
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
                className={`h-[3.25rem] lg:h-12 rounded-xl border text-base font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] ${
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

      <div className="lg:col-span-2">
        <label
          htmlFor={`${uid}-consent`}
          className={`flex cursor-pointer items-start gap-3 rounded-xl p-3.5 transition-colors duration-150 ${
            errors.consent ? "bg-[hsl(0_70%_97%)] ring-1 ring-[hsl(0_65%_50%/0.45)]" : "bg-[hsl(40_30%_96%)]"
          }`}
        >
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
            <input
              id={`${uid}-consent`}
              type="checkbox"
              checked={consent}
              required
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked) setErrors((prev) => ({ ...prev, consent: undefined }));
              }}
              aria-invalid={!!errors.consent}
              aria-describedby={`${uid}-consent-note${errors.consent ? ` ${uid}-consent-error` : ""}`}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-[hsl(36_10%_62%)] bg-white transition-colors checked:border-[hsl(152_42%_30%)] checked:bg-[hsl(152_42%_30%)] focus-visible:ring-4 focus-visible:ring-[hsl(152_42%_30%/0.18)]"
            />
            <Check
              size={14}
              strokeWidth={3}
              aria-hidden
              className="pointer-events-none absolute left-[3px] top-[3px] text-white opacity-0 peer-checked:opacity-100"
            />
          </span>
          <span className="text-[0.93rem] leading-relaxed">
            <span className={ink}>{AGREE_TEXT}</span>
            <span id={`${uid}-consent-note`} className={`block text-[0.84rem] ${muted}`}>
              הפרטים לא יועברו לצד שלישי.{" "}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-[hsl(152_42%_28%)]">
                מדיניות הפרטיות
              </Link>
            </span>
          </span>
        </label>
        {error("consent")}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex h-14 w-full lg:col-span-2 lg:h-[3.25rem] items-center justify-center gap-2.5 rounded-xl bg-[hsl(152_42%_28%)] text-[1.05rem] font-semibold text-white shadow-[0_10px_24px_-14px_hsl(152_45%_20%/0.7)] transition-[background-color,transform] duration-150 ease-out hover:bg-[hsl(152_45%_23%)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(152_42%_30%/0.3)] disabled:opacity-75"
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
            שולחים את הפרטים
          </>
        ) : (
          CTA_LABEL
        )}
      </button>
      <p className={`text-center text-[0.9rem] lg:col-span-2 ${muted}`}>שיחת ההיכרות ללא עלות וללא התחייבות.</p>
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

/* Architect's sheet behind the page; its tint follows the house as it is
   built (cool paper → pale green). Fixed and pointer-events-none. */
const SHEET_FROM = [243, 246, 243];
const SHEET_TO = [233, 242, 235];

const PremiumLandingPage = () => {
  const still = useStillMotion();
  const sheetRef = useRef<HTMLDivElement>(null);
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

  const tintSheet = (p: number) => {
    if (!sheetRef.current) return;
    const c = SHEET_FROM.map((v, i) => Math.round(v + (SHEET_TO[i] - v) * p));
    sheetRef.current.style.backgroundColor = `rgb(${c.join(" ")})`;
  };

  return (
    <div className="relative isolate min-h-screen">
      <SEOHead
        title="שיחת היכרות עם מלווה משקיעים | קרנף נדל״ן"
        description="ליווי אישי ברכישת נכס להשקעה או למגורים: אסטרטגיה, בדיקת עסקאות, משא ומתן וליווי עד החתימה. השאירו פרטים לשיחת היכרות אישית ללא עלות וללא התחייבות."
        path="/lp/premium"
        noindex
      />

      {/* architect's sheet */}
      <div
        ref={sheetRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[rgb(243_246_243)]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(152 42% 30% / 0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(152 42% 30% / 0.07) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 85% 75% at 50% 55%, #000 35%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 55%, #000 35%, transparent 90%)",
          }}
        />
      </div>

      <main
        id="main-content"
        className="text-center lg:mx-auto lg:grid lg:max-w-[88rem] lg:grid-cols-[minmax(26rem,33rem)_minmax(0,1fr)] lg:gap-10 lg:px-8 xl:gap-16"
      >
        {/* right on desktop: everything needed to leave details, always in view */}
        <div className="mx-auto max-w-[34rem] px-5 pt-7 sm:pt-10 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:w-full lg:max-w-none lg:flex-col lg:overflow-y-auto lg:px-0 lg:py-5 lg:[justify-content:safe_center]">
          {/* brand */}
          <Link
            to="/"
            className="rise-in inline-flex items-center gap-2.5 self-center rounded-full border border-[hsl(150_12%_85%)] bg-white/85 py-1.5 pe-4 ps-1.5"
            aria-label="קרנף נדל״ן, לדף הבית"
          >
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-contain" />
            <span className={`text-[0.92rem] font-semibold ${ink}`}>קרנף נדל״ן</span>
          </Link>

          <h1
            className={`rise-in mx-auto mt-8 max-w-[24rem] text-balance text-[2.15rem] font-bold leading-[1.16] tracking-[-0.01em] sm:max-w-none sm:text-[2.6rem] lg:mt-5 lg:text-[2.2rem] [@media(min-width:1024px)_and_(max-height:820px)]:mt-3 [@media(min-width:1024px)_and_(max-height:820px)]:text-[1.9rem] ${ink}`}
            style={{ "--d": "0.08s" } as React.CSSProperties}
          >
            מלווה משקיעים אישי, לצדכם עד החתימה
          </h1>
          <span
            aria-hidden
            className="rise-in mx-auto mt-5 block h-[3px] w-10 rounded-full bg-[hsl(152_42%_30%)] lg:mt-4"
            style={{ "--d": "0.16s" } as React.CSSProperties}
          />
          <p
            className={`rise-in mx-auto mt-5 max-w-[28rem] text-pretty text-[1.06rem] leading-[1.8] lg:mt-4 lg:text-[1rem] lg:leading-[1.7] [@media(min-width:1024px)_and_(max-height:820px)]:hidden ${muted}`}
            style={{ "--d": "0.2s" } as React.CSSProperties}
          >
            לכל צד בעסקת נדל״ן יש אינטרס משלו. מלווה המשקיעים של קרנף נדל״ן מייצג רק אתכם, מהשיחה הראשונה ועד החתימה.
          </p>

          {/* form, with the rhino pointing at it */}
          <section
            id={FORM_ID}
            ref={formRef}
            aria-labelledby="form-title"
            className="relative mt-28 scroll-mt-28 rounded-[1.25rem] sm:mt-36 lg:mt-20 lg:shrink-0 lg:px-6 lg:pb-4 lg:pt-6 border border-[hsl(150_10%_87%)] bg-white px-6 pb-7 pt-10 shadow-[0_1px_2px_hsl(160_30%_15%/0.04),0_22px_48px_-26px_hsl(160_30%_15%/0.3)] sm:px-8 sm:pb-8"
          >
            <motion.img
              src={mascotWelcome}
              alt="הקרנף של קרנף נדל״ן מצביע על הטופס"
              width={362}
              height={500}
              className="pointer-events-none absolute -top-[7.6rem] right-1 h-[9.5rem] w-auto select-none lg:-top-[4.9rem] lg:h-[6rem] drop-shadow-[0_8px_12px_hsl(217_40%_20%/0.15)] sm:right-3"
              initial={still ? false : { opacity: 0, transform: "translate3d(0, 14px, 0)" }}
              animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            />
            <h2 id="form-title" className={`text-[1.35rem] font-semibold leading-snug lg:mb-4 lg:text-[1.25rem] ${ink}`}>
              השאירו פרטים לשיחת היכרות
            </h2>
            <p className={`mx-auto mb-7 mt-2 max-w-[24rem] text-pretty text-[0.98rem] leading-relaxed lg:hidden ${muted}`}>
              זה כל מה שצריך. מלווה משקיעים מהצוות שלנו יחזור אליכם לשיחה אישית, ללא עלות וללא התחייבות.
            </p>
            <LeadForm />
          </section>
        </div>

        {/* left on desktop: the house, then who we are */}
        <div className="min-w-0">
        {/* the house, drawn stage by stage */}
        <div className="mt-20 lg:mt-0">
          <HouseBuild onProgress={tintSheet} />
        </div>

        {/* founders */}
        <section aria-labelledby="founders-title" className="mx-auto mt-12 max-w-[34rem] px-5 lg:mt-4">
          <h2 id="founders-title" className={`text-balance text-[1.6rem] font-bold leading-tight sm:text-[2rem] ${ink}`}>
            מי עומד מאחורי קרנף נדל״ן
          </h2>
          <figure className="mt-8">
            <div className="relative mx-auto aspect-[760/820] w-full max-w-[24rem] overflow-hidden rounded-t-[999px] rounded-b-[1.25rem] bg-[radial-gradient(ellipse_80%_70%_at_50%_85%,hsl(150_32%_88%),hsl(150_28%_94%)_60%,hsl(150_20%_96%))]">
              <img
                src={founders}
                alt="איתמר נחליאל ואלמוג חכמה, מייסדי קרנף נדל״ן"
                width={760}
                height={820}
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 bottom-0 h-[94%] w-full object-contain object-bottom"
              />
            </div>
            <figcaption className={`mt-3 text-[0.9rem] ${muted}`}>מימין: איתמר נחליאל, משמאל: אלמוג חכמה</figcaption>
          </figure>
          <div className={`mx-auto mt-7 max-w-[30rem] space-y-4 text-pretty text-[1.04rem] leading-[1.85] ${muted}`}>
            <p>
              התחלנו להשקיע בנדל״ן כשעוד שירתנו כקצינים בצה״ל. מאז צברנו{" "}
              <span className={`font-semibold ${ink}`}>מעל {YEARS_EXPERIENCE} שנות ניסיון</span>, והשקענו בעצמנו כמעט
              בכל סוג של עסקת נדל״ן, בארץ ובחו״ל: יד שנייה ושיפוץ, דירות מקבלן, התחדשות עירונית, קרקעות ויזמות.
            </p>
            <p>
              בדרך ראינו מקרוב <span className={`font-semibold ${ink}`}>מאות עסקאות</span> ולמדנו לזהות מה עובד ומה עולה
              ביוקר. הקמנו את קרנף נדל״ן אחרי שראינו חברים ובני משפחה קונים דירה בלי ידע ומשלמים על זה. בליווי תקבלו את
              הניסיון הזה, כדי שלא תצטרכו לשלם עליו שכר לימוד.
            </p>
          </div>
          <p className={`mt-5 text-[1.05rem] font-semibold ${ink}`}>איתמר ואלמוג</p>
        </section>

        <figure className="mx-auto mt-20 max-w-[34rem] px-5">
          <div className="rounded-[1.25rem] border border-[hsl(150_10%_87%)] bg-white/90 px-6 py-8">
            <blockquote className={`mx-auto max-w-[28rem] text-[1.08rem] leading-[1.85] ${ink}`}>
              ״אחרי שנים של חשיבה על השקעה בנדל״ן, סוף סוף מצאתי את האנשים הנכונים. הניתוח הפיננסי שקיבלתי היה מדויק,
              והליווי האישי גרם לי להרגיש שאני לא לבד בתהליך.״
            </blockquote>
            <figcaption className={`mt-4 text-[0.95rem] ${muted}`}>אירית מ., משקיעה בנדל״ן</figcaption>
          </div>
        </figure>
        <p className={`hidden pb-10 pt-14 text-[0.85rem] lg:block ${muted}`}>
          <Link to="/privacy" className="underline-offset-4 hover:text-[hsl(217_42%_18%)] hover:underline">
            מדיניות פרטיות
          </Link>
          <span className="mx-3" aria-hidden>
            |
          </span>
          <Link to="/" className="underline-offset-4 hover:text-[hsl(217_42%_18%)] hover:underline">
            לאתר קרנף נדל״ן
          </Link>
        </p>
        </div>
      </main>

      {/* close: a deeper shade of the same paper, never a jump to dark */}
      <section
        ref={closeRef}
        className="relative mt-32 bg-[hsl(150_30%_90%)] px-5 pb-28 pt-px text-center md:pb-14 lg:hidden"
        aria-labelledby="close-title"
      >
        <div className="mx-auto max-w-[34rem]">
          <img
            src={mascotThumbs}
            alt=""
            width={500}
            height={281}
            loading="lazy"
            decoding="async"
            className="mx-auto -mt-24 h-36 w-auto"
          />
          <h2 id="close-title" className={`mt-4 text-balance text-[1.7rem] font-bold leading-tight sm:text-[2rem] ${ink}`}>
            השאירו פרטים, ואת השאר נעשה יחד
          </h2>
          <p className={`mx-auto mt-3 max-w-[26rem] text-pretty leading-[1.75] ${muted}`}>
            שיחת היכרות אישית עם מלווה משקיעים, ללא עלות וללא התחייבות.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="mt-8 h-14 w-full max-w-[22rem] rounded-xl bg-[hsl(152_42%_28%)] text-[1.05rem] font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[hsl(152_45%_23%)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(152_42%_30%/0.3)] active:scale-[0.97]"
          >
            {CTA_LABEL}
          </button>
        </div>
        <p className={`mt-12 text-[0.85rem] ${muted}`}>
          <Link to="/privacy" className="underline-offset-4 hover:text-[hsl(217_42%_18%)] hover:underline">
            מדיניות פרטיות
          </Link>
          <span className="mx-3" aria-hidden>
            |
          </span>
          <Link to="/" className="underline-offset-4 hover:text-[hsl(217_42%_18%)] hover:underline">
            לאתר קרנף נדל״ן
          </Link>
        </p>
      </section>

      {/* mobile: one bar back to the form once it has scrolled away */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-[hsl(150_10%_86%)] bg-[hsl(140_20%_97%/0.95)] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
            initial={{ transform: "translateY(100%)" }}
            animate={{ transform: "translateY(0%)" }}
            exit={{ transform: "translateY(100%)" }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <button
              type="button"
              onClick={scrollToForm}
              className="h-[3.25rem] w-full rounded-xl bg-[hsl(152_42%_28%)] text-[1.02rem] font-semibold text-white transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              {CTA_LABEL}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AccessibilityWidget />
    </div>
  );
};

export default PremiumLandingPage;
