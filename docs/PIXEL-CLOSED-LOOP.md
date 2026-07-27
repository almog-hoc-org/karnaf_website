# סגירת לולאת המדידה — Purchase בדף התודה + לולאה מלאה

מסמך תפעולי בעברית פשוטה: איך לוודא שכל קליק ופעולה של ליד נתפסים ומסווגים,
ואיך סוגרים את החוליה החסרה — אירוע ה-**Purchase** שקורה בדף הסליקה של
Schooler (רב מסר) או Grow (משולם), מחוץ לאתר שלנו.

**מזהה הפיקסל:** `1659334891302781`
**רקע:** ראו `META-PIXEL.md` (מה האתר מודד) ו-`docs/ARCHITECTURE-CRM-INTEGRATIONS.md`
(הזרימה המלאה מול ה-CRM).

---

## למה צריך את זה?

הפיקסל של האתר יורה רק בדפים של `karnafnadlan.com`. ברגע שהגולש עובר לדף
הסליקה של Schooler/Grow — הפיקסל שלנו כבר לא שם, ולכן **הרכישה עצמה
(`Purchase`) לא נמדדת**. התוצאה: אנחנו יודעים מי *לחץ* לקנות
(`InitiateCheckout`) אבל לא מי *שילם* — וזו ההמרה שהכי חשוב לפרסום.

הפתרון: להדביק פיקסל קטן **בדף התודה** (העמוד שהלקוח רואה אחרי תשלום מוצלח),
שיורה `Purchase`. האתר כבר מעביר לדף הסליקה את כל מה שהסניפט צריך כדי
שהרכישה תשויך לאותו אדם ולאותה מודעה.

---

## מה האתר כבר מעביר לכתובת הסליקה (אוטומטי)

בכל לחיצה על כפתור רכישה, `buildCheckoutUrl()` (בקובץ `src/lib/checkout.ts`)
מוסיף לכתובת של Schooler/Grow את הפרמטרים הבאים, כשהם קיימים — **בלי לדרוס**
פרמטרים שכבר בכתובת:

| פרמטר | מה זה | לְמה משמש בדף התודה |
|---|---|---|
| `_fbp` | מזהה הדפדפן של הפיקסל | לתפור את הרכישה לאותו גולש |
| `_fbc` | מזהה קליק המודעה (נגזר מ-`fbclid`) | לשייך את הרכישה למודעה שהביאה אותו |
| `karnaf_value` | ‏950 (מחיר ברירת מחדל) | ערך הרכישה, אם אין משתנה סכום מהפלטפורמה |
| `currency` | `ILS` | מטבע |
| `fbclid` / `gclid` / `ttclid` | מזהי קליק פרסומי | שיוך פרסומי |
| `utm_*` | קמפיין first-touch | שיוך קמפיין |
| `quiz_*` | תשובות שאלון ההתאמה | סיווג הלקוח ב-CRM |
| `ga_cid` | מזהה GA4 | לדיווח רכישה ל-GA4 (צעד המשך, סעיף בהמשך) |

---

## סניפט דף התודה — Schooler / רב מסר

בהגדרות דף התודה (Thank-You / דף אחרי-תשלום) של המוצר ב-Schooler, בחלק שמאפשר
להדביק **קוד HTML / סקריפט מעקב**, להדביק את הבלוק הזה:

```html
<!-- Meta Pixel base -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');

  (function () {
    var q = new URLSearchParams(window.location.search);
    var fbp = q.get('_fbp');
    var fbc = q.get('_fbc');
    // אם Schooler מזריקה מזהה עסקה/סכום למשתנה בדף — עדיפים אותם.
    var orderId = q.get('order_id') || q.get('tid') || ('order-' + Date.now());
    var value  = parseFloat(q.get('karnaf_value') || '950');
    var initData = {};
    if (fbp) initData.fbp = fbp;
    if (fbc) initData.fbc = fbc;

    fbq('init', '1659334891302781', initData);
    fbq('track', 'PageView');
    fbq('track', 'Purchase', {
      content_name: 'המדריך המעשי לרכישת דירה — התוכנית הדיגיטלית',
      content_category: 'רכישה',
      content_ids: ['derech-ladira'],
      content_type: 'product',
      currency: q.get('currency') || 'ILS',
      value: value
    }, { eventID: orderId });
  })();
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1659334891302781&ev=Purchase&noscript=1" /></noscript>
```

**חשוב:**
- `eventID` = מזהה ההזמנה. אם Schooler חושפת משתנה של מספר הזמנה — להשתמש בו
  (מחליף את `order_id`/`tid` בקוד). זה גם המפתח שימנע ספירה כפולה אם בעתיד
  נוסיף גם Purchase צד-שרת (CAPI).
