import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ImageLightboxProps {
  images: { src: string; alt?: string }[];
  columns?: number;
}

const ImageLightbox = ({ images, columns = 3 }: ImageLightboxProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-3`}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="relative aspect-square rounded-xl overflow-hidden border border-border group cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt || ""}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </motion.div>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img.src }))}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.92)" } }}
      />
    </>
  );
};

export default ImageLightbox;
