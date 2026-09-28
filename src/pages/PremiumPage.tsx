import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CheckCircle, MessageCircle, Phone, Quote, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHero from "@/layouts/PageHero";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { ExpandOnScroll, SplitReveal } from "@/components/v2/scroll";
import { Kicker } from "@/components/service/Kicker";
import { StepRail, type RailStep } from "@/components/service/StepRail";
import DealRead from "@/components/premium/DealRead";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { isValidIsraeliPhone, PHONE_ERROR_MESSAGE } from "@/lib/validation";
import { premiumLink } from "@/lib/whatsapp";
import { PHONE_NUMBER, WHATSAPP_BUSINESS_NUMBER } from "@/lib/constants";
import { testimonials, type Testimonial } from "@/data/testimonials";
import SEOHead, { organizationSchema, serviceSchema, breadcrumbSchema } from "@/components/SEOHead";
import heroCity from "@/assets/hero-city.jpg";
import foundersImg from "@/assets/team/itamar-almog-about.webp";

/* CRM classification for this funnel — change here if the CRM expects
   a different value for investor-guidance leads. */
const LEAD_SOURCE = "premium-investors";
const LEAD_SERVICE = "premium";

/* Every WhatsApp link on /premium opens the business line with the 1:1 opener. */
const WA_LINK = premiumLink();
const TEL_LINK = `tel:+${WHATSAPP_BUSINESS_NUMBER}`;

/* Accompaniment clients only — the ₪950 course never appears in this funnel. */
const premiumTestimonials = testimonials.filter((t) => t.service === "premium");
/* Lead with the story that carries a concrete number. */
const featuredStory =
  premiumTestimonials.find((t) => /\d/.test(t.metric ?? "")) ??
  premiumTestimonials.find((t) => t.metric) ??
  premiumTestimonials[0];
const otherStories = premiumTestimonials.filter((t) => t !== featuredStory);

/* Who else is at the table, and what each of them is paid to want. */
const table = [
  { who: "המוכר", wants: "רוצה את המחיר הגבוה ביותר" },
  { who: "היזם", wants: "רוצה למכור במחיר המחירון" },
  { who: "המתווך", wants: "רוצה שהעסקה תיסגר" },
  { who: "הבנק", wants: "רוצה למכור לכם משכנתא" },
];

/* The 2026 buyer's market, qualitatively (sources: research brief, Sep 2026).
   No figures here on purpose — only what holds without a date stamp. */
const marketTraps = [
  {
    num: "01",
    title: "מבצעי מימון שמסתירים את המחיר",
    body: "20/80, 10/90, הלוואות קבלן. מחיר המחירון נשאר במקום, וההנחה מתחבאת במימון. השאלה היא כמה הדירה שווה בלי המבצע.",
  },
  {
    num: "02",
    title: "מסירה רחוקה, הצמדה ואיחורים",
    body: "דירה על הנייר נמסרת לרוב בעוד שנתיים ויותר. כל סעיף הצמדה וכל חודש איחור הם כסף — וקוראים אותם לפני שחותמים.",
  },
  {
    num: "03",
    title: "שוק אחד, מחירים שונים",
    body: "המחירים התקררו, אבל לא בכל מקום באותה מידה. ממוצע ארצי לא יגיד לכם כמה שווה דירה ברחוב מסוים.",
  },
  {
    num: "04",
    title: "לקנות עכשיו או לחכות?",
    body: "הריבית התחילה לרדת, שכר הדירה ממשיך לעלות. אין תשובה כללית — יש תשובה למספרים שלכם.",
  },
];

/* The accompaniment journey — strategy → signature. What happens, and what
   the client walks away with from each step. */
