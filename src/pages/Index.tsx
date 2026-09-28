import Hero from "@/components/Hero";
import TopicMarquee from "@/components/home/TopicMarquee";
import Manifesto from "@/components/home/Manifesto";
import DealStory from "@/components/home/DealStory";
import MethodSteps from "@/components/home/MethodSteps";
import ProofSection from "@/components/home/ProofSection";
import { PathChooser } from "@/components/home/PathChooser";
import About from "@/components/About";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";
import SEOHead, { organizationSchema, websiteSchema } from "@/components/SEOHead";

/**
 * Homepage — a sharp two-door decision page, told as a scroll story:
 * promise (Hero: the course window flattens as you scroll) → the syllabus
 * drifting past (TopicMarquee) → the thesis, lit word by word (Manifesto)
 * → the thesis shown on one apartment (DealStory: a pinned deal card fills
 * in — asking price, market price, offer, signature) → the choice
 * (PathChooser: digital course or premium 1:1) → the method,
 * pinned while its steps scroll (MethodSteps) → proof, dealt as a stack
 * (ProofSection) → people (About) → ask (BigCTA opens up + form).
 * Scroll primitives live in components/v2/scroll (docs/SCROLL-MOTION.md).
 */
const Index = () => {
  return (
    <>
      <SEOHead
        title="קרנף נדל״ן | קורס נדל״ן דיגיטלי וליווי משקיעים 1:1"
        description="שני מסלולים לדירה הבאה שלכם: הקורס הדיגיטלי המקיף בישראל לרכישת דירה חכמה (גישה מיידית) — או ליווי משקיעים פרימיום 1:1 עד חתימה על נכס. מבוסס נתונים, לא תחושות."
        path="/"
        keywords="רכישת דירה ראשונה, קורס נדל״ן, קורס נדל״ן דיגיטלי, השקעות נדל״ן, ליווי משקיעים, ליווי רוכשי דירות, ניתוח עסקאות, קרנף נדל״ן, קניית דירה, משכנתא"
        jsonLd={[organizationSchema, websiteSchema]}
      />
      <div id="top" className="relative">
        <Hero />
        <TopicMarquee />
        <Manifesto />
        <DealStory />
        <PathChooser />
        <MethodSteps />
        <ProofSection />
        <About />
        <BigCTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
