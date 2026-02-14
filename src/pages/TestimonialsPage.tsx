import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import { testimonials } from "@/data/testimonials";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import StatsCounter from "@/components/StatsCounter";
import BigCTA from "@/components/BigCTA";

const TestimonialsPage = () => {
  const courseTestimonials = testimonials.filter((t) => t.service === "course");
  const premiumTestimonials = testimonials.filter((t) => t.service === "premium");

  return (
    <>
      <Helmet>
        <title>סיפורי הצלחה | קרנף נדל"ן</title>
        <meta name="description" content="קראו עדויות של לקוחות שרכשו דירות בליווי קרנף נדל&quot;ן — בוגרי הקורס ולקוחות פרימיום משתפים את הסיפור שלהם." />
      </Helmet>

      <PageHero
        tag="SUCCESS STORIES"
        title="סיפורי"
        highlight="הצלחה"
        subtitle="מאות ישראלים כבר רכשו דירה בצורה חכמה עם קרנף. הנה חלק מהסיפורים שלהם."
      />

      <StatsCounter />

      {/* Premium Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            tag="PREMIUM CLIENTS"
            title="לקוחות"
            highlight="פרימיום"
            subtitle="אנשים שבחרו בליווי אישי מקצה לקצה."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {premiumTestimonials.map((t, i) => (
              <TestimonialVideoCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Course Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            tag="COURSE GRADUATES"
            title='בוגרי "הדרך לדירה"'
            subtitle="למדו לבד — ורכשו דירה בביטחון."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {courseTestimonials.map((t, i) => (
              <TestimonialVideoCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
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