const journey: RailStep[] = [
  {
    num: "01",
    title: "אסטרטגיה אישית",
    body: "שיחת עומק על היעד, התקציב, אופק הזמן ופרופיל הסיכון. מגורים או השקעה, דירה יד שנייה או על הנייר — מחליטים לפני שמחפשים.",
    outcome: "הגדרה ברורה של מה מחפשים, איפה, ועד איזה מחיר",
  },
  {
    num: "02",
    title: "איתור וניתוח עסקאות",
    body: "סורקים את השוק בשבילכם ומנתחים כל עסקה לפי נתונים — מחיר מול עסקאות אמת, תשואה, פוטנציאל וסיכון. מגיעות אליכם רק עסקאות ששוות את הזמן שלכם.",
    outcome: "ניתוח פיננסי לכל עסקה שעל השולחן",
  },
  {
    num: "03",
    title: "בדיקת נאותות",
    body: "לפני שמתחייבים בודקים את המצב המשפטי, התכנוני והפיננסי — כולל מבצעי מימון, הצמדה ומועדי מסירה בעסקאות מקבלן.",
    outcome: "החלטה בעיניים פקוחות, בלי הפתעות אחרי החתימה",
  },
  {
    num: "04",
    title: "משא ומתן",
    body: "נכנסים למשא ומתן לצדכם, מול מוכרים ויזמים, עם הנתונים ביד. יודעים מתי ללחוץ ומתי לעצור.",
    outcome: "הצעה שנשענת על מספרים, לא על תחושה",
  },
  {
    num: "05",
    title: "ליווי עד החתימה",
    body: "מלווים אתכם יד ביד עד הרגע שבו אתם חותמים על החוזה — ובטוחים שעשיתם את הצעד הנכון.",
    outcome: "אנליסט זמין בוואטסאפ לאורך כל הדרך",
  },
];

/* Self-selection — who this is for, before the form asks for anything. No
   minimum-equity number is published: the intro call is where fit gets decided. */
const fitFor = [
  "יש לכם הון עצמי זמין ואתם רוצים לרכוש נכס בישראל — להשקעה או למגורים — בשנה הקרובה",
  "אתם רוצים מישהו מקצועי לצדכם, לא במקומכם: ההחלטות נשארות שלכם, הנתונים והליווי שלנו",
  "אתם מעדיפים ליווי צמוד לאורך עסקה אמיתית על פני ללמוד הכל בעצמכם",
];
const notFor = [
  "מחפשים מישהו שיחליט במקומכם או יבטיח תשואה",
  "רוצים ״דיל חם״ בלי לבדוק אותו — אנחנו נבדוק, וגם נגיד כשלא כדאי",
];

/** Equity brackets — ₪250K steps, as agreed with the accompaniment partner. */
const EQUITY_OPTIONS = [
  "עד 250 אלף ₪",
  "250–500 אלף ₪",
  "500–750 אלף ₪",
  "750 אלף – מיליון ₪",
  "מעל מיליון ₪",
];

const isValidEmail = (raw: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());

const fieldClass =
  "bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6";

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
        message: "מהות הפנייה: תיאום פגישת היכרות ללא התחייבות — ליווי משקיעים פרימיום",
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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-10 text-center"
        role="status"
      >
        <CheckCircle className="w-14 h-14 text-accent" aria-hidden />
        <p className="text-white text-xl font-bold">קיבלנו — תודה!</p>
        <p className="text-white/70">נחזור אליכם לתיאום שיחת היכרות — ללא התחייבות.</p>
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
        className={fieldClass}
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
        className={fieldClass}
      />
      <Input
        type="email"
        autoComplete="email"
        inputMode="email"
        dir="ltr"
        placeholder="מייל (לא חובה)"
        aria-label="כתובת מייל (לא חובה)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={fieldClass}
      />
      <Select value={equity} onValueChange={setEquity}>
        <SelectTrigger
          aria-label="הון עצמי זמין להשקעה (לא חובה)"
          dir="rtl"
          className="bg-white/95 border-white/10 text-foreground h-14 text-right rounded-full px-6"
        >
          <SelectValue placeholder="הון עצמי זמין (לא חובה)" />
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
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 text-lg gap-2 rounded-full"
      >
        {isSubmitting ? (
          <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" aria-label="שולח" />
        ) : (
          <>
            <Send size={18} aria-hidden />
            לתיאום שיחת היכרות
          </>
        )}
      </Button>
      <p className="text-center text-sm text-white/60 leading-relaxed">
        ללא עלות וללא התחייבות · חוזרים תוך 24 שעות
        <br />
        ההון העצמי עוזר לאנליסט להגיע לשיחה מוכן.
      </p>
    </form>
  );
};

