import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.karnafnadlan.com";
const SITE_NAME = "קרנף נדל\"ן";
const DEFAULT_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/437ecf3b-f7a3-4758-95a5-0fd12cbb6a4f/id-preview-896ec48b--36c514bb-1f75-46f9-90d5-48063cffef66.lovable.app-1773573498436.png";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  keywords?: string;
}

const SEOHead = ({ title, description, path, jsonLd, keywords }: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* Language */}
      <html lang="he" dir="rtl" />

      {/* JSON-LD Structured Data */}
      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;

// Reusable JSON-LD schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "קרנף נדל\"ן",
  alternateName: "Karnaf Real Estate",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: "השקעות נדל\"ן מבוססות נתונים — עוזרים לישראלים לקנות דירה בצורה חכמה.",
  foundingDate: "2023",
  founders: [
    { "@type": "Person", name: "איתמר", jobTitle: "מייסד שותף — אסטרטגיה והשקעות" },
    { "@type": "Person", name: "אלמוג", jobTitle: "מייסד שותף — פיתוח עסקי ויזמות" },
  ],
  sameAs: [
    "https://www.instagram.com/karnaf_nadlan/",
    "https://www.facebook.com/profile.php?id=61563350768976",
    "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F",
    "https://www.tiktok.com/@karnaf.nadlan",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+972-55-996-6175",
    contactType: "customer service",
    availableLanguage: "Hebrew",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "קרנף נדל\"ן",
  url: SITE_URL,
  inLanguage: "he",
  description: "ליווי אישי, קורס דיגיטלי וכלי ניתוח לרוכשי דירות בישראל.",
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "הסדנה הדיגיטלית של קרנף נדל\"ן",
  description: "קורס דיגיטלי מקיף לרכישת דירה ראשונה — כולל 50+ שיעורים, כלים מתקדמים וליווי אישי.",
  provider: {
    "@type": "Organization",
    name: "קרנף נדל\"ן",
    url: SITE_URL,
  },
  educationalLevel: "Beginner",
  inLanguage: "he",
  numberOfCredits: "50+",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: "PT20H",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "300",
    bestRating: "5",
  },
  offers: {
    "@type": "Offer",
    category: "קורס נדל\"ן דיגיטלי",
    availability: "https://schema.org/InStock",
    priceCurrency: "ILS",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "קרנף נדל\"ן",
  description: "ליווי רוכשי דירות, הכשרות נדל\"ן וייעוץ השקעות נדל\"ן בישראל.",
  url: SITE_URL,
  telephone: "+972-55-996-6175",
  email: "karnaf.yazamut@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
  areaServed: {
    "@type": "Country",
    name: "Israel",
  },
  priceRange: "$$",
};
