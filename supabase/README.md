# Supabase

Put database migrations in `migrations/` (one SQL file per change, additive only).
Nothing here is applied automatically. Review every migration before running it.
Export the current structure with: `supabase db dump --schema-only`
Never commit keys. Only the public anon key belongs in `.env` (see `.env.example`).