/** The capture block — once right after the market read, once at the close. */
const LeadCapture = ({
  id,
  kicker,
  title,
  accent,
  body,
}: {
  id: string;
  kicker: string;
  title: string;
  accent: string[];
  body: string;
}) => (
  <SectionDark id={id} size="lg" glow="bottom">
    <div className="container mx-auto px-5 md:px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
        <div>
          <Reveal>
            <Kicker dark className="mb-5">
              {kicker}
            </Kicker>
          </Reveal>
          <SplitReveal
            text={title}
            highlight={accent}
            className="text-display-md md:text-display-lg text-white leading-[1.02] mb-5"
          />
          <Reveal delay={0.08}>
            <p className="text-body-lg leading-[1.9] mb-8" style={{ color: "hsl(36 33% 95% / 0.78)" }}>
              {body}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white font-semibold hover:text-accent transition-colors group min-h-[44px]"
              >
                <span className="inline-flex w-11 h-11 rounded-full bg-[hsl(var(--whatsapp-deep))] items-center justify-center text-white shrink-0">
                  <MessageCircle size={20} aria-hidden />
                </span>
                מעדיפים וואטסאפ? כתבו לנו עכשיו
                <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href={TEL_LINK}
                className="inline-flex items-center gap-3 text-white/85 font-semibold hover:text-accent transition-colors min-h-[44px]"
              >
                <span className="inline-flex w-11 h-11 rounded-full bg-white/10 items-center justify-center text-white shrink-0">
                  <Phone size={18} aria-hidden />
                </span>
                <span dir="ltr" className="tabular-nums">
                  {PHONE_NUMBER}
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8">
            <InvestorForm />
          </div>
        </Reveal>
      </div>
    </div>
  </SectionDark>
);

/** Track label on every story — accompaniment results are never read as course results. */
const TrackTag = ({ dark = false }: { dark?: boolean }) => (
  <span
    className={`inline-block text-eyebrow uppercase tracking-[0.16em] border rounded-full px-3 py-1 ${
      dark ? "border-white/20 text-white/70" : "border-border text-muted-foreground"
    }`}
  >
    ליווי אישי 1:1
  </span>
);

const StoryCard = ({ t }: { t: Testimonial }) => (
  <figure className="h-full flex flex-col bg-card border border-border rounded-2xl p-6 md:p-7 shadow-depth-1">
    <div className="flex items-center justify-between gap-3 mb-4">
      <TrackTag />
      {t.metric && (
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/10 text-primary whitespace-nowrap">
          {t.metric}
        </span>
      )}
    </div>
    <blockquote className="text-foreground leading-[1.8] flex-1">״{t.quote}״</blockquote>
    <figcaption className="mt-5 pt-4 border-t border-border">
      <span className="font-bold text-foreground block">{t.name}</span>
      <span className="text-sm text-muted-foreground">{t.role}</span>
    </figcaption>
  </figure>
);

