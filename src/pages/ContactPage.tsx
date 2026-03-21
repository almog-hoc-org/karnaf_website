import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import Footer from "@/components/Footer";
import { faqData } from "@/data/faq";
import { WHATSAPP_NUMBER, PHONE_NUMBER, EMAIL } from "@/lib/constants";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>צור קשר | קרנף נדל"ן</title>
        <meta name="description" content="צרו קשר עם קרנף נדל&quot;ן — WhatsApp, טלפון, אימייל. נשמח לענות על כל שאלה." />
        <link rel="canonical" href="https://www.karnafnadlan.com/contact" />
      </Helmet>

      <PageHero
        title="צרו"
        highlight="קשר"
        subtitle="נשמח לשמוע מכם ולעזור לכם בדרך לדירה."
      />

      {/* Quick contact cards */}
      <section className="py-8 -mt-8">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-[#25D366]/40 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle size={26} className="text-[#25D366]" />
              </div>
              <span className="font-bold text-foreground group-hover:text-[#25D366] transition-colors">WhatsApp</span>
              <span className="text-sm text-muted-foreground">תשובה תוך דקות</span>
            </a>
            <a
              href="tel:+972559966175"
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={26} className="text-accent" />
              </div>
              <span className="font-bold text-foreground group-hover:text-accent transition-colors">טלפון</span>
              <span className="text-sm text-muted-foreground" dir="ltr">{PHONE_NUMBER}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={26} className="text-accent" />
              </div>
              <span className="font-bold text-foreground group-hover:text-accent transition-colors">אימייל</span>
              <span className="text-sm text-muted-foreground text-xs">{EMAIL}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <Footer />

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            title="שאלות"
            highlight="נפוצות"
          />
          <Accordion type="single" collapsible className="space-y-2">
            {faqData.contact.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-4 bg-card">
                <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Map embed */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div >
            <h3 className="text-display text-2xl text-foreground mb-4">
              פריסה <span className="text-gradient">ארצית</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              אנחנו עובדים בכל רחבי הארץ — פגישות אונליין ופנים אל פנים, בהתאם לנוחות שלכם.
            </p>
            <div className="rounded-2xl overflow-hidden border border-border aspect-video bg-card">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
