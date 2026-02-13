import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import Advantages from "@/components/Advantages";
import Properties from "@/components/Properties";
import Services from "@/components/Services";
import NewsSection from "@/components/NewsSection";
import About from "@/components/About";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <SmoothScroll>
        <div className="min-h-screen" id="top">
          <Navigation />
          <Hero />
          <StatsCounter />
          <Advantages />
          <Services />
          <Properties />
          <NewsSection />
          <About />
          <BigCTA />
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
};

export default Index;
