import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/layouts/PageHero";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/v2/Reveal";
import { SplitReveal } from "@/components/v2/scroll";
import { Kicker } from "@/components/service/Kicker";
import { faqData } from "@/data/faq";
import { PHONE_NUMBER, EMAIL, WHATSAPP_BUSINESS_NUMBER } from "@/lib/constants";
import { chatLink } from "@/lib/whatsapp";
import SEOHead, {
  organizationSchema,
  localBusinessSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/SEOHead";

const WA_LINK = chatLink("contact");
const TEL_LINK = `tel:+${WHATSAPP_BUSINESS_NUMBER}`;

/* Hours and response time — the same promise as the contact FAQ (faq.ts). */
const HOURS = "א׳–ה׳ 09:00-20:00 · ו׳ 09:00-14:00";
const RESPONSE = "חוזרים תוך 24 שעות, ברוב המקרים תוך כמה שעות";

/* Route each kind of question to the door built for it — a 1:1 lead belongs
   in the accompaniment form (equity bracket, analyst call), a mortgage lead
   in the mortgage form, a course question in a chat. */
const routes: {
  title: string;
  body: string;
  cta: string;
  to?: string;
  href?: string;
  sub?: { label: string; to: string };
}[] = [
  {
    title: "שאלה על הקורס הדיגיטלי",
    body: "מה יש בו, למי הוא מתאים, איך ניגשים. כתבו לנו ונענה.",
    cta: "לשאול בוואטסאפ",
    href: chatLink("course-question"),
    sub: { label: "או לקרוא את כל הפרטים בדף הקורס", to: "/course" },
  },
  {
    title: "ליווי אישי 1:1 בעסקת רכישה",
    body: "יש לכם הון עצמי ואתם רוצים אנליסט לצדכם — מהאסטרטגיה ועד החתימה.",
    cta: "לתיאום שיחת היכרות",
    to: "/premium#contact",
  },
  {
    title: "משכנתא או מיחזור",
    body: "תמהיל, מכרז בין בנקים, או בדיקה של הצעה שכבר קיבלתם.",
    cta: "לבדיקת המשכנתא",
    to: "/mortgage#contact",
  },
  {
    title: "משהו אחר",
    body: "שיתוף פעולה, תקשורת, או כל שאלה שלא מצאה מקום כאן.",
    cta: "להשאיר פרטים",
    href: "#contact-form",
  },
];

const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="צור קשר עם קרנף נדל״ן | WhatsApp, טלפון, אימייל"
        description={`WhatsApp וטלפון ${PHONE_NUMBER}, אימייל ${EMAIL}. שעות פעילות: א׳–ה׳ 9:00–20:00, ו׳ 9:00–14:00. ${RESPONSE}.`}
        path="/contact"
        keywords="קרנף נדל״ן צור קשר, ליווי רכישת דירה, ייעוץ נדל״ן בישראל"
        jsonLd={[
          organizationSchema,
          localBusinessSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "צור קשר", url: "/contact" },
          ]),
          faqPageSchema(faqData.contact),
        ]}
      />

      <PageHero
        containerClassName="max-w-5xl"
        splitTitle
        tag="צור קשר"
        title="בואו נדבר."
        accentWords={["נדבר."]}
        subtitle="הדרך הכי מהירה היא וואטסאפ — עונים אנשים מהצוות, לא בוט. אפשר גם להתקשר, לכתוב מייל או להשאיר פרטים ונחזור אליכם."
        actions={
          <>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="group w-full sm:w-auto inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full transition-colors shadow-glow-accent"
              >
                <MessageCircle size={20} aria-hidden />
                כתבו לנו בוואטסאפ
              </Button>
            </a>
            <a
              href={TEL_LINK}
              className="inline-flex items-center justify-center sm:justify-start gap-2 font-bold text-foreground hover:text-primary min-h-[44px]"
            >
              <Phone size={18} aria-hidden className="text-muted-foreground" />
              <span dir="ltr" className="tabular-nums">
                {PHONE_NUMBER}
              </span>
            </a>
          </>
        }
        footnote={
          <>
            {HOURS}
            <br />
            {RESPONSE}
          </>
        }
      />

      {/* Router — each question to the door built for it */}
      <section className="pb-section-md bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <Reveal>
            <Kicker className="mb-6">במה נוכל לעזור?</Kicker>
          </Reveal>
          <ul className="border-t border-primary/15">
            {routes.map((r, i) => {
              const ext = r.href?.startsWith("http");
              const cta = (
                <span className="inline-flex items-center gap-2 font-bold text-primary whitespace-nowrap">
                  {r.cta}
                  <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
                </span>
              );
              return (
                <li key={r.title} className="border-b border-primary/15">
                  <Reveal delay={i * 0.05} y={14}>
                    <div className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-3 md:gap-10 items-center py-6 md:py-7">
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-[-0.015em] mb-1">
                          {r.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {r.body}
                          {r.sub && (
                            <>
                              {" "}
                              <Link
                                to={r.sub.to}
                                className="text-foreground font-semibold underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                              >
                                {r.sub.label}
                              </Link>
                            </>
                          )}
                        </p>
                      </div>
                      {r.to ? (
                        <Link to={r.to} className="group inline-flex items-center min-h-[44px]">
                          {cta}
                        </Link>
                      ) : (
                        <a
                          href={r.href}
                          {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="group inline-flex items-center min-h-[44px]"
                        >
                          {cta}
                        </a>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Form + direct channels */}
      <section id="contact-form" className="py-section-md bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 lg:gap-16 items-start">
            <div>
              <SplitReveal
                text="השאירו פרטים — נחזור אליכם."
                highlight={["נחזור", "אליכם."]}
                className="text-display-sm md:text-display-md text-foreground mb-3"
              />
              <Reveal delay={0.06}>
                <p className="text-muted-foreground mb-8">{RESPONSE}, בשעות הפעילות.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <ContactForm source="website" />
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="rounded-3xl bg-background border border-border p-6 md:p-8">
                <h2 className="text-lg font-bold text-foreground mb-5">או ישירות</h2>
                <ul className="space-y-1">
                  {[
                    {
                      icon: MessageCircle,
                      label: "וואטסאפ",
                      value: "הכי מהיר",
                      href: WA_LINK,
                      ext: true,
                    },
                    { icon: Phone, label: "טלפון", value: PHONE_NUMBER, href: TEL_LINK, ltr: true },
                    { icon: Mail, label: "אימייל", value: EMAIL, href: `mailto:${EMAIL}`, ltr: true },
                  ].map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-4 rounded-2xl px-3 py-3 -mx-3 hover:bg-secondary/70 transition-colors min-h-[44px]"
                      >
                        <span className="inline-flex w-11 h-11 rounded-full bg-primary/[0.06] items-center justify-center text-primary shrink-0">
                          <c.icon size={20} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold text-foreground">{c.label}</span>
                          <span
                            className="block text-sm text-muted-foreground truncate"
                            {...(c.ltr ? { dir: "ltr", style: { textAlign: "right" } } : {})}
                          >
                            {c.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t border-border space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-start gap-3">
                    <Clock size={18} aria-hidden className="shrink-0 mt-0.5 text-primary" />
                    <span>
                      {HOURS}
                      <br />
                      בוואטסאפ אפשר להשאיר הודעה בכל שעה.
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPin size={18} aria-hidden className="shrink-0 mt-0.5 text-primary" />
                    <span>פריסה ארצית — פגישות אונליין ופנים אל פנים, לפי הנוחות שלכם.</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <Reveal>
            <h2 className="text-display-sm md:text-display-md text-foreground mb-8 md:mb-10 text-center">
              שאלות נפוצות
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.contact.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-5 bg-card"
                >
                  <AccordionTrigger className="text-base font-bold text-foreground hover:no-underline hover:text-primary text-right min-h-[44px]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-[1.85]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
