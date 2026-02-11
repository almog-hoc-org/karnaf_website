import { motion } from "framer-motion";
import { MapPin, Maximize, BedDouble } from "lucide-react";
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
  return (
    <section id="properties" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-16"
        >
          נכסים <span className="text-primary">חמים</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.location}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {property.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-2xl font-black text-primary mb-2">
                  ₪{property.price}
                </p>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
