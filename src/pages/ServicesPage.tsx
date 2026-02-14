import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { GraduationCap, Crown, CheckCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import ProcessStepper from "@/components/rich-media/ProcessStepper";
import { courseFeatures, premiumFeatures, comparisonTable, courseProcessSteps } from "@/data/services";
import { faqData } from "@/data/faq";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import BigCTA from "@/components/BigCTA";

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>השירותים שלנו | קרנף נדל"ן</title>
        <meta name="description" content="קרנף נדל&quot;ן — תוכנית דיגיטלית &quot;הדרך לדירה&quot; וליווי פרימיום אישי. גלו איזה שירות מתאים לכם." />
      </Helmet>

      <PageHero
        tag="OUR SERVICES"
        title="השירותים"
        highlight="שלנו"
        subtitle="שני מסלולים — מטרה אחת: לעזור לכם לקנות דירה בצורה חכמה, בטוחה ומשתלמת."
      />

      {/* Video Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="WATCH"
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

      {/* Two Service Cards */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <AnimatedSectionHeader
            tag="CHOOSE YOUR PATH"
            title="מה מתאים"
            highlight="לכם?"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Course Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-blue-400/30 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300" />
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">תוכנית &ldquo;הדרך לדירה&rdquo;</h3>
              <p className="text-muted-foreground mb-6">למדו לבד — בקצב שלכם, עם כל הכלים שצריך.</p>
              <ul className="space-y-2 mb-8">
                {courseFeatures.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/course">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold gap-2">
                  <GraduationCap size={16} />
                  גלו את התוכנית
                  <ArrowLeft size={16} />
                </Button>
              </Link>
            </motion.div>

            {/* Premium Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-card border border-primary/30 rounded-2xl p-8 hover:border-primary/60 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Crown size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">ליווי קרנף פרימיום</h3>
              <p className="text-muted-foreground mb-6">אנחנו עושים את העבודה — אתם סוגרים עסקה מנצחת.</p>
              <ul className="space-y-2 mb-8">
                {premiumFeatures.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/premium">
                <Button className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
                  <Crown size={16} />
                  גלו את הפרימיום
                  <ArrowLeft size={16} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <AnimatedSectionHeader
            tag="HOW IT WORKS"
            title="איך התהליך"
            highlight="עובד?"
            subtitle="5 שלבים פשוטים מהרגע שנפגשים ועד שמחזיקים מפתח."
          />
          <ProcessStepper steps={courseProcessSteps} />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="COMPARE"
            title="השוואת"
            highlight="שירותים"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border overflow-hidden bg-card"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-right text-foreground font-bold w-1/4">היבט</TableHead>
                  <TableHead className="text-right text-blue-400 font-bold w-[37.5%]">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} />
                      הדרך לדירה
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-primary font-bold w-[37.5%]">
                    <div className="flex items-center gap-2">
                      <Crown size={16} />
                      ליווי פרימיום
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonTable.map((row) => (
                  <TableRow key={row.aspect} className="border-border">
                    <TableCell className="text-foreground font-medium text-sm">{row.aspect}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{row.course}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{row.premium}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            tag="FAQ"
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

      <BigCTA />
    </>
  );
};

export default ServicesPage;
