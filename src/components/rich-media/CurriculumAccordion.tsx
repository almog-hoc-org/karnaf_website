import { motion } from "framer-motion";
import { Play, FileText, HelpCircle, Clock, BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { curriculum } from "@/data/curriculum";

const lessonTypeIcon = {
  video: Play,
  document: FileText,
  quiz: HelpCircle,
};

const lessonTypeColor = {
  video: "text-primary bg-primary/10",
  document: "text-blue-400 bg-blue-400/10",
  quiz: "text-green-400 bg-green-400/10",
};

const CurriculumAccordion = () => {
  const totalLessons = curriculum.reduce((sum, mod) => sum + mod.lessons.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className="text-foreground font-bold text-xl">סילבוס הקורס</h3>
            <p className="text-muted-foreground text-sm">{curriculum.length} מודולים · {totalLessons} שיעורים</p>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {curriculum.map((module) => (
          <AccordionItem
            key={module.id}
            value={`module-${module.id}`}
            className="border border-border rounded-xl overflow-hidden bg-background px-0"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-primary/5 transition-colors [&[data-state=open]]:bg-primary/5">
              <div className="flex items-center gap-3 text-right w-full">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {module.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-bold text-sm">{module.title}</p>
                  <p className="text-muted-foreground text-xs">{module.subtitle}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 pt-0">
              <div className="space-y-1.5 mt-2">
                {module.lessons.map((lesson, li) => {
                  const Icon = lessonTypeIcon[lesson.type];
                  const colorClass = lessonTypeColor[lesson.type];
                  return (
                    <div
                      key={li}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-card transition-colors"
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon size={14} />
                      </div>
                      <span className="text-sm text-foreground flex-1">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{lesson.duration}</span>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default CurriculumAccordion;
