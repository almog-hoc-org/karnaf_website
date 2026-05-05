import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    eyebrow: "Stage 01 · תיק נכנס",
    title: "ת״א · רוטשילד",
    subtitle: "דירת 3 חדרים · קומה 4 · 78 מ״ר",
    metric: { label: "מחיר מבוקש", value: "2,950,000 ₪" },
  },
  {
    eyebrow: "Stage 02 · ניתוח דאטה",
    title: "מחיר אזורי משווה",
    subtitle: "8 עסקאות באזור 12 חודש אחרון · מחיר חציוני 36,800 ₪/מ״ר",
    metric: { label: "מחיר הוגן משוער", value: "2,870,000 ₪" },
  },
  {
    eyebrow: "Stage 03 · בדיקות צד",
    title: "תיק נכס + מימון",
    subtitle: "מצב משפטי נקי · רישום בטאבו תקין · ריבית 4.4% מ-3 בנקים",
    metric: { label: "תזרים חודשי משוער", value: "8,420 ₪" },
  },
  {
    eyebrow: "Stage 04 · משא ומתן",
    title: "סגירה ב-2,872,000 ₪",
    subtitle: "המוכר הסכים לרדת 78K אחרי הצגת הניתוח",
    metric: { label: "חיסכון נטו", value: "78,000 ₪" },
  },
];

export const CaseStudyPinned = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    if (reduce || mobile) return; // mobile: stack instead of pin
    const scope = scopeRef.current;
    const track = trackRef.current;
    const stages = stagesRef.current;
    if (!scope || !track || !stages) return;

    const ctx = gsap.context(() => {
      const stageEls = Array.from(
        stages.querySelectorAll<HTMLElement>("[data-stage]")
      );
      if (!stageEls.length) return;

      // initial state
      stageEls.forEach((el, i) => {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 30,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: () => `+=${stageEls.length * 70}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      stageEls.forEach((el, i) => {
        if (i === 0) return;
        const prev = stageEls[i - 1];
        tl.to(prev, { opacity: 0, y: -30, duration: 0.8 }, i)
          .fromTo(
            el,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            i + 0.1
          );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scopeRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "hsl(217 50% 8%)",
        color: "hsl(36 33% 95%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 80% at 80% 20%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-texture pointer-events-none" />

      {/* On large screens this becomes the pinned viewport-height stage; on mobile it's a normal section */}
      <div
        ref={trackRef}
        className="relative min-h-[60svh] lg:min-h-[100svh] flex items-center py-section-md lg:py-0"
      >
        <div className="container mx-auto px-5 md:px-6 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-20 items-center w-full">
          {/* Static side: section title */}
          <div>
            <div className="text-eyebrow uppercase tracking-[0.32em] mb-5 flex items-center gap-3" style={{ color: "hsl(var(--accent))" }}>
              <span className="block w-10 h-px bg-accent" aria-hidden />
              <span>תיק לדוגמה · אנונימי</span>
            </div>
            <h2 className="text-display-md md:text-display-xl font-black leading-[0.95] tracking-tight mb-6">
              ככה <span className="text-accent">נראה תיק</span> אצלנו.
            </h2>
            <p
              className="text-body-lg leading-[1.85] max-w-[52ch]"
              style={{ color: "hsl(36 33% 95% / 0.72)" }}
            >
              גלו למטה — ארבעה שלבים מהרגע שהעסקה נכנסת אלינו ועד החתימה.
              ככה אנחנו עובדים, גם כשאתם לא רואים.
            </p>

            {/* Progress dots */}
            <div className="hidden lg:flex items-center gap-3 mt-10">
              {STAGES.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "hsl(36 33% 95% / 0.3)" }}
                    aria-hidden
                  />
                  <span
                    className="text-eyebrow uppercase tracking-[0.18em]"
                    style={{ color: "hsl(36 33% 95% / 0.5)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stages stack */}
          <div ref={stagesRef} className="relative h-[420px] lg:h-[420px]">
            {STAGES.map((stage, i) => (
              <article
                key={i}
                data-stage
                className="absolute inset-0 rounded-2xl p-7 md:p-9 flex flex-col"
                style={{
                  backgroundColor: "hsl(36 33% 95% / 0.04)",
                  border: "1px solid hsl(36 33% 95% / 0.12)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <div
                  className="text-eyebrow uppercase tracking-[0.22em] mb-5 font-mono"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {stage.eyebrow}
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
                  {stage.title}
                </h3>
                <p
                  className="text-body-lg leading-relaxed mb-auto"
                  style={{ color: "hsl(36 33% 95% / 0.78)" }}
                >
                  {stage.subtitle}
                </p>

                <div
                  className="mt-8 pt-6 border-t flex items-end justify-between gap-4"
                  style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}
                >
                  <div>
                    <div
                      className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                      style={{ color: "hsl(36 33% 95% / 0.55)" }}
                    >
                      {stage.metric.label}
                    </div>
                    <div className="font-mono tabular-nums font-black text-3xl md:text-4xl text-accent leading-none">
                      {stage.metric.value}
                    </div>
                  </div>
                  <div
                    className="font-mono text-display-md font-black opacity-15 leading-none select-none"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile fallback: render all stages stacked normally */}
      <div className="lg:hidden container mx-auto px-5 md:px-6 pb-section-md space-y-4">
        {STAGES.map((stage, i) => (
          <article
            key={i}
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "hsl(36 33% 95% / 0.04)",
              border: "1px solid hsl(36 33% 95% / 0.12)",
            }}
          >
            <div
              className="text-eyebrow uppercase tracking-[0.22em] mb-3 font-mono"
              style={{ color: "hsl(var(--accent))" }}
            >
              {stage.eyebrow}
            </div>
            <h3 className="text-2xl font-black mb-2 leading-tight">
              {stage.title}
            </h3>
            <p
              className="leading-relaxed mb-5 text-sm"
              style={{ color: "hsl(36 33% 95% / 0.78)" }}
            >
              {stage.subtitle}
            </p>
            <div
              className="flex items-end justify-between gap-3 pt-4 border-t"
              style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}
            >
              <div>
                <div
                  className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                  style={{ color: "hsl(36 33% 95% / 0.55)" }}
                >
                  {stage.metric.label}
                </div>
                <div className="font-mono tabular-nums font-black text-2xl text-accent leading-none">
                  {stage.metric.value}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
