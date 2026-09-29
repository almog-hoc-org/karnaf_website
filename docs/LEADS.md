# Lead pipeline — where every lead goes

Updated: July 2026. All automation lives in the owner's Make.com account
(team "My Team", org "karnf") and this repo's client code.

## Flow map

| Source | → CRM (karnaf_crm) | → Google Sheet (per-product backup) |
|---|---|---|
| Website forms (karnafnadlan.com) | ✅ direct from browser, enriched | ✅ via Make webhook, routed by product |
| Rav Messer mortgage landing page | ✅ via Make → `make-intake` | ✅ mortgage sheet |
| Facebook Lead Ads | ✅ via Make → `make-intake` (pre-existing) | — (not wired; owner decision pending) |

## Website forms (this repo)

`src/lib/leadSubmission.ts` sends every lead to **two** places:

1. **CRM intake** — `VITE_LEADS_INTAKE_URL` (default: the production
   `website-leads-intake` Supabase function). Payload includes name/phone/
   email/service/source plus classification & attribution extras:
   `product`, `product_label`, `page_path`, `page_url`, `landing_page`,
   `referrer`, and all `utm_*` parameters (captured first-touch per session
   by `src/lib/leadContext.ts`).
2. **Sheets mirror** — `VITE_LEADS_SHEETS_WEBHOOK_URL` (default: the Make
   webhook below). Fired *before* the CRM call with `keepalive`, fully
   best-effort — it can never block the form UX, and a CRM outage cannot
   lose a lead.

**When is a lead "sent"?** When either channel accepted it. A CRM 4xx
(invalid email, missing name) is a real refusal and the form shows the
error. A CRM outage (5xx, network, rate limit) is not the visitor's
problem: if Make accepted the lead within 6 seconds, the form continues to
`/thank-you` and the Lead conversion fires. The lead is then **only in the
sheets**, not in the CRM, so while the CRM is down, check the sheets.
Only when both channels fail does the visitor see an error.

Product classification (`productFor` in leadSubmission.ts):
- source `mortgage` → mortgage sheet
- source `premium-investors` → premium-investors sheet
- everything else (course, webinar, general contact) → course sheet,
  with the actual variant spelled out in the "מוצר" column

## Make.com scenarios

| Scenario | Trigger | Writes to |
|---|---|---|
| קרנף — לידים מהאתר → גיליונות גיבוי | webhook `l8rrywal…` | 3 product sheets (router by `product`) |
| רב מסר (ייעוץ משכנתא) → גיליון משכנתא + CRM | webhook `ue91by…` (configure in Rav Messer) | mortgage sheet + CRM `make-intake` |
| FB Lead Ads → Karnaf CRM (x2 pages) | Facebook Lead Ads | CRM `make-intake` |

Sheets connection: "Google Sheets — לידים מהאתר" (karnaf.yazamut@gmail.com).
All sheet writes use `valueInputOption: RAW`. Sheet columns (A–Q):
timestamp (Asia/Jerusalem), full name, phone, email, product, form, page,
full URL, referrer, utm_source, utm_medium, utm_campaign, utm_content,
utm_term, message, stage, equity.

The one exception is the shared investor-accompaniment file, which is a
hand-kept working document with its own 9-column Hebrew layout — the
premium route writes it a second, differently-mapped row (see below and
docs/ARCHITECTURE-CRM-INTEGRATIONS.md §3).

Note: `RAW` does **not** in practice preserve a phone's leading zero —
Sheets still parses `0501234567` as a number. Format the phone column as
plain text in the sheet itself if that matters.

## Spreadsheets

- משכנתא: `14Q29gU84mEJwOSLPQSCFYtmBAmKt_YnTBo0nuhgHWb0`
- ליווי משקיעים — two destinations, both written on every premium lead:
  - backup, full A–Q layout: `1ZZfQApTdo-jiikknf60T_t19KItut7y6bzZCSR-jXzw`
  - shared with the accompaniment partner, "קובץ לידים ומעקב משותף קרנף שחר":
    `1KG3tw90wz0CmnhVI2qaLl7762IIKL7W5-6O0grn8pcg` — its own column layout
    (שם פרטי / שם משפחה / הון עצמי / איפה פנה / מתי פנה / מספר טלפון /
    פרטים נוספים), with the two manual columns left untouched. Wired and
    verified end-to-end 9.9.2026.
- המדריך המעשי לרכישת דירה (לשעבר ״הדרך לדירה״): `1ZbSm_OVrSnh8_YZ760gVsB0yB4kt3xbCCfB390MZ8p0`
- מערכת המחקר (`product=research`, waitlist): sheet + Make route TBD —
  until routed, these leads reach the CRM only.

These double as the partner-sharing surface — share a sheet, not CRM access.

## Adding a new product/funnel later

1. Create a sheet, copy the header row from an existing one.
2. Add a route in the "קרנף — לידים מהאתר" Make scenario (filter on a new
   `product` value) or a new webhook+scenario for an external funnel.
3. If it's a website form: add the source to `FORM_LABELS` in
   `src/lib/pixel.ts` and a branch in `productFor` in
   `src/lib/leadSubmission.ts`.

## הסכמה לדיוור (ספטמבר 2026)

כל טופס לידים באתר (צור קשר / פוטר / משכנתא / וובינר, ליווי משקיעים, רשימת
ההמתנה) כולל תיבת סימון **לא מסומנת מראש** להסכמה לדיוור (חוק התקשורת,
סעיף 30א). הנוסח מוגדר פעם אחת ב-`src/lib/consent.ts` ונשלח עם הליד:

| לאן | שדות |
|---|---|
| karnaf-crm | `marketing_consent` (true/false), `marketing_consent_text`, `marketing_consent_version`, `marketing_consent_at` |
| Make → גיליונות הגיבוי | עמודות R–T: הסכמה לדיוור (כן/לא) · נוסח ההסכמה · זמן ההסכמה (ISO) |
| Make → הגיליון המשותף (ליווי) | בעמודת "פרטים נוספים": `דיוור: כן/לא` |

**לשלוח דיוור רק למי שמסומן "כן".** בקשת הסרה ("הסר") — לעדכן את הסטטוס ב-CRM
ולהפסיק לשלוח. אם הנוסח משתנה — לעדכן את `MARKETING_CONSENT_VERSION`.

