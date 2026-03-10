import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle, ArrowLeft, MessageCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import ProcessStepper from "@/components/rich-media/ProcessStepper";
import { courseFeatures, courseProcessSteps } from "@/data/services";
import { faqData } from "@/data/faq";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import BigCTA from "@/components/BigCTA";

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>הדרך לדירה | קרנף נדל"ן</title>
        <meta name="description" content="תוכנית הליווי הדיגיטלית של קרנף נדל&quot;ן — 50+ שיעורים, מחשבונים, כלים וליווי צמוד של אנליסט נדל&quot;ן." />
      </Helmet>

      <PageHero
        title="הדרך"
        highlight="לדירה"
        subtitle="תוכנית הליווי הדיגיטלית שתלמד אתכם לקנות דירה חכם — מא׳ ועד ת׳."
      />

      {/* Highlights */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { value: "50+", label: "שיעורים" },
              { value: "6+", label: "כלים ומחשבונים מתקדמים" },
              { value: "ליווי צמוד", label: "של אנליסט נדל״ן בוואטסאפ", icon: Headphones },
            ].map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                {h.icon ? (
                  <h.icon size={24} className="text-primary mx-auto mb-2" />
                ) : null}
                <p className="text-2xl font-bold text-foreground">{h.value}</p>
                <p className="text-sm text-muted-foreground">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            title="הכירו את הגישה"
            highlight="שלנו"
            subtitle="בסרטון קצר נסביר איך אנחנו עוזרים לישראלים לקנות דירות בצורה חכמה."
          />
          <VideoPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            title="הגישה של קרנף נדל&quot;ן"
          />
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            title="מה בתוכנית?"
            highlight=""
          />
          <ProcessStepper steps={courseProcessSteps} />
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            title="מה כולל"
            highlight="הקורס?"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {courseFeatures.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            title="שאלות"
            highlight="נפוצות"
          />
          <Accordion type="single" collapsible className="space-y-2">
            {faqData.general.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-4 bg-card"
              >
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

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/30 rounded-2xl p-8 md:p-12"
          >
            <GraduationCap size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">מוכנים להתחיל?</h3>
            <p className="text-muted-foreground mb-8">
              הצטרפו ל-300+ בוגרים שכבר רכשו דירה בצורה חכמה.
            </p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("היי! אני מעוניין/ת בתוכנית הדרך לדירה")}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 gap-3">
                <MessageCircle size={20} />
                דברו איתנו על התוכנית
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <BigCTA />
    </>
  );
};

export default ServicesPage;
