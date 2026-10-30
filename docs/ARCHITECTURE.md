# Ecoyol: architecture and standards

## Stack
Vite + React 18 + TypeScript + Tailwind. Supabase for Auth, Postgres (with RLS),
Storage and Edge Functions. Free-tier hosting (Cloudflare Pages or Vercel). PWA later.

## Layers
- `src/pages/`      One file per route. No data fetching logic beyond calling hooks.
- `src/components/` Reusable UI. No Supabase calls.
- `src/lib/`        Cross-cutting code: i18n (EN/AR, RTL), router, formatting.
- `src/data/`       Types and demo data. Demo data is replaced by Supabase queries.
- Planned: `src/features/<name>/` (properties, leads, crm, auth, ai) holding that
  feature's pages, hooks, api and types, once the CRM code is recovered.
- `crm-pending/`    CRM + Supabase code awaiting recovery. NOT compiled.
- `supabase/migrations/` Reviewed, additive SQL only. Never edited after applying.

## Rules
1. Secrets: only the public anon key lives in `.env` (see `.env.example`).
   The service_role key, AI keys and WhatsApp tokens exist only in Supabase
   Edge Function secrets, never in the frontend, repo or browser storage.
2. Security is enforced by Row Level Security in Postgres, never by hiding UI.
   Roles live in a `profiles` table; `RoleGate` is cosmetic only.
3. Every database change is a migration file, reviewed and approved before it runs.
   No destructive SQL on production without explicit approval.
4. Data access goes through one api module per feature, with typed results and
   error handling. No fire-and-forget writes.
5. Mobile-first: design for ~390px width, then scale up. Arabic/RTL must work on
   every new screen. Prices are in IQD via `lib/format.ts`.
6. Every PR must pass CI (typecheck, lint, build) before merge.
7. Work happens on branches and PRs. `main` always builds.

## Target data model (draft, to be validated against the real Supabase schema)
profiles (user, role, office_id), offices, marketers, properties, property_images,
clients (leads), interactions, tasks, campaigns, ai_content.
Roles: admin, office_manager, marketer, employee.
