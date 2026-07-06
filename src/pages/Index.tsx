import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import ProofSection from "@/components/home/ProofSection";
import About from "@/components/About";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";
import SEOHead, { organizationSchema, websiteSchema } from "@/components/SEOHead";
import { CourseStrip } from "@/components/v2/CourseStrip";

/**
 * Homepage — a single narrative with one ask (PRODUCT.md: "One product,
 * sold once"): promise (Hero) → method (Advantages) → proof (real client
 * outcomes) → product (CourseStrip) → people (About) → ask (BigCTA + form).
 */
const Index = () => {
  return (
    <>
      <SEOHead
        title="קרנף נדל״ן | השקעות נדל״ן מבוססות נתונים"
        description="רוצים לקנות דירה ולא יודעים מאיפה להתחיל? קרנף נדל״ן מציעה ליווי אישי, סדנה דיגיטלית וכלי ניתוח מתקדמים שיביאו אתכם לדירה הנכונה — בביטחון מלא."
        path="/"
        keywords="רכישת דירה ראשונה, קורס נדל״ן, השקעות נדל״ן, ליווי רוכשי דירות, סדנה דיגיטלית נדל״ן, ייעוץ נדל״ן, ניתוח עסקאות, קרנף נדל״ן, קניית דירה, משכנתא"
        jsonLd={[organizationSchema, websiteSchema]}
      />
      <div id="top" className="relative">
        <Hero />
        <Advantages />
        <ProofSection />
        <CourseStrip />
        <About />
        <BigCTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
