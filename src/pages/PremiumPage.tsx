import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  Search,
  ShieldCheck,
  Handshake,
  KeyRound,
  Check,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  LineChart,
  Scale,
  Phone,
  ArrowLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHero from "@/layouts/PageHero";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { isValidIsraeliPhone, PHONE_ERROR_MESSAGE } from "@/lib/validation";
import { premiumLink } from "@/lib/whatsapp";
import { PHONE_NUMBER, WHATSAPP_BUSINESS_NUMBER, COURSE_PRICE } from "@/lib/constants";
import { testimonials } from "@/data/testimonials";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import SEOHead, {
  organizationSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/components/SEOHead";
import heroCity from "@/assets/hero-city.jpg";
import foundersImg from "@/assets/program/founders.png";
import {
  TOTAL_CLIENTS_STAT,
  TOTAL_CLIENTS_LABEL,
  YEARS_EXPERIENCE_STAT,
  YEARS_EXPERIENCE_LABEL,
} from "@/data/companyStats";

/* CRM classification for this funnel — change here if the CRM expects
   a different value for investor-guidance leads. */
const LEAD_SOURCE = "premium-investors";
const LEAD_SERVICE = "premium";

/* Premium goes straight to the human line, not the intake bot. */
const WA_LINK = premiumLink();
const TEL_LINK = `tel:+${WHATSAPP_BUSINESS_NUMBER}`;

const premiumTestimonials = testimonials.filter((t) => t.service === "premium");

/* Self-selection — who this is for, in plain words, before the form asks
   for anything. No minimum-equity number is published: the intro call is
   where fit gets decided. */
const fitFor = [
  "למי שיש הון עצמי זמין ורוצה לרכוש נכס בישראל — להשקעה או למגורים — בשנה הקרובה",
  "למי שרוצה מישהו מקצועי לצידו, לא במקומו: ההחלטות נשארות שלכם, הנתונים והליווי שלנו",
  "למי שמעדיף ליווי צמוד לאורך עסקה אמיתית על פני למידה עצמאית",
];
const notFor = [
  "למי שמחפש מישהו שיחליט במקומו או יבטיח תשואה",
  "למי שרוצה ללמוד ולעשות הכל לבד — לזה בדיוק בנינו את התוכנית הדיגיטלית",
];

/* The accompaniment journey — strategy → signature */
const journey = [
  {
    num: "01",
    icon: Compass,
    title: "אסטרטגיה אישית",
    body: "מתחילים בשיחת עומק — מגדירים יחד יעד, תקציב, אופק זמן ופרופיל סיכון. בונים תוכנית שמתאימה בדיוק לכם, לא תבנית כללית.",
  },
  {
    num: "02",
    icon: Search,
    title: "איתור וניתוח עסקאות",
    body: "סורקים את השוק עבורכם, מנתחים כל עסקה לפי נתונים — תשואה, פוטנציאל, סיכונים — ומביאים אליכם רק את ההזדמנויות ששוות את הזמן שלכם.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "בדיקת נאותות",
    body: "לפני שמתחייבים, בודקים כל פרט: מצב משפטי, תכנוני ופיננסי. בלי הפתעות אחרי החתימה — רק החלטה בעיניים פקוחות.",
  },
  {
    num: "04",
    icon: Handshake,
    title: "משא ומתן",
    body: "נכנסים למשא ומתן לצידכם, חמושים בנתונים. יודעים מתי ללחוץ ומתי לעצור — וסוגרים את העסקה בתנאים הטובים ביותר.",
  },
  {
    num: "05",
    icon: KeyRound,
    title: "ליווי עד החתימה",
    body: "מלווים אתכם יד ביד עד הרגע שבו אתם חותמים — ובטוחים לחלוטין שעשיתם את הצעד הנכון.",
  },
];

const included = [
  "אנליסט נדל״ן אישי, זמין בוואטסאפ לאורך כל הדרך",
  "ניתוח פיננסי מלא ומבוסס נתונים לכל עסקה",
  "איתור וסינון עסקאות שמתאימות לאסטרטגיה שלכם",
  "בדיקת נאותות מקצועית לפני כל התחייבות",
  "ליווי וייצוג במשא ומתן מול מוכרים ויזמים",
  "ליווי צמוד מהצעד הראשון ועד חתימת החוזה",
];

/* What makes 1:1 premium investor guidance different — honest brand
   positioning; the customers' own words follow in the testimonials section. */
const differentiators = [
  {
    icon: Users,
    title: "אחד על אחד, לא קבוצה",
    body: "אנליסט אישי שמכיר אתכם, את התקציב שלכם ואת כל עסקה שאתם שוקלים — לא מענה גנרי לכולם.",
  },
  {
    icon: LineChart,
    title: "נתונים, לא תחושות",
    body: "כל המלצה מגובה בניתוח פיננסי מסודר — תשואה, סיכון ופוטנציאל. מספרים מחליטים, לא רגש.",
  },
  {
    icon: KeyRound,
    title: "עד החתימה, לא עד ההרשמה",
    body: "אנחנו לצידכם בכל שלב — מהאסטרטגיה, דרך המו״מ, ועד הרגע שאתם חותמים על הנכס.",
  },
  {
    icon: Scale,
    title: "אינטרס אחד — שלכם",
    body: "אנחנו יושבים לצידכם בשולחן, לא מולכם. המטרה היחידה שלנו היא שתסגרו את העסקה הנכונה.",
  },
];

/** Equity brackets — ₪250K steps, as agreed with the accompaniment partner. */
const EQUITY_OPTIONS = [
  "עד 250 אלף ₪",
  "250–500 אלף ₪",
  "500–750 אלף ₪",
  "750 אלף – מיליון ₪",
  "מעל מיליון ₪",
];

const isValidEmail = (raw: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());

/**
 * Two required fields (name + phone). Email and equity bracket help the
 * analyst arrive prepared, so they are asked — but a cold visitor who
 * skips them still becomes a lead instead of a bounce.
 */
const InvestorForm = () => {
  const honeypotId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [equity, setEquity] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const thankYou = `/thank-you?src=${LEAD_SOURCE}&service=${LEAD_SERVICE}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }
    if (!isValidIsraeliPhone(phone)) {
      toast({ title: PHONE_ERROR_MESSAGE, variant: "destructive" });
      return;
    }
    if (email.trim() && !isValidEmail(email)) {
      toast({ title: "כתובת המייל לא נראית תקינה — בדקו ונסו שוב", variant: "destructive" });
      return;
    }
    if (company) {
      // Honeypot filled — bot. Pretend success, submit nothing.
      setIsSubmitted(true);
      return;
    }
    setIsSubmitting(true);
    try {
      await submitWebsiteLead({
        name,
        phone,
        email: email.trim() || undefined,
        equity: equity || undefined,
        service: LEAD_SERVICE,
        source: LEAD_SOURCE,
        message:
          "מהות הפנייה: תיאום פגישת היכרות ללא התחייבות — ליווי משקיעים פרימיום",
      });
      setIsSubmitted(true);
      navigate(thankYou);
    } catch {
      // Keep what they typed — a failed send must not wipe four fields.
      toast({ title: "שגיאה בשליחה", description: "נסו שוב או דברו איתנו בוואטסאפ.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-10 text-center"
      >
        <CheckCircle className="w-14 h-14 text-accent" />
        <p className="text-white text-xl font-bold">קיבלנו — תודה!</p>
        <p className="text-white/70">
          נחזור אליכם לתיאום פגישת היכרות — ללא התחייבות.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        autoComplete="name"
        placeholder="שם מלא"
        aria-label="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6"
      />
      <Input
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        dir="ltr"
        placeholder="טלפון לחזרה"
        aria-label="מספר טלפון לחזרה"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6"
      />
      <Input
        type="email"
        autoComplete="email"
        inputMode="email"
        dir="ltr"
        placeholder="מייל (לא חובה)"
        aria-label="כתובת מייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6"
      />
      <Select value={equity} onValueChange={setEquity}>
        <SelectTrigger
          aria-label="הון עצמי זמין להשקעה"
          dir="rtl"
          className="bg-white/95 border-white/10 text-foreground h-14 text-right rounded-full px-6"
        >
          <SelectValue placeholder="הון עצמי זמין להשקעה (לא חובה — עוזר לנו להגיע מוכנים)" />
        </SelectTrigger>
        <SelectContent>
          {EQUITY_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Honeypot — invisible to humans, catnip for bots */}
      <div className="absolute -z-10 opacity-0 pointer-events-none" aria-hidden="true">
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
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 text-lg gap-2 rounded-full shadow-[0_12px_32px_-8px_hsl(var(--accent)/0.5)]"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={18} />
            לתיאום פגישה — ללא התחייבות
          </>
        )}
      </Button>
      <p className="text-center text-sm text-white/50">
        ללא התחייבות · שיחת היכרות ראשונית חינם · חוזרים תוך 24 שעות
      </p>
    </form>
  );
};

/** The capture block — used twice: right after the problem, and at the end. */
const LeadCapture = ({ id, delay = 0 }: { id: string; delay?: number }) => (
  <SectionDark id={id} size="lg" glow="bottom">
    <div className="container mx-auto px-5 md:px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
        <Reveal delay={delay}>
          <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-5">
            הצעד הראשון
          </p>
          <h2 className="text-display-md md:text-display-lg text-white leading-[1] mb-5">
            בואו נבדוק אם הליווי{" "}
            <span className="text-accent">מתאים לכם</span>
          </h2>
          <p className="text-body-lg leading-[1.9] mb-8" style={{ color: "hsl(36 33% 95% / 0.78)" }}>
            השאירו שם וטלפון ואנליסט מהצוות יחזור אליכם לשיחת היכרות קצרה — בלי
            התחייבות. נבין יחד איפה אתם נמצאים ואיך נוכל לעזור.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white font-semibold hover:text-accent transition-colors group"
            >
              <span className="inline-flex w-11 h-11 rounded-full bg-[hsl(var(--whatsapp))] items-center justify-center text-white shrink-0">
                <MessageCircle size={20} />
              </span>
              מעדיפים וואטסאפ? דברו איתנו עכשיו
              <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>
            </a>
            <a
              href={TEL_LINK}
              className="inline-flex items-center gap-3 text-white/85 font-semibold hover:text-accent transition-colors group"
            >
              <span className="inline-flex w-11 h-11 rounded-full bg-white/10 items-center justify-center text-white shrink-0">
                <Phone size={18} />
              </span>
              <span dir="ltr" className="tabular-nums">{PHONE_NUMBER}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={delay + 0.12}>
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8">
            <InvestorForm />
          </div>
        </Reveal>
      </div>
    </div>
  </SectionDark>
);

const PremiumPage = () => {
  return (
    <>
      <SEOHead
        title="ליווי משקיעים פרימיום — יד ביד עד החתימה | קרנף נדל״ן"
        description="שירות ליווי אישי למשקיעי נדל״ן: אנליסט צמוד שמלווה אתכם מהאסטרטגיה, דרך איתור וניתוח עסקאות, בדיקת נאותות ומשא ומתן — ועד חתימה על דירה. בסטנדרט קרנף."
        path="/premium"
        keywords="ליווי משקיעים, ליווי השקעות נדל״ן, אנליסט נדל״ן אישי, ניתוח עסקאות נדל״ן, ליווי רכישת דירה להשקעה, קרנף נדל״ן"
        jsonLd={[organizationSchema, serviceSchema, breadcrumbSchema([
          { name: "דף הבית", url: "/" },
          { name: "ליווי משקיעים", url: "/premium" },
        ])]}
      />

      <PageHero
        tag="שירות פרימיום · ליווי 1:1"
        title="ליווי משקיעים"
        highlight="פרימיום"
        subtitle="יד ביד, מהאסטרטגיה ועד החתימה. אנליסט נדל״ן אישי שלוקח אתכם לעסקה הנכונה — מקצועי, מבוסס נתונים, בסטנדרט קרנף."
        badge="שיחת היכרות ראשונית — חינם"
        backgroundImage={heroCity}
        actions={
          <>
            <a href="#contact" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full transition-all w-full sm:w-auto"
              >
                לתיאום שיחת היכרות — חינם
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </Button>
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/85 hover:text-white font-semibold underline-offset-4 hover:underline min-h-[44px]"
            >
              <MessageCircle size={18} className="text-[hsl(var(--whatsapp))]" />
              או בוואטסאפ, עכשיו
            </a>
          </>
        }
      />

      {/* The problem */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg text-foreground mb-6">
              להשקיע לבד זה יקר
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground leading-[1.9] max-w-[55ch] mx-auto">
              עסקה שנראית מצוינת — ומסתתרת בה בעיה. מחיר שנראה הוגן — ובעצם משלמים
              עשרות אלפי שקלים מיותרים. הזדמנות אמיתית שחולפת כי לא ידעתם לזהות
              אותה בזמן. רוב המשקיעים מקבלים את ההחלטה הגדולה בחייהם — לבד.
              <span className="block mt-4 text-foreground font-semibold">
                זה בדיוק מה שאנחנו כאן כדי לשנות.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* The door — right after the problem, not seven sections later */}
      <LeadCapture id="contact" />

      {/* What it is + the journey */}
      <SectionDark size="lg" glow="top-end">
        <div className="container mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <Reveal>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-5">
                מה זה ליווי משקיעים פרימיום
              </p>
              <h2 className="text-display-md md:text-display-lg text-white leading-[1]">
                לא קורס. לא ייעוץ כללי.{" "}
                <span className="text-accent">אנליסט אישי לצידכם.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-body-lg mt-6 leading-[1.9]" style={{ color: "hsl(36 33% 95% / 0.78)" }}>
                ליווי משקיעים פרימיום הוא שירות אישי וצמוד: אנליסט נדל״ן בכיר
                שלוקח אתכם יד ביד לאורך כל המסע — מהרגע שמגדירים אסטרטגיה ועד
                שאתם חותמים על הנכס הנכון. כל החלטה מגובה בנתונים, וכל צעד נעשה
                יחד. זה הסטנדרט של קרנף.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4 max-w-5xl">
            {journey.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.06}>
                <article
                  className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 p-6 lg:p-7 rounded-2xl"
                  style={{
                    backgroundColor: "hsl(36 33% 95% / 0.04)",
                    border: "1px solid hsl(36 33% 95% / 0.10)",
                  }}
                >
                  <div className="flex items-center gap-5 sm:w-56 sm:flex-shrink-0">
                    <span className="font-mono text-display-sm text-accent leading-none">
                      {step.num}
                    </span>
                    <span className="inline-flex w-12 h-12 rounded-full bg-accent/10 border border-accent/20 items-center justify-center text-accent">
                      <step.icon size={22} />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5 tracking-[-0.015em]">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsl(36 33% 95% / 0.72)" }}>
                      {step.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionDark>

      {/* What's included */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg text-foreground mb-10 lg:mb-14 text-center">
              מה כולל הליווי
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl mx-auto">
            {included.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border/50 shadow-depth-1 h-full">
                  <span className="inline-flex w-8 h-8 rounded-full bg-accent/10 items-center justify-center text-accent shrink-0 mt-0.5">
                    <Check size={18} />
                  </span>
                  <span className="text-foreground leading-relaxed font-medium">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Karnaf standard — what makes premium 1:1 guidance different */}
      <section className="py-section-lg bg-secondary/40">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <Reveal>
            <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-4 text-center">
              הסטנדרט של קרנף
            </p>
            <h2 className="text-display-md md:text-display-lg text-foreground mb-10 lg:mb-14 text-center">
              למה ליווי פרימיום עובד
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <article className="h-full flex flex-col bg-card rounded-2xl shadow-depth-2 border border-border/40 p-6 lg:p-8">
                  <span className="inline-flex w-12 h-12 rounded-full bg-accent/10 border border-accent/20 items-center justify-center text-accent mb-5">
                    <d.icon size={22} />
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug tracking-[-0.015em]">
                    {d.title}
                  </h3>
                  <p className="text-muted-foreground leading-[1.85]">{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-14 text-center">
              {[
                { v: TOTAL_CLIENTS_STAT, l: TOTAL_CLIENTS_LABEL },
                { v: YEARS_EXPERIENCE_STAT, l: YEARS_EXPERIENCE_LABEL },
                { v: "1:1", l: "ליווי אישי" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-display-sm md:text-display-md text-foreground tabular-nums leading-none mb-1">
                    {s.v}
                  </div>
                  <div className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proof — the customers' own words, accompaniment outcomes only */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg text-foreground mb-4 text-center">
              הם הגיעו לבד. יצאו עם דירה.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-body-lg text-muted-foreground mb-10 leading-relaxed text-center max-w-xl mx-auto">
              לקוחות הליווי האישי, במילים שלהם.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumTestimonials.map((t, i) => (
              <TestimonialVideoCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Fit + price — the two questions a cold visitor asks before a form */}
      <section className="py-section-lg bg-card border-y border-border">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <h2 className="text-display-sm md:text-display-md text-foreground mb-6">
                למי הליווי מתאים
              </h2>
              <ul className="space-y-4 mb-8">
                {fitFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <span className="inline-flex w-7 h-7 rounded-full bg-accent/10 items-center justify-center text-accent shrink-0 mt-0.5">
                      <Check size={16} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-3">
                ולמי לא
              </p>
              <ul className="space-y-3">
                {notFor.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                    <span className="inline-flex w-7 h-7 rounded-full bg-muted items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                      <X size={14} />
                    </span>
                    <span>
                      {item}
                      {i === 1 && (
                        <>
                          {" "}
                          <Link to="/course" className="font-semibold text-primary underline-offset-4 hover:underline">
                            (₪{COURSE_PRICE.toLocaleString("he-IL")}, גישה מיידית)
                          </Link>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-border bg-background p-7 md:p-9 shadow-depth-2">
                <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-4">
                  כמה זה עולה
                </p>
                <p className="text-display-sm md:text-display-md text-foreground leading-tight mb-3">
                  2.5%–3% משווי העסקה
                </p>
                <p className="text-muted-foreground leading-[1.85] mb-6">
                  בעסקה של 2 מיליון ₪ — כ-50,000 ₪ ומעלה. הטווח המקובל בשוק לליווי
                  אישי מלא, וזה גם המחיר שלנו: אין עמלות מיזמים ואין אינטרס בעסקה
                  מסוימת — רק בעסקה הנכונה לכם.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  מבנה התשלום המדויק ומה בדיוק כלול — בשיחת ההיכרות, לפני כל התחייבות.
                </p>
                <a href="#contact" className="inline-block w-full">
                  <Button className="group w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full py-6 text-base gap-2">
                    לתיאום שיחת היכרות — חינם
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founders' note — authentic, first-person, eye-level */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-center">
            <Reveal className="flex justify-center md:justify-start">
              <div className="w-52 md:w-56 aspect-square rounded-3xl bg-secondary/60 border border-border overflow-hidden flex items-end justify-center shadow-depth-2 shrink-0">
                <img
                  src={foundersImg}
                  alt="איתמר נחליאל ואלמוג חכמה — מייסדי קרנף נדל״ן"
                  className="w-[88%] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-5">
                למה אנחנו עושים את זה
              </p>
              <div className="space-y-4 text-body-lg text-foreground/85 leading-[1.9]">
                <p>
                  ראינו יותר מדי אנשים טובים נכנסים לעסקה הכי גדולה בחיים שלהם —
                  לבד. סומכים על מתווך שמייצג את המוכר, על תחושת בטן, על ייעוץ
                  כללי מהאינטרנט. ומשלמים על זה ביוקר.
                </p>
                <p>
                  בשביל זה בנינו את ליווי המשקיעים: שיהיה לכם אנליסט אחד, אישי,
                  שמכיר אתכם ואת המספרים שלכם — ושנמצא איתכם מהשיחה הראשונה ועד
                  שאתם חותמים. בלי למכור לכם עסקה, בלי לחץ. רק להביא אתכם להחלטה
                  הנכונה, בעיניים פקוחות.
                </p>
                <p className="text-foreground font-semibold">
                  זה לא שירות לכולם, וזה בסדר. אבל אם אתם רוצים מישהו מקצועי
                  שבאמת בצד שלכם — אנחנו כאן.
                </p>
              </div>
              <p className="mt-6 text-foreground font-bold text-lg">
                — איתמר ואלמוג, קרנף נדל״ן
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The door again — for the reader who needed the whole story first */}
      <LeadCapture id="contact-end" />
    </>
  );
};

export default PremiumPage;
