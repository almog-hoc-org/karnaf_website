import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  MessageCircle,
  Star,
  
  Users,
  BookOpen,
  Calculator,
  Headphones,
  Check,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import FitQuiz from "@/components/rich-media/FitQuiz";
import CurriculumAccordion from "@/components/rich-media/CurriculumAccordion";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import { testimonials } from "@/data/testimonials";
import { faqData } from "@/data/faq";
import { curriculum } from "@/data/curriculum";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import BigCTA from "@/components/BigCTA";

const courseTestimonials = testimonials;

const highlights = [
  { icon: BookOpen, value: "50+", label: "שיעורים" },
  { icon: MessageCircle, value: "✓", label: "ליווי אישי בוואטסאפ" },
  { icon: Calculator, value: "6+", label: "כלים ומחשבונים מתקדמים" },
];

const problems = [
  "משלמים עשרות אלפי שקלים מעל למחיר השוק",
  "חותמים על חוזה בלי להבין מה כתוב",
  "לוקחים משכנתא שלא מתאימה להם",
  "מפספסים הזדמנויות כי לא יודעים לזהות אותן",
];

const solutions = [
  "מבינים כל שלב בתהליך לפני שמתחילים",
  "יודעים לנתח עסקה ולזהות הזדמנות אמיתית",
  "נכנסים למשא ומתן עם כלים וביטחון",
  "מגובים בליווי צמוד של אנליסט נדל״ן",
];

const programCards = [
  {
    icon: BookOpen,
    title: "עיקרי התוכנית",
    description:
      "שיעורים דיגיטליים מובנים צעד אחר צעד — מיסודות השוק ועד חתימת חוזה. לומדים בקצב שלכם עם תוכן בלעדי ומדויק.",
    features: [
      "תיאוריה מקצועית ויסודות נדל״ן",
      "התחדשות עירונית ואסטרטגיות השקעה",
      "משא ומתן וטכניקות מתקדמות",
      "דוגמאות לעסקאות אמיתיות",
    ],
  },
  {
    icon: Calculator,
    title: "מחשבונים וכלים",
    description:
      "פורטל כלים מתקדם שיעזור לכם לנתח כל עסקה בצורה מדויקת ומבוססת נתונים.",
    features: [
      "מחשבון עסקת נדל״ן ומיסוי",
      "מחשבון משכנתא וכדאיות",
      "צ׳קליסט ביקור בנכס",
      "אנליסט AI למענה על שאלות",
    ],
    badge: "הלב של התוכנית",
  },
  {
    icon: Headphones,
    title: "ליווי מקצועי",
    description:
      "ליווי צמוד בוואטסאפ של אנליסט נדל״ן שעונה על שאלות, מכוון ועוזר לכם בכל שלב בדרך.",
    features: [
      "ליווי צמוד של אנליסט בוואטסאפ",
      "מענה לשאלות בזמן אמת",
      "גישה לקהילת תלמידים",
      "הרחבות מקצועיות ועדכונים",
    ],
  },
];

const VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const isPlaceholderVideo = VIDEO_URL.includes("dQw4w9WgXcQ");

const totalModules = curriculum.length;
const totalLessons = curriculum.reduce(
  (sum, mod) => sum + mod.lessons.length,
  0
);