- אם הפלטפורמה מאפשרת להזריק את **סכום התשלום בפועל** למשתנה — עדיף אותו על
  פני `karnaf_value` (חשוב אם יש קופונים/הנחות).

---

## סניפט דף התודה — Grow / משולם

זהה במהות. ב-Grow מדביקים את הקוד ב"עמוד תודה מותאם" או בהגדרות ה-Tracking של
העמוד. אותו בלוק בדיוק — רק ששמות המשתנים של מספר ההזמנה והסכום עשויים
להשתנות. אם Grow מספקת placeholders (למשל `{{transaction_id}}` /
`{{amount}}`), להשתמש בהם:

```js
    var orderId = '{{transaction_id}}' || q.get('order_id') || ('order-' + Date.now());
    var value   = parseFloat('{{amount}}' || q.get('karnaf_value') || '950');
```

(שאר הבלוק זהה לסניפט של Schooler.)

---

## הפעלת Automatic Advanced Matching (בלי קוד)

ב-[Events Manager](https://business.facebook.com/events_manager2) → בחירת הפיקסל
→ Settings → **Automatic Advanced Matching** → להדליק. זה משפר את אחוז ההתאמה
של כל האירועים (Lead, Purchase) לאנשים אמיתיים. באתר אנחנו כבר שולחים התאמה
ידנית עם טלפון/מייל בכל שליחת טופס (`setAdvancedMatching` ב-`src/lib/pixel.ts`).

---

## קהל "לחצו ולא קנו" (רימרקטינג — ב-Ads Manager)

אחרי שה-Purchase יורה, אפשר לבנות את הקהל הכי שווה:
**Custom Audience** = מי שירה `InitiateCheckout` ב-30 הימים האחרונים **פחות**
מי שירה `Purchase` ב-30 הימים האחרונים. אלה אנשים שלחצו לקנות ולא השלימו —
טירגוט המשך אליהם הוא ההחזר הגבוה ביותר.

---

## מפת אירועים מלאה — לעבודה עם הדאטה

| אירוע (Meta) | מתי נורה | שם/סיווג בעברית | היכן בקוד |
|---|---|---|---|
| `PageView` | כל מעבר עמוד | שם העמוד | `PixelTracker.tsx` |
| `ViewContent` | כניסה ל-/course או /premium | "עמוד שירות" | `pixel.ts` |
| `Lead` ⭐ | שליחת טופס מוצלחת | שם הטופס + קטגוריה | `leadSubmission.ts` |
| `Contact` | קליק וואטסאפ/טלפון/מייל | הערוץ | `PixelTracker.tsx` |
| `InitiateCheckout` | קליק על כפתור רכישה | מיקום הכפתור (`cta_location`) | `pixel.ts` |
| **`Purchase`** ⭐ | **דף התודה של Schooler/Grow** | ‏₪950, מזהה הזמנה | **הסניפט למעלה** |
| `לחיצה_על_כפתור` | כפתור/קישור חיצוני חשוב | טקסט הכפתור | `PixelTracker.tsx` |
| `רשת_חברתית` | קליק אייקון סושיאל | הרשת | `PixelTracker.tsx` |
| `עומק_גלילה` | 25/50/75/100% | האחוז | `PixelTracker.tsx` |

> כל האירועים משוכפלים גם ל-GA4 (ראו `src/lib/analytics.ts`). ההמרה
> להגדיר במטא כ-Conversion: `Lead` (לידים) ו-`Purchase` (מכירות קורס).

---

## צעד המשך אנליטי (לא חוסם) — Purchase ל-GA4

הרכישה קורית מחוץ ל-GA4, בדיוק כמו במטא. הפתרון המקביל: ה-webhook של Schooler
ב-CRM ישלח `purchase` ל-GA4 Measurement Protocol עם ה-`ga_cid` שהאתר העביר —
כך גם המשפך ב-Google Analytics נסגר וניתן להכריע ניסויי A/B לפי רכישות
אמיתיות. הפירוט המלא ב-`docs/ARCHITECTURE-CRM-INTEGRATIONS.md` §4.2.1.

---

## צ׳קליסט הפעלה (בעלים)

- [ ] להדביק את סניפט דף התודה ב-Schooler (ובמידת הצורך ב-Grow).
- [ ] לוודא ב-[Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
      שרכישת בדיקה יורה `Purchase` פעם אחת עם ערך ומזהה עסקה.
- [ ] להדליק Automatic Advanced Matching ב-Events Manager.
- [ ] להגדיר `Purchase` ו-`Lead` כ-Conversions.
- [ ] לבנות את קהל "לחצו ולא קנו".
