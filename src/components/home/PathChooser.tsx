import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Check,
  ArrowLeft,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/v2/Reveal";
import { COURSE_PRICE, COURSE_PRICE_ORIGINAL } from "@/lib/constants";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { isValidIsraeliPhone } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

/**
 * The homepage's decision point — two doors, zero ambiguity.
 * Door A: the self-serve digital course (buy now, learn alone).
 * Door B: premium 1:1 investor guidance (free intro call, guided to a keys-in-hand deal).
 * Below: a slim "coming soon" waitlist strip for the research subscription.
 */

const courseBullets = [
  "50+ שיעורים — גישה מיידית לכולם",
  "מחשבונים, כלים ואנליסט AI",
  "12 חודשי גישה — לגמרי בקצב שלכם",
];

const premiumBullets = [
  "אנליסט אישי צמוד — אחד על אחד",
  "מהאסטרטגיה ועד חתימת החוזה",
  "שיחת היכרות ראשונית — חינם",
];

const ResearchWaitlist = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }
    if (!isValidIsraeliPhone(phone)) {
      toast({ title: "מספר הטלפון לא תקין", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitWebsiteLead({
        name,
        phone,
        service: "waitlist",
        source: "research-waitlist",
        message: "הרשמה לרשימת המתנה — מערכת המחקר במנוי חודשי",
      });
      setIsSubmitted(true);
    } catch {
      toast({
        title: "שגיאה בשליחה",
        description: "נסו שוב או דברו איתנו בוואטסאפ.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <CheckCircle size={18} className="text-accent shrink-0" />
        נרשמתם! נעדכן אתכם ברגע שהמערכת עולה לאוויר.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
    >
      <Input
        autoComplete="name"
        placeholder="שם"
        aria-label="שם"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="h-11 rounded-full px-5 bg-background sm:w-36"
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
        className="h-11 rounded-full px-5 bg-background sm:w-40 text-right"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="outline"
        className="h-11 rounded-full px-6 font-bold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap"
      >
        {isSubmitting ? "שולח..." : "עדכנו אותי"}
      </Button>
    </form>
  );
};

export const PathChooser = () => {
  return (
    <section className="py-section-lg bg-background" id="paths">
      <div className="container mx-auto px-5 md:px-6 max-w-6xl">
        <Reveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-eyebrow uppercase tracking-[0.32em] text-muted-foreground mb-4">
              שני מסלולים · מטרה אחת
            </p>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-4">
              איך תרצו להגיע לדירה?
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              לומדים לבד עם הקורס הדיגיטלי המקיף בישראל — או הולכים יחד, יד ביד,
              עם אנליסט אישי עד המפתח. בלי בלבול: זה כל מה שקרנף מציעה.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Door A — the self-serve digital course */}
          <Reveal>
            <article
              className="relative h-full rounded-3xl p-8 lg:p-10 flex flex-col overflow-hidden shadow-depth-3 transition-transform duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "hsl(217 50% 8%)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(80% 60% at 85% 0%, hsl(24 80% 52% / 0.22) 0%, transparent 70%)",
                }}
              />
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.18em] text-accent font-bold">
                    <GraduationCap size={16} />
                    עצמאי · דיגיטלי
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                  הדרך לדירה — הקורס הדיגיטלי
                </h3>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "hsl(36 33% 95% / 0.75)" }}
                >
                  הקורס המקיף בישראל לרכישת דירה חכמה. לומדים לבד, בקצב שלכם —
                  עם כל הכלים לקבל החלטה מבוססת נתונים.
                </p>
                <ul className="space-y-3 mb-8">
                  {courseBullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "hsl(36 33% 95% / 0.88)" }}
                    >
                      <Check size={16} className="text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline gap-3 mb-6" dir="rtl">
                  <span className="text-display-sm md:text-display-md font-black text-white tabular-nums leading-none">
                    ₪{COURSE_PRICE.toLocaleString("he-IL")}
                  </span>
                  <span
                    className="text-lg font-bold line-through tabular-nums"
                    style={{ color: "hsl(36 33% 95% / 0.4)" }}
                  >
                    ₪{COURSE_PRICE_ORIGINAL.toLocaleString("he-IL")}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "hsl(36 33% 95% / 0.65)" }}
                  >
                    · רכישה מיידית
                  </span>
                </div>
                <Link to="/course" className="block">
                  <Button
                    size="lg"
                    className="group w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 rounded-full gap-2 transition-all"
                  >
                    לפרטים ולרכישה
                    <span
                      aria-hidden
                      className="inline-block transition-transform group-hover:-translate-x-1"
                    >
                      ←
                    </span>
                  </Button>
                </Link>
              </div>
            </article>
          </Reveal>

          {/* Door B — premium 1:1 investor guidance */}
          <Reveal delay={0.1}>
            <article className="relative h-full rounded-3xl p-8 lg:p-10 flex flex-col overflow-hidden bg-card border border-border shadow-depth-2 transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.18em] text-primary font-bold">
                    <Users size={16} />
                    אישי · 1:1
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3">
                  ליווי משקיעים פרימיום
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  אנליסט אישי שעובר איתכם את כל הדרך — אסטרטגיה, איתור עסקאות,
                  בדיקות ומשא ומתן — עד שאתם חותמים על נכס משלכם.
                </p>
                <ul className="space-y-3 mb-8">
                  {premiumBullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline gap-3 mb-6 mt-auto" dir="rtl">
                  <span className="text-display-sm font-black text-foreground leading-none">
                    בסוף התהליך — דירה.
                  </span>
                </div>
                <Link to="/premium" className="block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group w-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-bold text-base px-8 py-6 rounded-full gap-2 transition-all"
                  >
                    לתיאום שיחת היכרות — חינם
                    <ArrowLeft
                      size={16}
                      className="transition-transform group-hover:-translate-x-1"
                    />
                  </Button>
                </Link>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Coming soon — the research subscription (third division) */}
        <Reveal delay={0.18}>
          <div className="mt-8 lg:mt-10 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center lg:text-right">
              <span className="hidden sm:inline-flex w-9 h-9 rounded-full bg-accent/10 items-center justify-center shrink-0">
                <Sparkles size={16} className="text-accent" />
              </span>
              <p className="text-sm md:text-base text-foreground">
                <span className="font-bold text-accent ml-1">בקרוב:</span>
                <span className="font-bold">
                  {" "}מערכת מחקר נדל״ן מקצועית במנוי חודשי.
                </span>{" "}
                <span className="text-muted-foreground">
                  רוצים להיות ראשונים לדעת?
                </span>
              </p>
            </div>
            <ResearchWaitlist />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
