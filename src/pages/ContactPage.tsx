import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import Footer from "@/components/Footer";
import { faqData } from "@/data/faq";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>צור קשר | קרנף נדל"ן</title>
        <meta name="description" content="צרו קשר עם קרנף נדל&quot;ן — WhatsApp, טלפון, אימייל. פגישת היכרות ראשונה בחינם וללא התחייבות." />
      </Helmet>

      <PageHero
        tag="CONTACT US"
        title="צרו"
        highlight="קשר"
        subtitle="נשמח לשמוע מכם. פגישת היכרות ראשונה — בחינם וללא התחייבות."
      />

      {/* Contact Form (reuse existing Footer component) */}
      <Footer />

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            tag="FAQ"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
