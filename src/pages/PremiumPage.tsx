import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Crown, CheckCircle, MessageCircle, Star, Users, ThumbsUp, Building, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import ProcessStepper from "@/components/rich-media/ProcessStepper";
import InvestmentSimulator from "@/components/rich-media/InvestmentSimulator";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import { premiumFeatures, premiumProcessSteps } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { team } from "@/data/team";
import { faqData } from "@/data/faq";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import BigCTA from "@/components/BigCTA";

const premiumTestimonials = testimonials.filter((t) => t.service === "premium");

const stats = [
  { icon: Building, value: "150+", label: "עסקאות מוצלחות" },
  { icon: Users, value: "98%", label: "שביעות רצון" },
  { icon: TrendingUp, value: "₪100K+", label: "חיסכון ממוצע" },
  { icon: ThumbsUp, value: "8+", label: "שנות ניסיון" },
];

const PremiumPage = () => {
  return (
    <>
      <Helmet>
        <title>ליווי קרנף פרימיום | קרנף נדל"ן</title>
        <meta name="description" content="ליווי אישי מקצה לקצה ברכישת נדל&quot;ן — מפגישת היכרות ועד חתימת חוזה. מומחה צמוד, ניתוח פיננסי, משא ומתן מקצועי." />
      </Helmet>

      <PageHero
        tag="PREMIUM SERVICE"
        title="ליווי קרנף"
        highlight="פרימיום"
        subtitle="יד ביד — מהרגע הראשון ועד חתימת החוזה. אנחנו איתכם מהרעיון הראשון ועד מפתח בדלת."
        badge="ליווי 1-על-1 · מומחה צמוד"
      />

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            tag="THE JOURNEY"
            title="תהליך"
            highlight="הליווי"
            subtitle="5 שלבים מסודרים שמבטיחים שתגיעו לעסקה הטובה ביותר."
          />
          <ProcessStepper steps={premiumProcessSteps} />
        </div>
      </section>

      {/* Investment Simulator */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="SIMULATE"
            title="סימולטור"
            highlight="השקעות"
            subtitle="בדקו כמה תרוויחו מהשקעה בנדל&quot;ן — השוו תוצאות עם וללא ליווי מקצועי."
          />
          <InvestmentSimulator />
        </div>
      </section>

      {/* Video */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="WATCH"
            title="ליווי פרימיום"
            highlight="בפעולה"
            subtitle="ראו איך אנחנו עובדים — מפגישת היכרות ועד מסירת מפתח."
          />
          <VideoPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            title="ליווי פרימיום — איך זה עובד"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            tag="INCLUDED"
            title="מה כולל"
            highlight="הליווי?"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {premiumFeatures.map((f, i) => (
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

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="THE TEAM"
            title="הצוות"
            highlight="שלנו"
            subtitle="הכירו את המומחים שילוו אתכם לאורך כל הדרך."
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all group"
              >
                {/* Photo — large, professional */}
                <div className="relative h-64 overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-6xl">{member.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 -mt-8 relative">
                  <h4 className="text-foreground font-bold text-xl">{member.name}</h4>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            tag="SUCCESS STORIES"
            title="מה הלקוחות"
            highlight="אומרים?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {premiumTestimonials.map((t, i) => (
              <TestimonialVideoCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 gap-2">
                כל סיפורי ההצלחה
                <Star size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader tag="FAQ" title="שאלות" highlight="נפוצות" />
          <Accordion type="single" collapsible className="space-y-2">
            {faqData.premium.map((item, i) => (
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

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/30 rounded-2xl p-8 md:p-12"
          >
            <Crown size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">מוכנים לליווי אישי?</h3>
            <p className="text-muted-foreground mb-8">
              פגישת היכרות ראשונה — בחינם וללא התחייבות.
            </p>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("היי! אני מעוניין/ת בליווי פרימיום")}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 gap-3">
                <MessageCircle size={20} />
                קבעו פגישת היכרות
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <BigCTA />
    </>
  );
};

export default PremiumPage;
