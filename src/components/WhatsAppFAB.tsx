import { useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useWhatsAppLink } from "@/hooks/use-whatsapp-link";
import { useBottomBarHeight } from "@/hooks/use-bottom-bar";
import mascotIcon from "@/assets/mascot/mascot-thumbsup.webp";

/**
 * The floating chat button follows the page it's floating over — on /premium
 * it opens the human business line, so a high-intent investor lead never
 * lands in the intake bot just because they tapped the green button instead
 * of the in-page CTA.
 *
 * On /course it steps aside while the sticky price bar is on screen: that
 * bar is the purchase button, and the page already offers WhatsApp inside
 * the assurance strip and the pricing card. A chat button floating over the
 * price is competition, not help.
 */
const WhatsAppFAB = () => {
  const href = useWhatsAppLink("שאלה כללית");
  const { pathname } = useLocation();
  const barHeight = useBottomBarHeight();
  const hidden = pathname.startsWith("/course") && barHeight > 0;
  // The 2s delay is for the first arrival only — stepping back in after the
  // price bar leaves should be immediate.
  const arrived = useRef(false);

  return (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: hidden ? 0 : 1 }}
    // Critically damped: this button arrives on a timer, not off a flick,
    // so overshoot would be motion the gesture never earned.
    transition={{ delay: hidden || arrived.current ? 0 : 2, type: "spring", stiffness: 200, damping: 20 }}
    onAnimationComplete={() => {
      arrived.current = true;
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed z-50 flex items-center gap-2 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-deep))] text-white font-bold px-5 py-3 rounded-full shadow-lg transition-[bottom,right] duration-500 ease-out"
    style={{
      bottom: 'calc(max(1.5rem, env(safe-area-inset-bottom, 0px)) + var(--sticky-cta-h, 0px))',
      right: 'max(1.5rem, env(safe-area-inset-right, 0px))',
      pointerEvents: hidden ? "none" : "auto",
    }}
    aria-label="שלחו הודעה בוואטסאפ"
    aria-hidden={hidden}
    tabIndex={hidden ? -1 : 0}
  >
    <img src={mascotIcon} alt="" className="w-6 h-6 rounded-full object-cover" />
    <span className="hidden sm:inline">דברו עם הקרנף</span>
  </motion.a>
  );
};

export default WhatsAppFAB;
