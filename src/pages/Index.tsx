import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import ProofSection from "@/components/home/ProofSection";
import { PathChooser } from "@/components/home/PathChooser";
import About from "@/components/About";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";
import SEOHead, { organizationSchema, websiteSchema } from "@/components/SEOHead";

/**
 * Homepage — a sharp two-door decision page: promise (Hero) → the choice
 * (PathChooser: digital course or premium 1:1) → proof (real client
 * outcomes) → method (Advantages) → people (About) → ask (BigCTA + form).
 */
const Index = () => {
  return (
    <>
      <SEOHead
        title="קרנף נדל״ן | קורס נדל״ן דיגיטלי וליווי משקיעים 1:1"
        description="שני מסלולים לדירה הבאה שלכם: הקורס הדיגיטלי המקיף בישראל לרכישת דירה חכמה (₪980, גישה מיידית) — או ליווי משקיעים פרימיום 1:1 עד חתימה על נכס. מבוסס נתונים, לא תחושות."
        path="/"
        keywords="רכישת דירה ראשונה, קורס נדל״ן, קורס נדל״ן דיגיטלי, השקעות נדל״ן, ליווי משקיעים, ליווי רוכשי דירות, ניתוח עסקאות, קרנף נדל״ן, קניית דירה, משכנתא"
        jsonLd={[organizationSchema, websiteSchema]}
      />
      <div id="top" className="relative">
        <Hero />
        <PathChooser />
        <ProofSection />
        <Advantages />
        <About />
        <BigCTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
