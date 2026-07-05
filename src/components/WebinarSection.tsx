import { useEffect, useRef, useState } from "react";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";

// The Ravpage embed builds its form via document.write() and is domain-locked
// (rejects requests without a Referer on the authorized domain). We host it in
// a real same-origin page (public/webinar-form.html) and iframe that, so the
// Referer is the live domain and document.write runs during a fresh parse.
const WebinarSection = () => {
  const [height, setHeight] = useState(560);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const h = e.data?.ravpageHeight;
      if (typeof h === "number" && h > 100) setHeight(h);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <SectionDark size="md" glow="bottom">
      <div className="container mx-auto px-5 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-8 leading-[0.98] tracking-tight">
              הרשמה לוובינר הקרוב
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <iframe
              ref={iframeRef}
              src="/webinar-form.html"
              title="הרשמה לוובינר הקרוב"
              className="w-full max-w-md mx-auto block rounded-2xl bg-white/95"
              style={{ height, border: 0 }}
              scrolling="no"
            />
          </Reveal>
        </div>
      </div>
    </SectionDark>
  );
};

export default WebinarSection;
