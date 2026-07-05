import { useEffect, useRef, useState } from "react";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";

const RAVPAGE_SRC =
  "//form2.ravpage.co.il/9c142ed5153e8b375257a55c8f388aaa6A44EF14";

// The Ravpage embed is a script that builds the form via document.write().
// That only works while a document is still parsing, so we host it inside an
// iframe (srcdoc) instead of injecting it into the already-loaded SPA DOM.
const IFRAME_SRCDOC = `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body><script type="text/javascript" src="${RAVPAGE_SRC}" charset="UTF-8"></script><script>function _rh(){var h=document.body.scrollHeight;parent.postMessage({ravpageHeight:h},'*');}new ResizeObserver(_rh).observe(document.body);window.addEventListener('load',_rh);<\/script></body></html>`;

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
              srcDoc={IFRAME_SRCDOC}
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
