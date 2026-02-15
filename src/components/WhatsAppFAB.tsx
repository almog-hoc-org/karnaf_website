import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import mascotIcon from "@/assets/mascot/mascot-pointing.png";

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
    className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-5 py-3 rounded-full shadow-lg transition-colors duration-300"
  >
    <img src={mascotIcon} alt="" className="w-6 h-6 rounded-full object-cover" />
    <span className="hidden sm:inline">דברו עם הקרנף</span>
  </motion.a>
);

export default WhatsAppFAB;
