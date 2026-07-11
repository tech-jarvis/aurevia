# Aurevia Global

Marketing & lead-generation website for **Aurevia Global**, a premium B2B apparel
manufacturer (private label, medical, workwear, activewear).

> Built to Deliver. Made to Lead.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Framer Motion** (`motion`) for scroll reveals
- **Prisma 6 + PostgreSQL** for quote-request storage and editable site content
- **Vercel Blob** for admin-uploaded images (optional; text edits work without it)
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
| `BLOB_READ_WRITE_TOKEN` | no    | Enables image uploads from `/admin/content`      |

## Project structure

```
src/
  app/                 # routes (home, about, capabilities, products, private-label, contact, admin)
    contact/actions.ts # server action: validate -> save -> notify
    admin/             # cookie-gated lead inbox
    admin/content/     # cookie-gated section-name & image editor
  components/          # header, footer, hero, sections, quote form, UI primitives
  content/             # typed content modules (fallback copy, overridable from /admin/content)
  lib/                 # db client, zod validation, resend/blob helpers, editable-content getters, utils
prisma/schema.prisma   # QuoteRequest, PageHero, SectionHeading, SiteImage models
```

## Editing content

Most site copy lives in `src/content/*` (stats, capabilities, products, regions,
private-label process) — update those files, no CMS required.

Hero eyebrows/titles/leads, section headings, and photos (plus the logo) are
admin-editable at **`/admin/content`** (sign in with `ADMIN_USERNAME` /
`ADMIN_PASSWORD`). Edits are stored in Postgres and override the defaults in
`src/content/*`; image uploads go to Vercel Blob and require
`BLOB_READ_WRITE_TOKEN`.

## Leads

Submissions are validated with Zod, written to the `QuoteRequest` table, and (if
`RESEND_API_KEY` is set) emailed to `LEADS_NOTIFY_EMAIL`. View them at `/admin`
(sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`) or with `npx prisma studio`.

## Deployment

Deploy to **Vercel**. Provision a Postgres database (Neon / Vercel Postgres), set
the env vars above, and run `npx prisma migrate deploy` on release.

## Notes

- The logo is a placeholder SVG (`src/components/logo.tsx`) until an admin
  uploads a brand asset via `/admin/content`.
- Product/factory imagery uses brand styling only; replace it with real
  photography via `/admin/content`, or by editing `public/photos/*` and the
  defaults in `src/lib/site-content.ts`.
- The source deck displayed third-party brand logos for illustration; this site
  shows an "industries served" strip instead to avoid trademark issues.
