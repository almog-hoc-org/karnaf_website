import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import SEOHead, { organizationSchema } from "@/components/SEOHead";

import { team } from "@/data/team";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import StatsCounter from "@/components/StatsCounter";
import BigCTA from "@/components/BigCTA";

const timeline = [
  { year: "2016", title: "קצינים בקבע", description: "איתמר ואלמוג משרתים כקצינים בצה\"ל ומתחילים להתעניין בעולם הנדל\"ן." },
  { year: "2017", title: "הפליפ הראשון", description: "העסקה הראשונה — רכישה, שיפוץ ומכירה ברווח." },
  { year: "2018", title: "השקעות בחו\"ל", description: "התרחבות להשקעות בחו\"ל וצבירת ניסיון נוסף בארץ." },
  { year: "2021", title: "עסקת תמ\"א", description: "כניסה לעולם ההתחדשות העירונית עם עסקת תמ\"א מוצלחת." },
  { year: "2022", title: "קרקעות ויזמות", description: "נכנסים לעולם הקרקעות והיזמות הנדל\"נית." },
  { year: "2023", title: "קרנף נולד", description: "קרנף נדל\"ן מוקם רשמית — הלקוחות הראשונים מצטרפים." },
  { year: "2024", title: "מתפוצצים ברשתות", description: "צמיחה מסיבית ברשתות החברתיות — אלפי עוקבים חדשים." },
  { year: "2025", title: "50 עסקאות, 300 תלמידים", description: "50 עסקאות מוצלחות ו-300 תלמידים בהכשרות הדיגיטליות." },
  { year: "2026", title: "הקהילה גדלה", description: "עשרות אלפי עוקבים ברשתות, מעל ל-350 לקוחות ותלמידים." },
];


const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="אודות קרנף נדל״ן | הסיפור, הצוות והניסיון"
        description="הכירו את קרנף נדל״ן — צוות מומחים עם 8+ שנות ניסיון בהשקעות נדל״ן, ליווי רוכשי דירות והכשרות דיגיטליות. מעל 350 לקוחות ותלמידים מרוצים."
        path="/about"
        keywords="קרנף נדל״ן, אודות, צוות נדל״ן, ליווי רכישת דירה, השקעות נדל״ן ישראל, איתמר ואלמוג"
        jsonLd={[
          organizationSchema,
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "אודות קרנף נדל״ן",
            description: "הסיפור של קרנף נדל״ן — מ-2016 ועד היום.",
            url: "https://karnaf.lovable.app/about",
          },
        ]}
      />

      <PageHero
        title="סיפורו של"
        highlight="הקרנף"
      />

      {/* Why Karnaf - moved to top */}
      <section className="pt-0 pb-6 md:pb-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display text-2xl md:text-4xl text-foreground mb-3 md:mb-6">
                למה <span className="text-gradient">קרנף?</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  הקרנף הוא חיה שנראית מאיימת מבחוץ, אבל בפנים — מגנה על העדר שלה בכל מחיר.
                  בדיוק ככה אנחנו עובדים: דואגים לאינטרסים שלכם, מגינים עליכם, ודואגים שתגיעו לעסקה הטובה ביותר.
                </p>
                <p>
                  התחלנו מתוך תסכול. ראינו חברים ובני משפחה קונים דירות בלי ידע, משלמים יותר מדי, ומפספסים הזדמנויות.
                  החלטנו שזה חייב להשתנות.
                </p>
                <p>
                  היום, אחרי מעל 350 לקוחות ותלמידים, אנחנו ממשיכים באותה משימה: לתת לכל ישראלי את הכלים והידע לקנות דירה בצורה חכמה.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
                <div className="flex flex-col items-center justify-center py-16 bg-card">
                  <p className="text-lg font-bold text-foreground mb-2">הסרטון בדרך</p>
                  <p className="text-sm text-muted-foreground">בקרוב כאן</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Timeline */}
      <section className="py-8 md:py-12 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            title="ציר"
            highlight="הזמן"
          />
          <div className="relative">
            <div className="absolute right-[19px] top-0 bottom-0 w-0.5 bg-primary/20" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 md:gap-6 mb-4 md:mb-6 last:mb-0"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-xs">
                    {item.year.slice(2)}
                  </div>
                </div>
                <div className="pb-2">
                  <p className="text-xs text-primary font-bold mb-1">{item.year}</p>
                  <h4 className="text-foreground font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            title="הצוות"
            highlight="שלנו"
          />
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all group"
              >
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


      <BigCTA />
    </>
  );
};

export default AboutPage;
