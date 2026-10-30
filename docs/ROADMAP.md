# Roadmap (priority order)

- [ ] 0. Unify repo to one project at the root; CI green; recover CRM pages from Bolt
- [ ] 1. Security: Supabase Auth, `profiles` roles, RLS on every table, protect /crm
- [ ] 2. Move demo data (properties, employees, tasks, interactions, campaigns) to Supabase
- [ ] 3. Public listings from DB, image upload (Storage), Postgres search and filters
- [ ] 4. Offices and marketers (tables, roles, per-office access)
- [ ] 5. Contact form saves leads to `clients`; notifications
- [ ] 6. AI marketing content via Edge Function (key stays server-side)
- [ ] 7. Automation and WhatsApp Cloud API
- [ ] 8. PWA for iPhone, SEO, tests, production hosting

Known issues to fix early: contact form does not submit anywhere, placeholder
WhatsApp number (964000000000), default language is English, placeholder og:image
and favicon, `seedSampleClients` must not write demo rows to production.
