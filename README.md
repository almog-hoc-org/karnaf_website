# קרנף נדל"ן

אתר קרנף נדל"ן — ידע והשקעות נדל"ן מבוססות נתונים.

שני מסלולים: **"הדרך לדירה"** — הקורס הדיגיטלי לרכישת דירה (self-serve,
רכישה ישירה בדף סליקה של Schooler), ו**ליווי משקיעים פרימיום** — 1:1 עד
חתימה על נכס (טופס לידים → karnaf-crm + Google Sheets).

## Tech Stack

- React 18 + TypeScript + Vite (SSG via `vite-react-ssg`)
- Tailwind CSS + shadcn/ui
- Framer Motion (אנימציות — ללא GSAP/Lenis, הוסרו בכוונה; ראו docs/UPGRADE.md)
- Vercel (hosting) · לידים נשלחים ל-karnaf-crm (Supabase edge fn חיצונית) + Make.com

## Development

```bash
npm install
npm run dev        # dev server on port 8080
```

## Build

```bash
npm run build      # vite-react-ssg build + postbuild (preload cleanup, sitemap)
npm run lint
```

## Docs

- `CLAUDE.md` — הנחיות עבודה על הריפו
- `DESIGN.md` — מערכת העיצוב
- `docs/UPGRADE.md` — היסטוריית שדרוג הביצועים וההמרות
- `docs/LEADS.md` — צינור הלידים (טפסים → CRM + Sheets)
- `docs/ARCHITECTURE-CRM-INTEGRATIONS.md` — חוזי אינטגרציה לצוות karnaf-crm
- `docs/CONTENT-KIT.md` — ערכת תוכן להפצה שקופה
