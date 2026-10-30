# CRM code waiting to be recovered (NOT compiled)

This folder sits outside `src/` on purpose so the public site builds cleanly.

Contains the Supabase/CRM layer from the old `ecoyol-real-estate/` copy:
- `lib/supabase.ts`, `lib/clientsApi.ts`, `lib/crmContext.tsx`, `lib/roles.tsx`
- `lib/router.with-onClick.tsx` (router variant with an `onClick` prop on Link)
- `App.with-crm.tsx` (routes for /crm/*)

Still MISSING from the repository (never uploaded from Bolt):
- `src/data/crm.ts`
- `src/pages/crm/` : CrmDashboardPage, CustomersPage, CustomerDetailPage,
  MatchingPage, PropertiesDbPage, TasksPage, EmployeesPage, MarketingPage, SettingsPage

Once recovered, move these into `src/` and merge `App.with-crm.tsx`.
Known issues to fix first: no authentication (role is chosen in the browser),
and `seedSampleClients` writes demo rows to the production `clients` table.
