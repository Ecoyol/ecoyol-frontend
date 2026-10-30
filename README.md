# Ecoyol — Iraqi Real Estate Platform (Frontend)

A modern, bilingual (English / Arabic) real estate platform prototype for the Iraqi market, built with React, TypeScript, Vite, and Tailwind CSS.

> **Note:** This is a visual prototype. All property listings, prices, contact details, and images are **demo data only** and do not represent real or verified offers.

## Features

- **Bilingual interface** — full English (LTR) and Arabic (RTL) support with a language toggle
- **IQD pricing** — all amounts in Iraqi dinars with compact and full formatting
- **Location filters** — Iraqi governorates (Baghdad first) and cities
- **Sale / rent separation** — dedicated tabs and purpose-specific budget ranges
- **Working search & filters** — property type, budget range, bedrooms, district search
- **Property detail pages** — specs, pricing, related demo listings
- **Responsive, mobile-first design** — premium charcoal / white / gold identity

## Pages

| Route | Description |
| --- | --- |
| `/` | Home with hero, search, featured properties |
| `/properties` | Listings with filters and sale/rent tabs |
| `/property/:slug` | Property detail view |
| `/services` | Marketing & automation services |
| `/about` | About Ecoyol |
| `/contact` | Contact form + WhatsApp button |

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build      # production build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Project structure

```
src/                 # Public site (builds today)
  components/        # Navbar, Footer, PropertyCard, shared UI states
  data/              # Property types + clearly-labelled demo listings
  lib/               # i18n (EN/AR + RTL), routing, IQD formatting
  pages/             # One file per page
crm-pending/         # CRM + Supabase code awaiting recovery (not compiled)
supabase/migrations/ # Reviewed, additive SQL migrations (empty for now)
.env.example         # Required env vars (copy to .env, never commit .env)
```

## Roadmap

- Replace demo data with a real backend (Supabase planned)
- Authentication, payments, and messaging integrations
- Real verification workflow for listings

## License

Proprietary — © 2026 Ecoyol. All rights reserved.

## Development

```
nvm use          # Node 20
npm install
cp .env.example .env   # fill the public Supabase URL and anon key
npm run dev
npm run typecheck && npm run lint && npm run build
```

See `docs/ARCHITECTURE.md` for standards and `docs/ROADMAP.md` for the plan.
