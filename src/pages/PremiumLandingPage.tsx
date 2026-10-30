import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import MarketingConsent from "@/components/MarketingConsent";
import TableScene from "@/components/premium/TableScene";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { getLeadContext } from "@/lib/leadContext";
import { isValidIsraeliPhone, PHONE_ERROR_MESSAGE } from "@/lib/validation";
import { premiumLink } from "@/lib/whatsapp";
import { setBottomBarHeight } from "@/lib/bottomBar";
import { PHONE_NUMBER } from "@/lib/constants";
import {
  ACTIVE_SINCE,
  DEALS_ACCOMPANIED_LABEL,
  TOTAL_CLIENTS_LABEL,
  TOTAL_CLIENTS_STAT,
} from "@/data/companyStats";
import logo from "@/assets/mascot/karnaf-logo.png";

/**
 * /lp/premium — the paid-social landing page for 1:1 investor
 * accompaniment. Built for one job: a visitor from a reel leaves name +
 * phone and an investor-accompaniment advisor calls them back.
 *
 * Deliberately outside SharedLayout: no nav, no popups, no cross-sell.
 * Leads go through the same submitWebsiteLead pipeline as /premium
 * (CRM + Make → the premium backup sheet and the shared accompaniment
 * sheet), with their own source so the sheet shows they came from the
 * campaign — and which ad (utm_content) they saw. noindex: it duplicates
 * /premium for search, and exists only for ads.
 */

const LEAD_SOURCE = "premium-campaign";
const LEAD_SERVICE = "premium";

/** Same ₪250K brackets as /premium, agreed with the accompaniment partner. */
const EQUITY_OPTIONS = [
  "עד 250 אלף ₪",
  "250–500 אלף ₪",
  "500–750 אלף ₪",
  "750 אלף – מיליון ₪",
  "מעל מיליון ₪",
];

const FORM_ID = "lead-form";

const AFTER_STEPS = [
  {
    title: "מלווה משקיעים חוזר אליכם",
    body: "תוך 24 שעות, בטלפון. שיחה קצרה: כמה הון עצמי יש, מה המטרה, ובאיזה טווח זמן.",
  },
  {
    title: "תשובה ישרה אם זה מתאים",
    body: "אם ליווי לא נכון לכם עכשיו, נגיד את זה — ונגיד מה כן כדאי לעשות. בלי לחץ ובלי מכירה.",
  },
  {
    title: "אם מתאים: מתחילים לעבוד",
    body: "אסטרטגיה, איתור וניתוח עסקאות, בדיקת נאותות ומשא ומתן — עד שאתם חותמים על החוזה.",
  },
];

const scrollToForm = () => {
  const el = document.getElementById(FORM_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => el.querySelector<HTMLInputElement>("input[name='name']")?.focus({ preventScroll: true }), 450);
};

