import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import mascotIcon from "@/assets/mascot/mascot-thumbsup.webp";

const WhatsAppFAB = () => (
  <motion.a
    href={`https://wa.me/${WHATSAPP_NUMBER}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 2, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed z-50 flex items-center gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-deep))] text-white font-bold px-5 py-3 rounded-full shadow-lg transition-[bottom,right] duration-500 ease-out"
    style={{
      bottom: 'calc(max(1.5rem, env(safe-area-inset-bottom, 0px)) + var(--sticky-cta-h, 0px))',
      right: 'max(1.5rem, env(safe-area-inset-right, 0px))',
    }}
    aria-label="שלחו הודעה בוואטסאפ"
  >
    <img src={mascotIcon} alt="" className="w-6 h-6 rounded-full object-cover" />
    <span className="hidden sm:inline">דברו עם הקרנף</span>
  </motion.a>
);

export default WhatsAppFAB;
