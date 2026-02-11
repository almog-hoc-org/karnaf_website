import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import Properties from "@/components/Properties";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Advantages />
      <Properties />
      <Services />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
