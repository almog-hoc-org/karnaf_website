import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import Footer from "@/components/Footer";
import { faqData } from "@/data/faq";
import { WHATSAPP_NUMBER, PHONE_NUMBER, EMAIL } from "@/lib/constants";
import { Reveal } from "@/components/v2/Reveal";
import heroCity from "@/assets/hero-city.jpg";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>צור קשר | קרנף נדל"ן</title>
        <meta name="description" content="צרו קשר עם קרנף נדל&quot;ן — WhatsApp, טלפון, אימייל. נשמח לענות על כל שאלה." />
        <link rel="canonical" href="https://www.karnafnadlan.com/contact" />
      </Helmet>

      <PageHero
        tag="צור קשר"
        title="צרו"
        highlight="קשר"
        subtitle="נשמח לשמוע מכם ולעזור לכם בדרך לדירה."
        backgroundImage={heroCity}
      />

      {/* Quick contact cards */}
      <section className="py-section-sm bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                href: `https://wa.me/${WHATSAPP_NUMBER}`,
                ext: true,
                icon: MessageCircle,
                color: "#25D366",
                label: "WhatsApp",
                meta: "תשובה תוך דקות",
              },
              {
                href: "tel:+972559966175",
                icon: Phone,
                label: "טלפון",
                meta: PHONE_NUMBER,
                ltr: true,
              },
              {
                href: `mailto:${EMAIL}`,
                icon: Mail,
                label: "אימייל",
                meta: EMAIL,
              },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-accent/40 hover:shadow-depth-2 transition-all duration-200 group h-full"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: c.color
                        ? `${c.color}1a`
                        : "hsl(var(--accent) / 0.10)",
                    }}
                  >
                    <c.icon
                      size={22}
                      style={{ color: c.color || "hsl(var(--accent))" }}
                    />
                  </div>
                  <span className="font-bold text-foreground group-hover:text-accent transition-colors">
                    {c.label}
                  </span>
                  <span
                    className="text-sm text-muted-foreground"
                    {...(c.ltr ? { dir: "ltr" } : {})}
                  >
                    {c.meta}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <Footer />

      {/* FAQ */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 leading-[0.98] tracking-tight text-center">
              שאלות <span className="text-accent">נפוצות</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.contact.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-5 bg-card"
                >
                  <AccordionTrigger className="text-base font-bold text-foreground hover:no-underline hover:text-accent">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Coverage map */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Reveal>
            <h3 className="text-display-md font-black text-foreground mb-4 leading-[0.98] tracking-tight">
              פריסה <span className="text-accent">ארצית</span>
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground mb-10 leading-relaxed">
              אנחנו עובדים בכל רחבי הארץ — פגישות אונליין ופנים אל פנים, בהתאם לנוחות שלכם.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="rounded-2xl overflow-hidden border border-border aspect-video bg-card shadow-depth-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d865644.0614440815!2d34.3731697!3d31.4117257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1500492432a7c98b%3A0x6a70e8e0e5765a11!2sIsrael!5e0!3m2!1sen!2sil!4v1700000000000!5m2!1sen!2sil"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מפת ישראל"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
