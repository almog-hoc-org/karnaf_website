import Hero from "@/components/Hero";
import ContactStrip from "@/components/ContactStrip";
import StatsCounter from "@/components/StatsCounter";
import Advantages from "@/components/Advantages";
import Properties from "@/components/Properties";
import Services from "@/components/Services";
import About from "@/components/About";
import WebinarSection from "@/components/WebinarSection";
import BigCTA from "@/components/BigCTA";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import WelcomePopup from "@/components/WelcomePopup";
import SEOHead, { organizationSchema, websiteSchema } from "@/components/SEOHead";

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
      <WelcomePopup />
      <div id="top">
        <Hero />
        <ContactStrip />
        <StatsCounter />
        <Advantages />
        <Services />
        <WebinarSection />
        <Properties />
        <About />
        <BigCTA />
        <CommunitySection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
