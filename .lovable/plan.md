

## תוכנית יישום — תיקון SEO מקיף

שמתי לב שכתבת "השעות נדל״ן" — אני מניח שהתכוונת ל**"השקעות נדל״ן מבוססות נתונים"** (כמו שמופיע כבר ב-index.html). אני אשמור על הסלוגן הזה בכל המקומות.

### שינויים מתוכננים

#### 1. NotFound.tsx — הוספת noindex
הוספת `SEOHead` עם `<meta name="robots" content="noindex, nofollow">` כדי שגוגל יפסיק לאנדקס דפי 404.

#### 2. ServicesPage.tsx & PremiumPage.tsx — noindex לדפי redirect
הוספת Helmet עם `noindex` לפני ה-Navigate, למנוע אינדוקס של דפי redirect.

#### 3. App.tsx — חיבור דפי הבלוג ל-Router
הוספת routes ל-`/blog` ו-`/blog/:slug` עם lazy imports.

#### 4. BlogPage.tsx — מעבר ל-SEOHead
החלפת `Helmet` ישיר ב-`SEOHead` עם canonical, OG tags ו-JSON-LD מסוג CollectionPage.

#### 5. BlogArticlePage.tsx — מעבר ל-SEOHead
החלפת `Helmet` ישיר ב-`SEOHead` עם canonical, OG tags ו-JSON-LD מסוג Article.

#### 6. sitemap.xml — עדכון
הוספת `/blog` ו-`/services` (שכרגע חסרים).

#### 7. index.html — סנכרון כותרת
הכותרת בשורה 7 כבר מסונכרנת עם הסלוגן הנכון: `קרנף נדל״ן | השקעות נדל״ן מבוססות נתונים.` — אשאיר כמו שהיא.

### תוצאה צפויה
- דפי 404 ו-redirect לא יאונדקסו יותר
- דפי הבלוג יהיו נגישים ויקבלו structured data
- כל canonical URLs יצביעו ל-`www.karnafnadlan.com`
- הסלוגן "השקעות נדל״ן מבוססות נתונים" אחיד בכל מקום

