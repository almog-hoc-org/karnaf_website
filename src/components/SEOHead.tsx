import { Head } from "vite-react-ssg";

const SITE_URL = "https://www.karnafnadlan.com";
const SITE_NAME = "קרנף נדל\"ן";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  path,
  jsonLd,
  keywords,
  image,
  type = "website",
  noindex = false,
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Head>
  );
};

export default SEOHead;

/* ============================================================
 *  Reusable Schema.org JSON-LD blocks
 * ============================================================ */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "קרנף נדל\"ן",
  alternateName: ["Karnaf Real Estate", "Karnaf Nadlan"],
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: DEFAULT_IMAGE,
  description:
    "סטודיו ליווי לרכישת דירה ראשונה בישראל. תוכנית הדרך לדירה + אנליסט נדל״ן צמוד בוואטסאפ.",
  foundingDate: "2018",
  slogan: "מספרים, לא תחושות.",
  founders: [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/team/itamar-nahliel#person`,
      name: "איתמר נחליאל",
      jobTitle: "מייסד שותף — אסטרטגיה והשקעות",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/team/almog-chochma#person`,
      name: "אלמוג חכמה",
      jobTitle: "מייסד שותף — פיתוח עסקי ויזמות",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  ],
  sameAs: [
    "https://www.instagram.com/karnaf_nadlan/",
    "https://www.facebook.com/profile.php?id=61563350768976",
    "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F",
    "https://www.tiktok.com/@karnaf.nadlan",
    "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+972-55-996-6175",
    contactType: "customer service",
    availableLanguage: ["Hebrew"],
    email: "karnaf.yazamut@gmail.com",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
  areaServed: { "@type": "Country", name: "Israel" },
  knowsAbout: [
    "רכישת דירה ראשונה",
    "משכנתא",
    "מיסוי מקרקעין",
    "התחדשות עירונית",
    "השקעה בנדל״ן",
    "מס רכישה",
    "מס שבח",
    "תמ״א 38",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "he-IL",
  publisher: { "@id": `${SITE_URL}/#organization` },
  description:
    "ליווי, קורס דיגיטלי וכלי ניתוח לרוכשי דירות בישראל. מבוסס נתונים — לא תחושות.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/course#course`,
  name: "הדרך לדירה — תוכנית הליווי הדיגיטלית",
  description:
    "תוכנית הליווי הדיגיטלית לרכישת דירה ראשונה בישראל. 50+ שיעורים, 6+ מחשבונים מתקדמים (משכנתא, מס רכישה, מס שבח, תשואה על הון עצמי), אנליסט בוואטסאפ, וגישה ל-12 חודשים.",
  url: `${SITE_URL}/course`,
  provider: {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
  },
  educationalLevel: "Beginner",
  inLanguage: "he-IL",
  about: [
    "רכישת דירה ראשונה",
    "משכנתא",
    "מיסוי מקרקעין",
    "התחדשות עירונית",
    "השקעה בנדל״ן",
  ],
  teaches:
    "כיצד לרכוש דירה ראשונה בישראל בצורה מבוססת נתונים: ניתוח עסקאות, משא ומתן, מיסוי, ומימון.",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: ["Online", "Asynchronous"],
    courseWorkload: "PT20H",
    inLanguage: "he-IL",
  },
  offers: {
    "@type": "Offer",
    "@id": `${SITE_URL}/course#offer`,
    name: "תוכנית הדרך לדירה — גישה מלאה ל-12 חודשים",
    category: "Online Course",
    price: "5490",
    priceCurrency: "ILS",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/course`,
    validFrom: "2024-01-01",
    eligibleRegion: { "@type": "Country", name: "Israel" },
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  description:
    "סטודיו ליווי רוכשי דירות והכשרות נדל״ן בישראל. ליווי אישי + תוכנית דיגיטלית.",
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  telephone: "+972-55-996-6175",
  email: "karnaf.yazamut@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
  areaServed: { "@type": "Country", name: "Israel" },
  priceRange: "₪₪",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
};

/* ============================================================
 *  Factory functions — generate schemas from data
 * ============================================================ */

/** Build a BreadcrumbList schema. Pass items in order from root to current. */
export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

/** Build a FAQPage schema from FAQ items. */
export function faqPageSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

/**
 * Build an Article schema for a blog post.
 * Author is the organization unless `author` is supplied with a Person.
 */
export function articleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: { name: string; url?: string };
}) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    url: fullUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "he-IL",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          ...(author.url ? { url: author.url } : {}),
        }
      : { "@id": `${SITE_URL}/#organization` },
  };
}

/** Build a Review schema from a testimonial. */
export function reviewSchema({
  itemName,
  itemUrl,
  reviewerName,
  reviewBody,
  rating,
  datePublished,
}: {
  itemName: string;
  itemUrl: string;
  reviewerName: string;
  reviewBody: string;
  rating: number;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Course",
      name: itemName,
      url: itemUrl,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(rating),
      bestRating: "5",
    },
    author: { "@type": "Person", name: reviewerName },
    reviewBody,
    ...(datePublished ? { datePublished } : {}),
  };
}

/** Build a Service schema for the course / coaching offering. */
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Real estate purchase consulting",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "Israel" },
  description:
    "ליווי אישי לרוכשי דירה: ניתוח עסקה, מיסוי, משא ומתן, ובחינה מקצועית של נכסים.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "השירותים שלנו",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "תוכנית הדרך לדירה (דיגיטלית)",
          description:
            "50+ שיעורים, 6+ מחשבונים, אנליסט בוואטסאפ, גישה 12 חודשים.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ליווי פרימיום",
          description:
            "ליווי 1-on-1 בעסקת רכישה ספציפית — ניתוח, משא ומתן, ובדיקות.",
        },
      },
    ],
  },
};

/** Build an aggregate rating schema for use anywhere we showcase reviews. */
export function aggregateRatingSchema({
  ratingValue,
  reviewCount,
  itemName,
  itemUrl,
}: {
  ratingValue: string;
  reviewCount: string;
  itemName: string;
  itemUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: { "@type": "Course", name: itemName, url: itemUrl },
    ratingValue,
    reviewCount,
    bestRating: "5",
    worstRating: "1",
  };
}
