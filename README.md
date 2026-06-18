# Aurevia Global

Marketing & lead-generation website for **Aurevia Global**, a premium B2B apparel
manufacturer (private label, medical, workwear, activewear).

> Built to Deliver. Made to Lead.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Framer Motion** (`motion`) for scroll reveals
- **Prisma 6 + PostgreSQL** for quote-request storage
- **Resend** for lead notification emails (optional)
- **lucide-react** icons

## Getting started

```bash
npm install
cp .env.example .env   # then edit values
npx prisma migrate dev # create the database schema
npm run dev            # http://localhost:3000
```

### Environment variables

| Variable             | Required | Purpose                                          |
| -------------------- | -------- | ------------------------------------------------ |
| `DATABASE_URL`       | yes      | PostgreSQL connection string                     |
| `RESEND_API_KEY`     | no       | Enables lead emails; form still works without it |
| `LEADS_NOTIFY_EMAIL` | no       | Recipient for new-lead emails                    |
| `LEADS_FROM_EMAIL`   | no       | Verified Resend sender                           |
| `ADMIN_USERNAME`     | no       | Username for the `/admin` lead viewer (def `admin`) |
| `ADMIN_PASSWORD`     | no       | Password for the `/admin` lead viewer            |

## Project structure

```
src/
  app/                 # routes (home, about, capabilities, products, private-label, contact, admin)
    contact/actions.ts # server action: validate -> save -> notify
    admin/             # cookie-gated lead inbox
  components/          # header, footer, hero, sections, quote form, UI primitives
  content/             # typed content modules (single source of truth for copy)
  lib/                 # db client, zod validation, resend helper, utils
prisma/schema.prisma   # QuoteRequest model
```

## Editing content

All site copy lives in `src/content/*` (company info, stats, capabilities,
products, regions, private-label process). Update those files — no CMS required.

## Leads

Submissions are validated with Zod, written to the `QuoteRequest` table, and (if
`RESEND_API_KEY` is set) emailed to `LEADS_NOTIFY_EMAIL`. View them at `/admin`
(sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`) or with `npx prisma studio`.

## Deployment

Deploy to **Vercel**. Provision a Postgres database (Neon / Vercel Postgres), set
the env vars above, and run `npx prisma migrate deploy` on release.

## Notes

- The logo is a placeholder SVG (`src/components/logo.tsx`); swap in the brand
  asset when available.
- Product/factory imagery uses brand styling only; add real photography under
  `public/` and wire it into the heroes and product pages.
- The source deck displayed third-party brand logos for illustration; this site
  shows an "industries served" strip instead to avoid trademark issues.
```
