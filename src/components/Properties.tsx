import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    image: property1,
    badge: "בלעדי",
    price: "4,250,000",
    location: "תל אביב, רוטשילד",
    sqm: 120,
    rooms: 4,
  },
  {
    image: property2,
    badge: "הזדמנות",
    price: "2,850,000",
    location: "הרצליה פיתוח",
    sqm: 95,
    rooms: 3,
  },
  {
    image: property3,
    badge: "בלעדי",
    price: "6,900,000",
    location: "קיסריה, שכונת הגולף",
    sqm: 250,
    rooms: 6,
  },
];

const Properties = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "rtl" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section id="properties" className="py-24">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          FEATURED PROPERTIES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-12"
        >
          נכסים <span className="text-primary">חמים</span>
        </motion.h2>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden rounded-xl">
            <div className="flex gap-6">
              {properties.map((property, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer h-full">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.location}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {property.badge}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="text-2xl font-black text-primary mb-2">₪{property.price}</p>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin size={16} />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                        <div className="flex items-center gap-2">
                          <Maximize size={14} />
                          <span>{property.sqm} מ"ר</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BedDouble size={14} />
                          <span>{property.rooms} חדרים</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 z-10 bg-card/80 backdrop-blur border-border hover:bg-primary hover:text-primary-foreground rounded-full w-10 h-10"
          >
            <ChevronRight size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-10 bg-card/80 backdrop-blur border-border hover:bg-primary hover:text-primary-foreground rounded-full w-10 h-10"
          >
            <ChevronLeft size={20} />
          </Button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {properties.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;
