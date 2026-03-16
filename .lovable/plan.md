

## תוכנית SEO מקיפה — קרנף נדל"ן

### מה חסר כרגע
- אין Sitemap
- אין Structured Data (JSON-LD / Schema.org)
- אין canonical URLs
- אין meta keywords (פחות חשוב לגוגל, אבל רלוונטי ל-AI search)
- ה-robots.txt לא מפנה ל-sitemap
- אין semantic HTML מספק (חסרים תגי `<article>`, `<section>` עם aria)
- חסר `og:url` ב-index.html
- אין תגי `hreflang`

### שינויים מתוכננים

#### 1. Structured Data (JSON-LD) — בכל עמוד
הוספת סכמות Schema.org דרך `<Helmet>` בכל עמוד, ללא שינוי ויזואלי:

- **דף הבית:** `Organization` + `WebSite` (עם `potentialAction: SearchAction`)
- **עמוד הקורס:** `Course` + `Product` עם reviews
- **עמוד אודות:** `AboutPage` + `Person` (המייסדים)
- **עמוד סיפורי הצלחה:** `Review` / `Testimonial`
- **עמוד צור קשר:** `ContactPage` + `LocalBusiness`

הנתונים המובנים האלה חשובים במיוחד ל-AI Search (ChatGPT, Gemini, Claude) כי הם מאפשרים להבין את ההקשר העסקי.

#### 2. Sitemap סטטי — `public/sitemap.xml`
יצירת קובץ sitemap עם כל העמודים:
```
/ , /course , /about , /testimonials , /contact
```

#### 3. עדכון `robots.txt`
הוספת שורת `Sitemap:` + הוספת AI crawlers (GPTBot, Google-Extended, ClaudeBot, Anthropic) עם `Allow`.

#### 4. Canonical URLs בכל עמוד
הוספת `<link rel="canonical">` דרך Helmet בכל עמוד.

#### 5. שיפור meta tags ב-`index.html`
- הוספת `og:url`
- הוספת `meta keywords` עם מילות מפתח רלוונטיות בעברית
- הוספת `og:site_name`

#### 6. שיפור meta descriptions בעמודים הפנימיים
העשרת ה-descriptions עם מילות מפתח יעודיות (רכישת דירה ראשונה, קורס נדל"ן, השקעות נדל"ן, ליווי רוכשי דירות).

#### 7. רכיב SEO Head משותף
יצירת רכיב `SEOHead.tsx` שיזריק JSON-LD + canonical + meta tags — כל עמוד יקרא לו עם הפרמטרים שלו.

### קבצים מושפעים

| קובץ | סוג שינוי |
|---|---|
| `public/sitemap.xml` | חדש |
| `public/robots.txt` | עדכון — הוספת Sitemap + AI bots |
| `index.html` | הוספת og:url, og:site_name, keywords |
| `src/components/SEOHead.tsx` | חדש — רכיב JSON-LD + canonical |
| `src/pages/Index.tsx` | הוספת SEOHead |
| `src/pages/CoursePage.tsx` | העשרת Helmet + JSON-LD |
| `src/pages/AboutPage.tsx` | העשרת Helmet + JSON-LD |
| `src/pages/TestimonialsPage.tsx` | העשרת Helmet + JSON-LD |
| `src/pages/ContactPage.tsx` | העשרת Helmet + JSON-LD |

### מה לא ישתנה
אין שינוי ויזואלי — כל השינויים הם ב-`<head>` ובקבצים סטטיים בלבד.

