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

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth" id="top">
      <Navigation />
      <Hero />
      <StatsCounter />
      <Advantages />
      <Properties />
      <Services />
      <NewsSection />
      <About />
      <BigCTA />
      <Footer />
    </div>
  );
};

export default Index;
