import { useEffect, useRef } from "react";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";

const RAVPAGE_SRC =
  "//form2.ravpage.co.il/9c142ed5153e8b375257a55c8f388aaa6A44EF14";

const WebinarSection = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = formRef.current;
    if (!container || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = RAVPAGE_SRC;
    script.charset = "UTF-8";
    script.async = true;
    container.appendChild(script);
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
            <div ref={formRef} className="ravpage-embed max-w-md mx-auto" />
          </Reveal>
        </div>
      </div>
    </SectionDark>
  );
};

export default WebinarSection;
