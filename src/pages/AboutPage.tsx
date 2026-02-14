import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Shield, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/layouts/PageHero";
import AnimatedSectionHeader from "@/components/rich-media/AnimatedSectionHeader";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import ImageLightbox from "@/components/rich-media/ImageLightbox";
import { team } from "@/data/team";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import StatsCounter from "@/components/StatsCounter";
import BigCTA from "@/components/BigCTA";

const values = [
  { icon: Shield, title: "שקיפות", description: "אנחנו מראים את הכל — מספרים, תהליכים ותוצאות. בלי הפתעות." },
  { icon: Target, title: "מקצועיות", description: "כל החלטה מבוססת על נתונים, ניתוח שוק ושנים של ניסיון." },
  { icon: Heart, title: "אכפתיות", description: "כל לקוח הוא שותף. אנחנו נלחמים בשבילכם כאילו זה הכסף שלנו." },
  { icon: Eye, title: "חזון", description: "אנחנו לא רק עוזרים לקנות דירה — אנחנו בונים עתיד פיננסי." },
];

const timeline = [
  { year: "2017", title: "ההתחלה", description: "איתמר ואלמוג נפגשים ומגלים תשוקה משותפת לנדל\"ן." },
  { year: "2019", title: "העסקה הראשונה", description: "ליווי העסקה הראשונה — זוג צעיר שקנה דירה בבאר שבע." },
  { year: "2021", title: "הדרך לדירה", description: "השקת התוכנית הדיגיטלית — 50+ שיעורים ומחשבונים." },
  { year: "2023", title: "ליווי פרימיום", description: "השקת שירות הליווי האישי — יד ביד מהרגע הראשון." },
  { year: "2025", title: "150+ עסקאות", description: "ציון דרך: למעלה מ-150 עסקאות מוצלחות ו-98% שביעות רצון." },
];

const galleryImages = [
  { src: "/placeholder.svg", alt: "צוות קרנף" },
  { src: "/placeholder.svg", alt: "פגישת לקוחות" },
  { src: "/placeholder.svg", alt: "חתימת חוזה" },
  { src: "/placeholder.svg", alt: "מסירת מפתח" },
  { src: "/placeholder.svg", alt: "הרצאה" },
  { src: "/placeholder.svg", alt: "ניתוח שוק" },
];

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>אודות קרנף נדל"ן | הסיפור שלנו</title>
        <meta name="description" content="הכירו את קרנף נדל&quot;ן — הצוות, הסיפור, הערכים. למעלה מ-150 עסקאות מוצלחות ו-8+ שנות ניסיון בליווי רוכשי דירות." />
      </Helmet>

      <PageHero
        tag="ABOUT US"
        title="סיפורו של"
        highlight="הקרנף"
        subtitle={'איך שני חברים הפכו תשוקה לנדל"ן לחברה שעוזרת למאות ישראלים לקנות דירה בצורה חכמה.'}
      />

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-primary font-bold text-sm tracking-widest uppercase mb-4">THE STORY</h3>
              <h2 className="text-display text-3xl md:text-4xl text-foreground mb-6">
                למה <span className="text-gradient">קרנף?</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  הקרנף הוא חיה שנראית מאיימת מבחוץ, אבל בפנים — מגנה על העדר שלה בכל מחיר.
                  בדיוק ככה אנחנו עובדים: נלחמים בשבילכם, מגינים על האינטרסים שלכם, ודואגים שתגיעו לעסקה הטובה ביותר.
                </p>
                <p>
                  התחלנו מתוך תסכול. ראינו חברים ובני משפחה קונים דירות בלי ידע, משלמים יותר מדי, ומפספסים הזדמנויות.
                  החלטנו שזה חייב להשתנות.
                </p>
                <p>
                  היום, אחרי 150+ עסקאות מוצלחות, אנחנו ממשיכים באותה משימה: לתת לכל ישראלי את הכלים והידע לקנות דירה בצורה חכמה.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <VideoPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                title="הסיפור של קרנף"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="VALUES"
            title="הערכים"
            highlight="שלנו"
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
              >
                <v.icon size={24} className="text-primary mb-4" />
                <h4 className="text-foreground font-bold text-lg mb-2">{v.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSectionHeader
            tag="TIMELINE"
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
                className="flex gap-6 mb-8 last:mb-0"
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
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="THE TEAM"
            title="הצוות"
            highlight="שלנו"
          />
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors text-center"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-3xl">{member.name.charAt(0)}</span>
                </div>
                <h4 className="text-foreground font-bold text-xl">{member.name}</h4>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSectionHeader
            tag="GALLERY"
            title="גלריית"
            highlight="תמונות"
          />
          <ImageLightbox images={galleryImages} columns={3} />
        </div>
      </section>

      <BigCTA />
    </>
  );
};

export default AboutPage;
