import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { courseParts } from "@/data/curriculum";
import { PARTS_LABEL, CHAPTERS_LABEL } from "@/data/courseStats";
import { gaCurriculumOpen } from "@/lib/analytics";

/**
 * The syllabus, at the level it is published: 3 parts, each opening to
 * its numbered modules. Lessons are not enumerated — each module holds
 * many short 3-10 minute lessons, and the total is advertised in the
 * section headline above.
 */
const CurriculumAccordion = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex flex-col items-center text-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <BookOpen size={20} />
        </div>
        <div>
          <h3 className="text-foreground font-bold text-xl">סילבוס הקורס</h3>
          <p className="text-muted-foreground text-sm">
            {PARTS_LABEL} · {CHAPTERS_LABEL} · שיעורים קצרים של 3-10 דקות
          </p>
        </div>
      </div>

      {/* All parts open by default — the full module list is the richness
          argument; visitors can still collapse. The GA event therefore
          fires only on re-opens, which is fine. */}
      <Accordion
        type="multiple"
        defaultValue={courseParts.map((p) => `part-${p.id}`)}
        className="space-y-2"
        onValueChange={(values) => {
          const last = values[values.length - 1];
          if (!last) return;
          const part = courseParts.find((p) => `part-${p.id}` === last);
          gaCurriculumOpen(part?.title ?? last);
        }}
      >
        {courseParts.map((part) => (
          <AccordionItem
            key={part.id}
            value={`part-${part.id}`}
            className="border border-border rounded-xl overflow-hidden bg-background px-0"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/5 transition-colors [&[data-state=open]]:bg-primary/5">
              <div className="flex items-center gap-3 text-right w-full">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {part.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-bold text-sm">{part.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {part.subtitle} · {part.modules.length} פרקים
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              <ol className="space-y-1.5 mt-2">
                {part.modules.map((moduleTitle, mi) => (
                  <li
                    key={moduleTitle}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-card transition-colors"
                  >
                    <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {mi + 1}
                    </span>
                    <span className="text-sm text-foreground flex-1">{moduleTitle}</span>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default CurriculumAccordion;
