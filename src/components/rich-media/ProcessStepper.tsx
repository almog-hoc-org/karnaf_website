import { motion } from "framer-motion";
import type { ProcessStep } from "@/data/services";

interface ProcessStepperProps {
  steps: ProcessStep[];
}

const ProcessStepper = ({ steps }: ProcessStepperProps) => {
  return (
    <div className="relative">
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-start justify-between relative">
        {/* Connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-l from-primary via-primary/50 to-primary/20 origin-right"
          style={{ zIndex: 0 }}
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative z-10 flex flex-col items-center text-center flex-1 px-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.1, y: -4 }}
              className="w-16 h-16 rounded-2xl bg-card border-2 border-primary/30 flex items-center justify-center text-primary mb-4 shadow-lg group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-300"
            >
              <step.icon size={24} />
            </motion.div>

            <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              {i + 1}
            </div>

            <h4 className="text-foreground font-bold text-sm mb-1.5 group-hover:text-primary transition-colors">
              {step.title}
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-[180px]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-4 relative"
          >
            {/* Vertical line */}
            {i < steps.length - 1 && (
              <div className="absolute right-[31px] top-16 bottom-0 w-0.5 bg-primary/20" />
            )}

            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary/30 flex items-center justify-center text-primary shadow-lg">
                <step.icon size={22} />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </div>
            </div>

            <div className="pb-8 pt-1">
              <h4 className="text-foreground font-bold text-base mb-1">{step.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessStepper;
