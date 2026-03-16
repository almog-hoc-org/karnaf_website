import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import { testimonials } from "@/data/testimonials";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import BigCTA from "@/components/BigCTA";
import SEOHead from "@/components/SEOHead";

const TestimonialsPage = () => {
  const courseTestimonials = testimonials.filter((t) => t.service === "course");
  const premiumTestimonials = testimonials.filter((t) => t.service === "premium");
  const allTestimonials = [...premiumTestimonials, ...courseTestimonials];

  return (
    <>
      <SEOHead
        title="סיפורי הצלחה | לקוחות קרנף נדל״ן משתפים"
        description="קראו עדויות של לקוחות שרכשו דירות בליווי קרנף נדל״ן — בוגרי הסדנה הדיגיטלית ולקוחות פרימיום משתפים את הסיפור שלהם. 375+ לקוחות מרוצים."
        path="/testimonials"
        keywords="חוות דעת קרנף נדל״ן, סיפורי הצלחה נדל״ן, ביקורות לקוחות, רכישת דירה ראשונה חוויות, המלצות ליווי נדל״ן"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "סיפורי הצלחה — קרנף נדל״ן",
          description: "עדויות של לקוחות קרנף נדל״ן",
          url: "https://www.karnafnadlan.com/testimonials",
        }}
      />

      <PageHero
        title="סיפורי"
        highlight="הצלחה"
        subtitle="מאות ישראלים כבר רכשו דירה בצורה חכמה עם קרנף. הנה חלק מהסיפורים שלהם."
      />

      {/* Stats - reduced spacing */}
      <section className="py-10 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto text-center">
            <div>
              <p className="text-4xl font-black text-primary text-glow">375+</p>
              <p className="text-sm text-muted-foreground mt-1">לקוחות בתוכניות השונות</p>
            </div>
            <div>
              <p className="text-4xl font-black text-primary text-glow">8+</p>
              <p className="text-sm text-muted-foreground mt-1">שנות ניסיון</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            title="מה הלקוחות"
            highlight="אומרים?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {allTestimonials.map((t, i) => (
              <TestimonialVideoCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-display text-3xl md:text-4xl text-foreground mb-4">
              רוצים להיות הסיפור <span className="text-gradient">הבא?</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              הצטרפו למאות ישראלים שכבר רכשו דירה בצורה חכמה עם קרנף.
            </p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 gap-3">
                <MessageCircle size={20} />
                דברו עם הקרנף
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <BigCTA />
    </>
  );
};

export default TestimonialsPage;
