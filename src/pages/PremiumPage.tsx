import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHero from "@/layouts/PageHero";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import SEOHead, {
  organizationSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/components/SEOHead";
import heroCity from "@/assets/hero-city.jpg";
import foundersImg from "@/assets/program/founders.png";

/* CRM classification for this funnel — change here if the CRM expects
   a different value for investor-guidance leads. */
const LEAD_SOURCE = "premium-investors";
const LEAD_SERVICE = "premium";

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "היי! אני מעוניין/ת בליווי משקיעים פרימיום של קרנף"
)}`;

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
   positioning, not customer quotes. Real investor testimonials will be
   added here once provided. */
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

const InvestorForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [equity, setEquity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitWebsiteLead({
        name,
        phone,
        equity: equity || undefined,
        service: LEAD_SERVICE,
        source: LEAD_SOURCE,
        message: "פנייה מעמוד ליווי משקיעים פרימיום",
      });
      setIsSubmitted(true);
      toast({ title: "הפרטים נשלחו!", description: "אנליסט מהצוות יחזור אליכם בהקדם." });
    } catch {
      toast({ title: "שגיאה בשליחה", description: "נסו שוב או דברו איתנו בוואטסאפ.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
    setTimeout(() => {
      setName("");
      setPhone("");
      setEquity("");
      setIsSubmitted(false);
    }, 3500);
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
        <p className="text-white/70">אנליסט מהצוות יחזור אליכם בהקדם.</p>
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
        placeholder="טלפון"
        aria-label="מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6"
      />
      <Select value={equity} onValueChange={setEquity}>
        <SelectTrigger
          aria-label="הון עצמי זמין להשקעה"
          dir="rtl"
          className="bg-white/95 border-white/10 text-foreground h-14 text-right rounded-full px-6"
        >
          <SelectValue placeholder="הון עצמי זמין להשקעה (אופציונלי)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="עד 250 אלף">עד 250 אלף ₪</SelectItem>
          <SelectItem value="250-500 אלף">250–500 אלף ₪</SelectItem>
          <SelectItem value="500 אלף - מיליון">500 אלף – מיליון ₪</SelectItem>
          <SelectItem value="מעל מיליון">מעל מיליון ₪</SelectItem>
        </SelectContent>
      </Select>
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
            דברו איתי על ליווי
          </>
        )}
      </Button>
      <p className="text-center text-sm text-white/50">
        ללא התחייבות · שיחת היכרות ראשונית חינם
      </p>
    </form>
  );
};

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
      />

      {/* The problem */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-6">
              להשקיע לבד <span className="text-accent">זה יקר</span>
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

      {/* What it is + the journey */}
      <SectionDark size="lg" glow="top-end">
        <div className="container mx-auto px-5 md:px-6">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <Reveal>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-5">
                מה זה ליווי משקיעים פרימיום
              </p>
              <h2 className="text-display-md md:text-display-lg font-black text-white leading-[1] tracking-tight">
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
                    <span className="font-mono text-display-sm font-black text-accent leading-none">
                      {step.num}
                    </span>
                    <span className="inline-flex w-12 h-12 rounded-full bg-accent/10 border border-accent/20 items-center justify-center text-accent">
                      <step.icon size={22} />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5">
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
            <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-10 lg:mb-14 text-center">
              מה כולל <span className="text-accent">הליווי</span>
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
            <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-10 lg:mb-14 text-center">
              למה ליווי פרימיום <span className="text-accent">עובד</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <article className="h-full flex flex-col bg-card rounded-2xl shadow-depth-2 border border-border/40 p-6 lg:p-8">
                  <span className="inline-flex w-12 h-12 rounded-full bg-accent/10 border border-accent/20 items-center justify-center text-accent mb-5">
                    <d.icon size={22} />
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug">
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
                { v: "375+", l: "לקוחות מלווים" },
                { v: "8+", l: "שנות ניסיון" },
                { v: "1:1", l: "ליווי אישי" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-display-sm md:text-display-md font-black text-foreground tabular-nums leading-none mb-1">
                    {s.v}
                  </div>
                  <div className="text-eyebrow uppercase tracking-[0.16em] text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
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

      {/* Lead capture */}
      <SectionDark id="contact" size="lg" glow="bottom">
        <div className="container mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
            <Reveal>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-5">
                הצעד הראשון
              </p>
              <h2 className="text-display-md md:text-display-lg font-black text-white leading-[1] tracking-tight mb-5">
                בואו נבדוק אם הליווי{" "}
                <span className="text-accent">מתאים לכם</span>
              </h2>
              <p className="text-body-lg leading-[1.9] mb-8" style={{ color: "hsl(36 33% 95% / 0.78)" }}>
                השאירו פרטים ואנליסט מהצוות יחזור אליכם לשיחת היכרות קצרה — בלי
                התחייבות. נבין יחד איפה אתם נמצאים ואיך נוכל לעזור.
              </p>
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
            </Reveal>

            <Reveal delay={0.12}>
              <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8">
                <InvestorForm />
              </div>
            </Reveal>
          </div>
        </div>
      </SectionDark>
    </>
  );
};

export default PremiumPage;
