import { VelocityMarquee } from "@/components/v2/scroll";
import { courseParts } from "@/data/curriculum";

/* Every chapter in the syllabus, in order — the ribbon is the table of
   contents, so nothing on it is a claim the course doesn't back. */
const topics = courseParts.flatMap((p) => p.modules);

/**
 * The ink strip that closes the hero: the course's real chapter names
 * drifting past, surging with the reader's scroll speed.
 */
const TopicMarquee = () => (
  <section
    aria-label="נושאי הקורס"
    className="relative bg-[hsl(var(--ink))] border-t border-white/10 py-7 md:py-9"
  >
    <VelocityMarquee
      items={topics}
      itemClassName="text-lg md:text-2xl font-bold text-white/70 tracking-[-0.01em]"
      className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    />
  </section>
);

export default TopicMarquee;
