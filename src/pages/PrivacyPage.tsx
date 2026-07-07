import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import PageHero from "@/layouts/PageHero";
import { EMAIL } from "@/lib/constants";

const sections: Array<{ title: string; body: string[] }> = [
  {
    title: "אילו פרטים אנחנו אוספים",
    body: [
      "כשאתם משאירים פרטים באחד מטפסי האתר אנחנו שומרים את מה שמילאתם: שם, מספר טלפון, כתובת אימייל (אם צוינה), תחום העניין וההודעה שכתבתם.",
      "בנוסף, כלי מדידה סטנדרטיים (כמו Meta Pixel ו-Google Analytics) אוספים נתוני שימוש אנונימיים באתר — עמודים שנצפו, לחיצות על כפתורים ועומק גלילה — כדי שנוכל לשפר את האתר ואת הקמפיינים שלנו.",
    ],
  },
  {
    title: "למה אנחנו משתמשים בפרטים",
    body: [
      "הפרטים שהשארתם משמשים אך ורק כדי לחזור אליכם ולתאם שיחה או להעניק את השירות שביקשתם. אנחנו לא מוכרים ולא מעבירים את הפרטים שלכם לגורמים צד-שלישיים לצורכי שיווק.",
    ],
  },
  {
    title: "עוגיות (Cookies) וכלי מדידה",
    body: [
      "האתר משתמש בעוגיות של כלי מדידה ופרסום: Meta Pixel (פייסבוק/אינסטגרם), ובמידה והופעלו — Google Analytics ו-Microsoft Clarity. ניתן לחסום עוגיות דרך הגדרות הדפדפן מבלי לפגוע בשימוש באתר.",
    ],
  },
  {
    title: "אבטחה ושמירת מידע",
    body: [
      "הפרטים נשמרים במערכות מאובטחות בענן ומועברים בחיבור מוצפן (HTTPS). הגישה אליהם מוגבלת לצוות קרנף נדל״ן בלבד.",
    ],
  },
  {
    title: "הזכויות שלכם",
    body: [
      `בהתאם לחוק הגנת הפרטיות, תוכלו לבקש בכל עת לעיין בפרטים שנשמרו עליכם, לתקן אותם או למחוק אותם. פשוט כתבו לנו: ${EMAIL}.`,
    ],
  },
];

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
      tag="פרטיות"
      title="מדיניות פרטיות"
      subtitle="בשפה פשוטה: מה אנחנו שומרים, למה, ומה הזכויות שלכם."
    />

    <section className="pb-section-lg bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl font-bold text-foreground mb-3">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-body-lg text-muted-foreground leading-[1.85] mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="text-sm text-muted-foreground pt-6 border-t border-border">
            עודכן לאחרונה: יולי 2026 · שאלות? כתבו לנו — {EMAIL}
          </p>
        </div>
      </div>
    </section>
  </>
);

export default PrivacyPage;