const CoursePage = () => {
  return (
    <>
      <Helmet>
        <title>הדרך לדירה — קורס דיגיטלי | קרנף נדל"ן</title>
        <meta
          name="description"
          content="קורס דיגיטלי מקיף לרוכשי דירות ראשונות — 50+ שיעורים, מחשבונים, כלים וליווי צמוד של אנליסט נדל״ן."
        />
      </Helmet>

      {/* Section 1: Course Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden course-hero-bg">
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 mesh-gradient-bg opacity-50" />

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Provocative line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl text-white/70 mb-6 max-w-2xl mx-auto"
          >
            רוב הישראלים קונים את הנכס היקר בחייהם — בלי שום הכנה.
          </motion.p>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-display text-5xl md:text-7xl lg:text-8xl text-white mb-6"
          >
            הדרך{" "}
            <span className="text-gradient">לדירה</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-6"
          >
            תוכנית הליווי המקצועית שמלמדת אתכם לקנות דירה חכם — מא׳ ועד ת׳.
          </motion.p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-sm px-5 py-2 rounded-full mb-8 backdrop-blur-sm"
          >
            50+ שיעורים · 6+ כלים מתקדמים · ליווי צמוד
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-glow animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7"
            >
              גלו את התוכנית
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Trust Bar */}
      <section className="py-10 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <h.icon size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{h.value}</p>
                <p className="text-sm text-muted-foreground">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Problem -> Solution */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            title="בלי הכנה?"
            highlight="זה עולה ביוקר."
          />
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-12">
            {/* Problems */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 rounded-2xl p-6 bg-red-500/5 border border-red-500/10"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">
                בלי התוכנית
              </h3>
              {problems.map((problem, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <XCircle
                    size={18}
                    className="text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-muted-foreground">
                    {problem}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 rounded-2xl p-6 bg-primary/5 border border-primary/10 scale-[1.02] shadow-lg"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">
                עם התוכנית
              </h3>
              {solutions.map((solution, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    size={18}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-foreground">{solution}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Video Trailer */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            title="ראו"
            highlight="בעצמכם"
            subtitle="3 דקות שמסבירות בדיוק מה תקבלו ואיך זה עובד."
          />
          <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
            {isPlaceholderVideo ? (
              <div className="flex flex-col items-center justify-center py-20 bg-card">
                <p className="text-2xl font-bold text-foreground mb-4">
                  הטריילר בדרך
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  בינתיים — גלו את התוכנית
                </Button>
              </div>
            ) : (
              <VideoPlayer
                url={VIDEO_URL}
                title="טריילר — הדרך לדירה"
              />
            )}
          </div>
        </div>
      </section>

      {/* Section 5: "מה בתוכנית?" — 3 Feature Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedSectionHeader title="מה בתוכנית?" highlight="" />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {programCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(255, 102, 0, 0.15)",
                }}
                className="relative card-premium bg-card border border-border rounded-2xl p-8 group flex flex-col transition-all duration-500"
              >
                {card.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                    {card.badge}
                  </div>
                )}

                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <card.icon size={28} />
                </motion.div>

                <h3 className="text-heading text-xl md:text-2xl text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {card.description}
                </p>

                <ul className="space-y-3 flex-1">
                  {card.features.map((feature, fi) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + fi * 0.1 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check
                        size={16}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Curriculum with summary bar */}
          <div className="max-w-3xl mx-auto mt-16">
            <div className="flex items-center justify-center gap-6 mb-6">
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{totalModules}</strong>{" "}
                מודולים
              </span>
              <span className="text-border">·</span>
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{totalLessons}</strong>{" "}
                שיעורים
              </span>
            </div>
            <CurriculumAccordion />
          </div>
        </div>
      </section>

      {/* Section 6: Fit Quiz */}
      <section className="py-20 bg-secondary/30 relative">
        <div className="absolute inset-0 rounded-none border-t border-b border-primary/10" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <AnimatedSectionHeader
            title="האם התוכנית"
            highlight="מתאימה לי?"
            subtitle="ענו על מספר שאלות קצרות וגלו עד כמה התוכנית מתאימה בדיוק בשבילכם."
          />
          <FitQuiz />
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              צפו בתוכנית המלאה
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7: Pricing Card */}
      <section id="pricing" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pricing-glow bg-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative gradient corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />

            <GraduationCap size={40} className="text-primary mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2">
              הצטרפו לתוכנית
            </h3>
            <p className="text-muted-foreground mb-6">
              הצטרפו ל-300+ בוגרים שכבר רכשו דירה בצורה חכמה.
            </p>

            {/* Price */}
            <div className="text-5xl font-black text-primary text-glow mb-8">
              &#8362;3,450
            </div>

            {/* Value list */}
            <div className="text-right max-w-sm mx-auto space-y-3 mb-8">
              {[
                "50+ שיעורים דיגיטליים",
                "6+ כלים ומחשבונים מתקדמים",
                "ליווי צמוד של אנליסט בוואטסאפ",
                "גישה מלאה ל-12 חודשים",
                "קהילת בוגרים פעילה",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    size={18}
                    className="text-primary flex-shrink-0"
                  />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Primary CTA */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("היי! אני רוצה לרכוש את תוכנית הדרך לדירה")}`} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="btn-glow animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 w-full sm:w-auto gap-3 mb-4"
              >
                לרכישה מאובטחת
              </Button>
            </a>

            {/* Secondary */}
            <div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("היי! אני מעוניין/ת בתוכנית הדרך לדירה")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                יש שאלות? דברו איתנו בוואטסאפ &larr;
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border">
              {["תשלום מאובטח", "גישה מיידית", "ליווי צמוד"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs text-muted-foreground flex items-center gap-1.5"
                >
                  <Shield size={12} className="text-primary" />
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            title="מה הבוגרים"
            highlight="אומרים?"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {courseTestimonials.map((t, i) => (
              <TestimonialVideoCard
                key={t.name}
                testimonial={t}
                index={i}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 gap-2"
              >
                כל סיפורי ההצלחה
                <Star size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader title="שאלות" highlight="נפוצות" />
          <Accordion type="single" collapsible className="space-y-2">
            {faqData.course.map((item, i) => (
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

      {/* Section 10: Final BigCTA */}
      <BigCTA />
    </>
  );
};

export default CoursePage;
