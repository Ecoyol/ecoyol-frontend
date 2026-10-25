import { useEffect } from 'react';
import { LanguageProvider, useLang } from '@/lib/i18n';
import { RouterProvider, useRouter, Link } from '@/lib/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { PropertiesPage } from '@/pages/PropertiesPage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';

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

  if (path === '/') return <HomePage />;
  if (path === '/properties') return <PropertiesPage />;
  if (path.startsWith('/property/'))
    return <PropertyDetailPage slug={path.replace('/property/', '')} />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  return <NotFoundPage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes />
          </main>
          <Footer />
        </div>
      </RouterProvider>
    </LanguageProvider>
  );
}
