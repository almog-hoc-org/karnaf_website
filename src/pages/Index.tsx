import { useState } from "react";
import Hero from "@/components/Hero";
import ContactStrip from "@/components/ContactStrip";
import StatsCounter from "@/components/StatsCounter";
import Advantages from "@/components/Advantages";
import Properties from "@/components/Properties";
import Services from "@/components/Services";
import NewsSection from "@/components/NewsSection";
import About from "@/components/About";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const hasVisited = sessionStorage.getItem("karnaf-visited");
  const [isLoading, setIsLoading] = useState(!hasVisited);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("karnaf-visited", "true");
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div id="top">
        <Hero />
        <ContactStrip />
        <StatsCounter />
        <Advantages />
        <Services />
        <Properties />
        <NewsSection />
        <About />
        <BigCTA />
        <Footer />
      </div>
    </>
  );
};

export default Index;
