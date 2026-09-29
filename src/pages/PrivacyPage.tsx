import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import PageHero from "@/layouts/PageHero";
import { EMAIL } from "@/lib/constants";

/* The policy text is legal copy — change wording only with the owner.
   Layout only below: numbered sections, an index, the address as a link. */
const sections: Array<{ id: string; title: string; body: string[] }> = [
  {
    id: "collected",
    title: "אילו פרטים אנחנו אוספים",
    body: [
      "כשאתם משאירים פרטים באחד מטפסי האתר אנחנו שומרים את מה שמילאתם: שם, מספר טלפון, כתובת אימייל (אם צוינה), תחום העניין וההודעה שכתבתם.",
      "בנוסף, כלי מדידה סטנדרטיים (כמו Meta Pixel ו-Google Analytics) אוספים נתוני שימוש אנונימיים באתר — עמודים שנצפו, לחיצות על כפתורים ועומק גלילה — כדי שנוכל לשפר את האתר ואת הקמפיינים שלנו.",
    ],
  },
  {
    id: "use",
    title: "למה אנחנו משתמשים בפרטים",
    body: [
      "הפרטים שהשארתם משמשים אך ורק כדי לחזור אליכם ולתאם שיחה או להעניק את השירות שביקשתם. אנחנו לא מוכרים ולא מעבירים את הפרטים שלכם לגורמים צד-שלישיים לצורכי שיווק.",
    ],
  },
  {
    id: "cookies",
    title: "עוגיות (Cookies) וכלי מדידה",
    body: [
      "האתר משתמש בעוגיות של כלי מדידה ופרסום: Meta Pixel (פייסבוק/אינסטגרם), ובמידה והופעלו — Google Analytics ו-Microsoft Clarity. ניתן לחסום עוגיות דרך הגדרות הדפדפן מבלי לפגוע בשימוש באתר.",
    ],
  },
  {
    id: "security",
    title: "אבטחה ושמירת מידע",
    body: [
      "הפרטים נשמרים במערכות מאובטחות בענן ומועברים בחיבור מוצפן (HTTPS). הגישה אליהם מוגבלת לצוות קרנף נדל״ן בלבד.",
    ],
  },
  {
    id: "rights",
    title: "הזכויות שלכם",
    body: [
      `בהתאם לחוק הגנת הפרטיות, תוכלו לבקש בכל עת לעיין בפרטים שנשמרו עליכם, לתקן אותם או למחוק אותם. פשוט כתבו לנו: ${EMAIL}.`,
    ],
  },
];

const mailLinkClass =
  "font-semibold text-foreground underline underline-offset-4 decoration-primary/30 hover:decoration-primary break-all";

/** Render a paragraph with the contact address as a mailto link (text unchanged). */
const withMailLink = (text: string) => {
  const at = text.indexOf(EMAIL);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <a href={`mailto:${EMAIL}`} dir="ltr" className={mailLinkClass}>
        {EMAIL}
      </a>
      {text.slice(at + EMAIL.length)}
    </>
  );
};

const PrivacyPage = () => (
  <>
    <SEOHead
      title="מדיניות פרטיות | קרנף נדל״ן"
      description="איך קרנף נדל״ן שומרת על הפרטים שלכם: מה נאסף, למה, ואילו זכויות יש לכם."
      path="/privacy"
      jsonLd={[
        breadcrumbSchema([
          { name: "דף הבית", url: "/" },
          { name: "מדיניות פרטיות", url: "/privacy" },
        ]),
      ]}
    />

    <PageHero
        containerClassName="max-w-5xl"
      splitTitle
      tag="פרטיות"
      title="מדיניות פרטיות"
      subtitle="בשפה פשוטה: מה אנחנו שומרים, למה, ומה הזכויות שלכם."
      footnote="עודכן לאחרונה: יולי 2026"
    />

    <section className="pb-section-lg bg-background">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[14rem_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          {/* Index — sticky beside the text on desktop */}
          <nav aria-label="תוכן העניינים" className="hidden lg:block lg:sticky lg:top-28">
            <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-foreground mb-3">בעמוד הזה</p>
            <ol className="space-y-1 border-s border-primary/15">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-3 ps-4 py-2 min-h-[44px] items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="font-mono tabular-nums text-xs text-primary/60">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[68ch]">
            <div className="divide-y divide-border border-y border-border">
              {sections.map((s, i) => (
                <article key={s.id} id={s.id} className="py-8 md:py-10 scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 text-xl md:text-2xl font-bold text-foreground mb-4 tracking-[-0.015em]">
                    <span className="font-mono text-sm text-primary/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="text-body-lg text-foreground/80 leading-[1.9] mb-4 last:mb-0">
                      {withMailLink(p)}
                    </p>
                  ))}
                </article>
              ))}
            </div>
            <p className="text-sm text-muted-foreground pt-6">
              עודכן לאחרונה: יולי 2026 · שאלות? כתבו לנו —{" "}
              <a href={`mailto:${EMAIL}`} dir="ltr" className={mailLinkClass}>
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default PrivacyPage;