const LeadForm = () => {
  const honeypotId = useId();
  const equityLabelId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [equity, setEquity] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [consent, setConsent] = useState(false); // never pre-checked
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "איך קוראים לכם? צריך שם כדי שנדע את מי לבקש.", variant: "destructive" });
      return;
    }
    if (!isValidIsraeliPhone(phone)) {
      setPhoneError(PHONE_ERROR_MESSAGE);
      return;
    }
    if (company) {
      navigate(`/thank-you?src=${LEAD_SOURCE}&service=${LEAD_SERVICE}`);
      return;
    }
    setSubmitting(true);
    try {
      const ad = getLeadContext().utm_content;
      await submitWebsiteLead({
        name: name.trim(),
        phone,
        equity: equity || undefined,
        service: LEAD_SERVICE,
        source: LEAD_SOURCE,
        message: `מהות הפנייה: שיחת היכרות ללא התחייבות — קמפיין ליווי משקיעים${ad ? ` | מודעה: ${ad}` : ""}`,
        marketingConsent: consent,
      });
      navigate(`/thank-you?src=${LEAD_SOURCE}&service=${LEAD_SERVICE}`);
    } catch {
      toast({
        title: "הפרטים לא נשלחו",
        description: "בדקו את החיבור ונסו שוב, או כתבו לנו בוואטסאפ.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full h-14 rounded-2xl border border-[hsl(36_20%_80%)] bg-white px-5 text-[1.05rem] text-foreground placeholder:text-[hsl(215_16%_52%)] outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-primary/15";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      <div>
        <label htmlFor="lp-name" className="sr-only">
          שם מלא
        </label>
        <input
          id="lp-name"
          name="name"
          autoComplete="name"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={field}
        />
      </div>
      <div>
        <label htmlFor="lp-phone" className="sr-only">
          טלפון לחזרה
        </label>
        <input
          id="lp-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder="טלפון לחזרה"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (phoneError) setPhoneError("");
          }}
          aria-invalid={!!phoneError}
          aria-describedby={phoneError ? "lp-phone-error" : undefined}
          required
          className={`${field} text-right placeholder:text-right ${phoneError ? "border-destructive focus:border-destructive focus:ring-destructive/15" : ""}`}
        />
        {phoneError && (
          <p id="lp-phone-error" role="alert" className="mt-1.5 ps-2 text-sm font-medium text-destructive">
            {phoneError}
          </p>
        )}
      </div>

      <fieldset className="pt-1.5" aria-labelledby={equityLabelId}>
        <legend id={equityLabelId} className="mb-2.5 text-[0.95rem] font-semibold text-foreground">
          כמה הון עצמי זמין? <span className="font-normal text-muted-foreground">לא חובה</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {EQUITY_OPTIONS.map((option) => {
            const on = equity === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={on}
                onClick={() => setEquity(on ? "" : option)}
                className={`min-h-[44px] rounded-full border px-4 text-[0.92rem] font-medium tabular-nums transition-colors ${
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-[hsl(36_20%_80%)] bg-white text-foreground hover:border-primary/50"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[0.8rem] text-muted-foreground">עוזר למלווה להגיע לשיחה מוכן.</p>
      </fieldset>

      {/* Honeypot — invisible to humans */}
      <div className="absolute -z-10 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor={honeypotId}>חברה</label>
        <input
          id={honeypotId}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <MarketingConsent checked={consent} onChange={setConsent} />

      <button
        type="submit"
        disabled={submitting}
        className="relative w-full h-[3.75rem] rounded-2xl bg-accent text-accent-foreground text-[1.15rem] font-black shadow-[0_14px_34px_-14px_hsl(24_80%_52%/0.75)] transition-colors hover:bg-[hsl(24_82%_48%)] disabled:opacity-80"
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2.5">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary" aria-hidden />
            שולחים את הפרטים
          </span>
        ) : (
          "תחזרו אליי לשיחת היכרות"
        )}
      </button>
      <p className="text-center text-[0.88rem] leading-relaxed text-muted-foreground">
        השיחה בלי עלות ובלי התחייבות. חוזרים אליכם תוך 24 שעות.
      </p>
    </form>
  );
};

const PremiumLandingPage = () => {
  const formRef = useRef<HTMLElement>(null);
  const [formVisible, setFormVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Mobile bar: shown once the visitor has scrolled and the form is off-screen.
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    const onScroll = () => setScrolled(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const showBar = scrolled && !formVisible;

  // Lift the accessibility button above the mobile bar while it shows.
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setBottomBarHeight("lp-premium-bar", showBar && mobile ? 76 : 0);
    return () => setBottomBarHeight("lp-premium-bar", 0);
  }, [showBar]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="שיחת היכרות עם מלווה משקיעים | קרנף נדל״ן"
        description="המוכר, היזם, המתווך והבנק — לכל אחד אינטרס בעסקה. מלווה משקיעים מקרנף נדל״ן עובד רק בשבילכם. השאירו פרטים לשיחת היכרות ללא עלות וללא התחייבות."
        path="/lp/premium"
        noindex
      />
      <a
        href={`#${FORM_ID}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-accent-foreground"
      >
        דלג לטופס
      </a>

      {/* ── Hero: headline, the table, the form ─────────────────────── */}
      <div className="relative overflow-hidden bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))]">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-5 md:px-8 md:pt-7">
          <Link to="/" className="flex items-center gap-2.5" aria-label="קרנף נדל״ן — לדף הבית">
            <img src={logo} alt="" width={36} height={36} className="h-9 w-9 rounded-full bg-[hsl(36_33%_95%)] object-contain p-0.5" />
            <span className="text-[1.05rem] font-bold">קרנף נדל״ן</span>
          </Link>
          <a
            href={premiumLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-white/85 transition-colors hover:border-white/40 hover:text-white"
          >
            <MessageCircle size={16} aria-hidden />
            וואטסאפ
          </a>
        </header>

        <main
          id="main-content"
          className="mx-auto grid max-w-6xl gap-x-14 gap-y-8 px-5 pb-12 pt-8 md:px-8 md:pt-12 lg:grid-cols-[1fr_1fr] lg:pb-20"
        >
          <div className="max-w-xl lg:col-start-1 lg:row-start-1">
            <motion.h1
              className="text-[2.6rem] font-black leading-[0.98] tracking-[-0.02em] sm:text-[3.4rem] lg:text-[3.9rem]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              מישהו בצד שלכם של השולחן.
            </motion.h1>
            <motion.p
              className="mt-5 text-[1.08rem] leading-[1.8] text-white/75 sm:text-[1.15rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              בכל עסקת נדל״ן יושבים מולכם המוכר, היזם, המתווך והבנק — ולכל אחד מהם אינטרס. מלווה משקיעים
              מקרנף נדל״ן עובד רק בשבילכם: מהשיחה הראשונה ועד החתימה על החוזה.
            </motion.p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-8 lg:self-start lg:pt-6">
            <TableScene />
          </div>

          <section
            id={FORM_ID}
            ref={formRef}
            aria-labelledby="form-title"
            className="scroll-mt-4 rounded-[1.75rem] border border-[hsl(36_25%_86%)] bg-[hsl(36_40%_97%)] p-6 text-foreground shadow-depth-3 sm:p-8 lg:col-start-1 lg:row-start-2 lg:max-w-xl"
          >
            <h2 id="form-title" className="text-[1.6rem] font-black leading-tight text-primary sm:text-[1.8rem]">
              השאירו פרטים, ומלווה משקיעים יחזור אליכם
            </h2>
            <p className="mb-6 mt-2 leading-relaxed text-muted-foreground">
              שם וטלפון מספיקים. נתאם שיחת היכרות קצרה ונבין אם הליווי מתאים לכם.
            </p>
            <LeadForm />
          </section>
        </main>
      </div>

      {/* ── What happens next ───────────────────────────────────────── */}
      <section className="px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24" aria-labelledby="after-title">
        <div className="mx-auto max-w-5xl">
          <h2 id="after-title" className="max-w-xl text-[1.75rem] font-black leading-tight text-primary sm:text-[2.2rem]">
            מה קורה אחרי שמשאירים פרטים
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {AFTER_STEPS.map((step, i) => (
              <li key={step.title} className="relative ps-14 md:ps-0 md:pt-14">
                <span
                  className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary text-[1.05rem] font-black tabular-nums text-primary md:right-0"
                  aria-hidden
                >
                  {i + 1}
                </span>
                {i < AFTER_STEPS.length - 1 && (
                  <span
                    className="absolute right-[1.2rem] top-12 h-[calc(100%-1rem)] w-px bg-[hsl(36_20%_78%)] md:right-12 md:top-5 md:h-px md:w-[calc(100%-2rem)]"
                    aria-hidden
                  />
                )}
                <h3 className="text-[1.15rem] font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 leading-[1.8] text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 border-t border-[hsl(36_20%_84%)] pt-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <figure>
              <blockquote className="text-[1.2rem] font-medium leading-[1.75] text-foreground sm:text-[1.35rem]">
                ״היינו מפוחדים מהתהליך, אבל הליווי של קרנף הפך את הכל לפשוט ונעים. מצאו לנו דירה מושלמת באזור
                שלא חשבנו עליו, וחסכו לנו כמעט 100 אלף שקל במשא ומתן.״
              </blockquote>
              <figcaption className="mt-4 text-muted-foreground">
                <span className="font-bold text-foreground">דנה ויואב ר.</span>, זוג רוכשי דירה ראשונה, לקוחות ליווי אישי
              </figcaption>
            </figure>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-center">
              <div>
                <dt className="text-sm text-muted-foreground">{TOTAL_CLIENTS_LABEL}</dt>
                <dd className="mt-1 text-[1.9rem] font-black tabular-nums leading-none text-primary">{TOTAL_CLIENTS_STAT}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">בשוק הנדל״ן</dt>
                <dd className="mt-1 text-[1.9rem] font-black tabular-nums leading-none text-primary">מאז {ACTIVE_SINCE}</dd>
              </div>
              <div className="col-span-2">
                <dt className="sr-only">עסקאות שליווינו</dt>
                <dd className="text-[1.02rem] leading-relaxed text-foreground">
                  {DEALS_ACCOMPANIED_LABEL} שליווינו — יד שנייה, דירות מקבלן והתחדשות עירונית. בלי עמלה מיזמים ובלי
                  אינטרס בעסקה מסוימת.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────────── */}
      <section className="bg-primary px-5 py-14 text-primary-foreground md:px-8 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-[1.6rem] font-black leading-[1.2] sm:text-[2rem]">
            השולחן כבר מלא באנשים עם אינטרס. כדאי שיהיה שם גם מישהו שלכם.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <button
              type="button"
              onClick={scrollToForm}
              className="h-14 rounded-2xl bg-accent px-7 text-[1.05rem] font-black text-accent-foreground transition-colors hover:bg-[hsl(24_82%_48%)]"
            >
              לתיאום שיחת היכרות
            </button>
            <a
              href={premiumLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 font-semibold transition-colors hover:border-white/50"
            >
              <MessageCircle size={18} aria-hidden />
              כתבו לנו בוואטסאפ
            </a>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 pb-28 text-sm text-muted-foreground md:px-8 md:pb-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} קרנף נדל״ן</span>
          <nav className="flex flex-wrap items-center gap-5" aria-label="קישורים">
            <a href={`tel:${PHONE_NUMBER.replace(/-/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Phone size={14} aria-hidden />
              <span dir="ltr" className="tabular-nums">{PHONE_NUMBER}</span>
            </a>
            <Link to="/privacy" className="hover:text-foreground">
              מדיניות פרטיות
            </Link>
            <Link to="/premium" className="hover:text-foreground">
              כל הפרטים על הליווי
            </Link>
          </nav>
        </div>
      </footer>

      {/* Mobile: one bar back to the form once it has scrolled away */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 border-t border-[hsl(36_20%_84%)] bg-[hsl(36_40%_97%/0.96)] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={scrollToForm}
              className="h-[3.25rem] w-full rounded-2xl bg-accent text-[1.05rem] font-black text-accent-foreground"
            >
              תחזרו אליי לשיחת היכרות
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AccessibilityWidget />
    </div>
  );
};

export default PremiumLandingPage;
