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
All sheet writes use `valueInputOption: RAW` so phone numbers keep their
leading zero. Sheet columns (A–Q): timestamp (Asia/Jerusalem), full name,
phone, email, product, form, page, full URL, referrer, utm_source,
utm_medium, utm_campaign, utm_content, utm_term, message, stage, equity.

## Spreadsheets

- משכנתא: `14Q29gU84mEJwOSLPQSCFYtmBAmKt_YnTBo0nuhgHWb0`
- ליווי משקיעים (משותף עם המלווה): `1KG3tw90wz0CmnhVI2qaLl7762IIKL7W5-6O0grn8pcg`
  ⚠️ pending Make re-route — the scenario still points at the old sheet
  `1ZZfQApTdo-jiikknf60T_t19KItut7y6bzZCSR-jXzw` until updated (see
  docs/ARCHITECTURE-CRM-INTEGRATIONS.md §3).
- הדרך לדירה: `1ZbSm_OVrSnh8_YZ760gVsB0yB4kt3xbCCfB390MZ8p0`
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
