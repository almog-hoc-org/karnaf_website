import { Head } from "vite-react-ssg";
import { COURSE_PRICE } from "@/lib/constants";
import { PARTS_LABEL, CHAPTERS_LABEL } from "@/data/courseStats";
import { COURSE_ACCESS_LABEL } from "@/lib/constants";

const SITE_URL = "https://www.karnafnadlan.com";
const SITE_NAME = "קרנף נדל\"ן";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  keywords?: string;
  /** Absolute URL or a site path ("/blog/covers/x.jpg") — paths are made absolute. */
  image?: string;
  /** Alt text for the share image (og:image:alt / twitter:image:alt). */
  imageAlt?: string;
  type?: "website" | "article";
  /** Open Graph article:* tags — only rendered with type="article". */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    section?: string;
  };
  noindex?: boolean;
}

/** Social crawlers need absolute image URLs; site paths get the origin prepended. */
const absoluteUrl = (url: string) =>
  /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;

const SEOHead = ({
  title,
  description,
  path,
  jsonLd,
  keywords,
  image,
  imageAlt,
  type = "website",
  article,
  noindex = false,
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = image ? absoluteUrl(image) : DEFAULT_IMAGE;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const articleMeta = type === "article" ? article : undefined;

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
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {articleMeta && <meta property="article:published_time" content={articleMeta.publishedTime} />}
      {articleMeta && (
        <meta
          property="article:modified_time"
          content={articleMeta.modifiedTime || articleMeta.publishedTime}
        />
      )}
      {articleMeta?.section && <meta property="article:section" content={articleMeta.section} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

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
    "חברת ידע והשקעות נדל״ן בישראל. הקורס הדיגיטלי המקיף \"המדריך המעשי לרכישת דירה\" לרכישה חכמה, וליווי משקיעים פרימיום 1:1 עד חתימה על נכס.",
  foundingDate: "2017",
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
    "קורס דיגיטלי לרכישת דירה וליווי משקיעים 1:1 לרוכשי דירות בישראל. מבוסס נתונים — לא תחושות.",
  // No SearchAction: the site has no search, and Google retired the
  // sitelinks search box in 2024.
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${SITE_URL}/course#course`,
  name: "המדריך המעשי לרכישת דירה — הקורס הדיגיטלי המקיף בישראל",
  description:
    `הקורס הדיגיטלי המקיף לרכישת דירה בישראל — מסלול עצמאי לחלוטין. ${PARTS_LABEL} ו-${CHAPTERS_LABEL} שמכסים את כל הדרך בשיעורים קצרים, וגישה ל-${COURSE_ACCESS_LABEL}.`,
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
    // No courseWorkload: the site deliberately advertises structure
    // (3 parts / 15 chapters, 3-10 min lessons), not a total-hours figure.
    inLanguage: "he-IL",
  },
  offers: {
    "@type": "Offer",
    "@id": `${SITE_URL}/course#offer`,
    name: `המדריך המעשי לרכישת דירה — גישה מלאה ל-${COURSE_ACCESS_LABEL}`,
    category: "Online Course",
    price: String(COURSE_PRICE),
    priceCurrency: "ILS",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/course`,
    validFrom: "2026-07-01",
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
  type = "Article",
  section,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: { name: string; url?: string };
  /** "BlogPosting" for blog articles; defaults to "Article". */
  type?: "Article" | "BlogPosting";
  /** Rendered as articleSection (e.g. the blog category label). */
  section?: string;
}) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    url: fullUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(section ? { articleSection: section } : {}),
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

/**
 * The 1:1 investor accompaniment, for /premium only. No price (it is
 * discussed on the intro call) and no course offer: the premium funnel
 * never shows the ₪950 course — not even to crawlers. The course's own
 * offer lives in courseSchema.
 */
export const premiumServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/premium#service`,
  name: "ליווי משקיעים פרימיום",
  serviceType: "Real estate investor accompaniment",
  url: `${SITE_URL}/premium`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "Israel" },
  description:
    "ליווי אישי 1:1 עד חתימה על נכס — אסטרטגיה, איתור עסקאות, בדיקת נאותות ומשא ומתן.",
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