const PremiumPage = () => {
  return (
    <>
      <SEOHead
        title="ליווי משקיעים 1:1 — אנליסט בצד שלכם עד החתימה | קרנף נדל״ן"
        description="ליווי אישי לרכישת נכס להשקעה או למגורים: אסטרטגיה, איתור וניתוח עסקאות, בדיקת נאותות — כולל מבצעי 20/80, הצמדה ומועדי מסירה — משא ומתן וליווי עד החתימה. שיחת היכרות ללא עלות."
        path="/premium"
        keywords="ליווי משקיעים, ליווי השקעות נדל״ן, אנליסט נדל״ן אישי, ניתוח עסקאות נדל״ן, ליווי רכישת דירה להשקעה, מבצע 20/80, קרנף נדל״ן"
        jsonLd={[
          organizationSchema,
          serviceSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "ליווי משקיעים", url: "/premium" },
          ]),
        ]}
      />

      <PageHero
        tag="ליווי משקיעים 1:1"
        title="מישהו בצד שלכם של השולחן."
        accentWords={["בצד", "שלכם"]}
        splitTitle
        subtitle="המוכר, היזם, המתווך והבנק — לכל אחד מהם יש אינטרס בעסקה. בליווי האישי, אנליסט נדל״ן מהצוות שלנו עובד רק בשבילכם: מניתוח העסקה, דרך המשא ומתן, ועד החתימה על החוזה."
        backgroundImage={heroCity}
        actions={
          <>
            <a href="#contact" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full transition-colors w-full sm:w-auto shadow-glow-accent"
              >
                לתיאום שיחת היכרות
                <ArrowLeft size={18} aria-hidden className="transition-transform group-hover:-translate-x-1" />
              </Button>
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-white/85 hover:text-white font-semibold underline-offset-4 hover:underline min-h-[44px]"
            >
              <MessageCircle size={18} aria-hidden className="text-[hsl(var(--whatsapp))]" />
              או בוואטסאפ, עכשיו
            </a>
          </>
        }
        footnote="שיחת היכרות ללא עלות וללא התחייבות · חוזרים תוך 24 שעות"
        aside={
          <div className="hidden lg:block rounded-3xl border border-white/15 bg-[hsl(217_50%_8%/0.88)] p-7 shadow-depth-4">
            <p className="text-eyebrow uppercase tracking-[0.24em] text-white/60 mb-5">מי יושב סביב השולחן</p>
            <ul className="space-y-3 mb-5">
              {table.map((row) => (
                <li
                  key={row.who}
                  className="flex items-baseline justify-between gap-4 pb-3 border-b border-white/10"
                >
                  <span className="font-bold text-white">{row.who}</span>
                  <span className="text-sm text-white/65">{row.wants}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-accent text-accent-foreground p-4">
              <p className="font-black text-lg leading-tight">אנחנו — בצד שלכם.</p>
              <p className="text-sm font-medium mt-1">בלי עמלה מיזם ובלי אינטרס בעסקה מסוימת.</p>
            </div>
          </div>
        }
      />

      {/* The 2026 market — why going alone costs more this year */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <Reveal>
              <Kicker className="mb-5">השוק של 2026</Kicker>
            </Reveal>
            <SplitReveal
              text="הכוח עבר לקונים. רק צריך לדעת להשתמש בו."
              highlight={["לקונים."]}
              className="text-display-md md:text-display-lg text-foreground leading-[1.02] mb-6"
            />
            <Reveal delay={0.08}>
              <p className="text-body-lg text-muted-foreground leading-[1.9] max-w-[60ch]">
                הרבה דירות חדשות מחכות לקונים והמחירים התקררו — על הנייר, זה שוק של
                קונים. בפועל, היתרון הולך למי שיודע לקרוא עסקה. אלה המקומות שבהם הוא
                הולך לאיבוד:
              </p>
            </Reveal>
          </div>

          <ol className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20">
            {marketTraps.map((trap, i) => (
              <li key={trap.num}>
                <Reveal
                  delay={(i % 2) * 0.08}
                  className="h-full border-t border-primary/15 pt-6 pb-10 grid grid-cols-[3rem_minmax(0,1fr)] gap-4"
                >
                  <span className="font-mono text-sm font-bold text-[hsl(var(--accent-deep))] tabular-nums pt-1">
                    {trap.num}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug tracking-[-0.015em]">
                      {trap.title}
                    </h3>
                    <p className="text-muted-foreground leading-[1.85]">{trap.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The door — right after the problem, not seven sections later */}
      <LeadCapture
        id="contact"
        kicker="הצעד הראשון"
        title="בואו נבדוק אם הליווי מתאים לכם."
        accent={["מתאים", "לכם."]}
        body="השאירו שם וטלפון, ואנליסט מהצוות יחזור אליכם לשיחת היכרות קצרה. נבין איפה אתם עומדים — הון עצמי, יעד, לוח זמנים — ונגיד לכם בכנות אם ואיך נוכל לעזור."
      />

      {/* Show, don't tell — one illustrative deal, read the way the analyst reads it */}
      <DealRead />

      {/* The journey — a rail that fills as you read it */}
      <SectionDark size="lg" glow="top-end">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <Reveal>
              <Kicker dark className="mb-5">
                איך זה עובד
              </Kicker>
            </Reveal>
            <SplitReveal
              text="מהשיחה הראשונה ועד החתימה."
              highlight={["החתימה."]}
              className="text-display-md md:text-display-lg text-white leading-[1.02] mb-6"
            />
            <Reveal delay={0.08}>
              <p className="text-body-lg leading-[1.9]" style={{ color: "hsl(36 33% 95% / 0.78)" }}>
                לא קורס ולא ייעוץ כללי: אנליסט אחד שמכיר אתכם ואת המספרים שלכם,
                ועובר איתכם עסקה אמיתית — שלב אחרי שלב.
              </p>
            </Reveal>
          </div>
          <StepRail steps={journey} dark />
        </div>
      </SectionDark>

      {/* Proof — the customers' own words, accompaniment outcomes only */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="max-w-3xl mb-10 lg:mb-14">
            <Reveal>
              <Kicker className="mb-5">לקוחות הליווי, במילים שלהם</Kicker>
            </Reveal>
            <SplitReveal
              text="הם הגיעו לבד. יצאו עם דירה."
              highlight={["עם", "דירה."]}
              className="text-display-md md:text-display-lg text-foreground leading-[1.02]"
            />
          </div>

          {featuredStory && (
            <Reveal>
              <figure className="relative overflow-hidden rounded-3xl bg-[hsl(var(--ink))] text-white p-7 md:p-12 mb-6 grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] gap-6 md:gap-12 shadow-depth-3">
                <div className="flex flex-col">
                  <TrackTag dark />
                  {featuredStory.metric && (
                    <p className="text-accent font-black text-3xl md:text-5xl tabular-nums leading-[1.05] tracking-[-0.02em] mt-6">
                      {featuredStory.metric}
                    </p>
                  )}
                  <figcaption className="mt-auto pt-6 md:pt-10 border-t border-white/15">
                    <span className="font-bold block">{featuredStory.name}</span>
                    <span className="text-sm text-white/65">{featuredStory.role}</span>
                  </figcaption>
                </div>
                <blockquote className="text-lg md:text-2xl leading-[1.7] md:leading-[1.6] font-medium self-center">
                  <Quote size={22} className="text-white/30 mb-3" aria-hidden />
                  {featuredStory.quote}
                </blockquote>
              </figure>
            </Reveal>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {otherStories.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="h-full">
                <StoryCard t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fit + price — the two questions a cold visitor asks before a form */}
      <section className="py-section-lg bg-card border-y border-border">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            <Reveal>
              <Kicker className="mb-5">לפני שממלאים טופס</Kicker>
              <h2 className="text-display-sm md:text-display-md text-foreground mb-6">למי הליווי מתאים</h2>
              <ul className="space-y-4 mb-9">
                {fitFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <span className="inline-flex w-7 h-7 rounded-full bg-accent/15 items-center justify-center text-primary shrink-0 mt-0.5">
                      <Check size={16} aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-3">ולמי לא</p>
              <ul className="space-y-3">
                {notFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                    <span className="inline-flex w-7 h-7 rounded-full bg-muted items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                      <X size={14} aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full flex flex-col rounded-3xl border border-border bg-background p-7 md:p-9 shadow-depth-2">
                <Kicker className="mb-4">כמה זה עולה</Kicker>
                <p className="text-display-md text-foreground leading-tight mb-2">
                  <span dir="ltr" className="tabular-nums">2.5%–3%</span> משווי העסקה
                </p>
                <p className="text-muted-foreground leading-[1.85] mb-5">
                  הטווח המקובל בשוק לליווי אישי מלא — וזה גם המחיר שלנו. אין עמלות
                  מיזמים ואין אינטרס בעסקה מסוימת, רק בעסקה הנכונה לכם.
                </p>
                <div className="rounded-2xl bg-secondary/70 px-5 py-4 mb-6">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">דוגמה להמחשה</p>
                  <p className="text-foreground">
                    בעסקה של{" "}
                    <span dir="ltr" className="tabular-nums font-bold">
                      ₪2,000,000
                    </span>{" "}
                    — בין{" "}
                    <span dir="ltr" className="tabular-nums font-bold">
                      ₪50,000
                    </span>{" "}
                    ל-
                    <span dir="ltr" className="tabular-nums font-bold">
                      ₪60,000
                    </span>
                    .
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  מבנה התשלום המדויק ומה בדיוק כלול — בשיחת ההיכרות, לפני כל התחייבות.
                </p>
                <a href="#contact-end" className="inline-block w-full mt-auto">
                  <Button className="group w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full h-14 text-base gap-2">
                    לתיאום שיחת היכרות
                    <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
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
              <div className="w-56 md:w-64 aspect-[4/5] rounded-3xl bg-card border border-border overflow-hidden flex items-end justify-center shadow-depth-2 shrink-0">
                <img
                  src={foundersImg}
                  alt="איתמר נחליאל ואלמוג חכמה — מייסדי קרנף נדל״ן"
                  className="w-full h-full object-cover scale-[1.3] origin-[50%_70%]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Kicker className="mb-5">למה אנחנו עושים את זה</Kicker>
              <div className="space-y-4 text-body-lg text-foreground/85 leading-[1.9]">
                <p>
                  ראינו יותר מדי אנשים טובים נכנסים לעסקה הכי גדולה בחיים שלהם — לבד.
                  סומכים על תחושת בטן, על מודעה יפה, על ייעוץ כללי מהאינטרנט. ומשלמים
                  על זה ביוקר.
                </p>
                <p>
                  בשביל זה בנינו את הליווי האישי: אנליסט אחד שמכיר אתכם ואת המספרים
                  שלכם, ונמצא איתכם מהשיחה הראשונה ועד החתימה. בלי למכור לכם עסקה,
                  בלי לחץ — רק להביא אתכם להחלטה הנכונה, בעיניים פקוחות.
                </p>
                <p className="text-foreground font-semibold">
                  זה לא שירות לכולם, וזה בסדר. אבל אם אתם רוצים מישהו מקצועי שבאמת
                  בצד שלכם — אנחנו כאן.
                </p>
              </div>
              <p className="mt-6 text-foreground font-bold text-lg">— איתמר ואלמוג, קרנף נדל״ן</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The door again — it opens to full width as it rises */}
      <div className="bg-background">
        <ExpandOnScroll inset={3} radius={32}>
          <LeadCapture
            id="contact-end"
            kicker="שיחת היכרות"
            title="העסקה הבאה — עם מישהו בצד שלכם."
            accent={["בצד", "שלכם."]}
            body="שיחה קצרה, בלי עלות ובלי התחייבות. תספרו לנו מה אתם מחפשים — ונגיד לכם ישר אם הליווי נכון לכם עכשיו, ומה הצעד הבא."
          />
        </ExpandOnScroll>
      </div>
    </>
  );
};

export default PremiumPage;
