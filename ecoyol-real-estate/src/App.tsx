import { useEffect } from 'react';
import { LanguageProvider, useLang } from '@/lib/i18n';
import { RouterProvider, useRouter, Link } from '@/lib/router';
import { CrmProvider } from '@/lib/crmContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { PropertiesPage } from '@/pages/PropertiesPage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { CrmDashboardPage } from '@/pages/crm/CrmDashboardPage';
import { CustomersPage } from '@/pages/crm/CustomersPage';
import { CustomerDetailPage } from '@/pages/crm/CustomerDetailPage';
import { MatchingPage } from '@/pages/crm/MatchingPage';
import { PropertiesDbPage } from '@/pages/crm/PropertiesDbPage';
import { TasksPage } from '@/pages/crm/TasksPage';
import { EmployeesPage } from '@/pages/crm/EmployeesPage';
import { MarketingPage } from '@/pages/crm/MarketingPage';
import { SettingsPage } from '@/pages/crm/SettingsPage';

function NotFoundPage() {
  const { lang } = useLang();
  return (
    <div className="container-app flex flex-col items-center gap-4 py-32 text-center">
      <p className="text-6xl font-bold text-gold-500">404</p>
      <h1 className="text-xl font-semibold text-charcoal-900">
        {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page not found'}
      </h1>
      <Link to="/" className="btn-gold">
        {lang === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
      </Link>
    </div>
  );
}

function Routes() {
  const { path } = useRouter();
  const { dir, lang } = useLang();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  // CRM routes — wrapped in CrmProvider
  if (path === '/crm') return <CrmDashboardPage />;
  if (path === '/crm/customers') return <CustomersPage />;
  if (path.startsWith('/crm/customers/')) return <CustomerDetailPage id={path.replace('/crm/customers/', '')} />;
  if (path === '/crm/matching') return <MatchingPage />;
  if (path === '/crm/properties') return <PropertiesDbPage />;
  if (path === '/crm/tasks') return <TasksPage />;
  if (path === '/crm/employees') return <EmployeesPage />;
  if (path === '/crm/marketing') return <MarketingPage />;
  if (path === '/crm/settings') return <SettingsPage />;

  // Public site routes
  if (path === '/') return <HomePage />;
  if (path === '/properties') return <PropertiesPage />;
  if (path.startsWith('/property/')) return <PropertyDetailPage slug={path.replace('/property/', '')} />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  return <NotFoundPage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <CrmProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes />
            </main>
            <Footer />
          </div>
        </CrmProvider>
      </RouterProvider>
    </LanguageProvider>
  );
}
