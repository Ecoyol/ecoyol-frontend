import { useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import { Link, useRouter } from '@/lib/router';
import { useLang } from '@/lib/i18n';

const NAV_ITEMS = [
  { path: '/', en: 'Home', ar: 'الرئيسية' },
  { path: '/properties', en: 'Properties', ar: 'العقارات' },
  { path: '/services', en: 'Services', ar: 'خدماتنا' },
  { path: '/about', en: 'About', ar: 'من نحن' },
  { path: '/contact', en: 'Contact', ar: 'اتصل بنا' },
];

export function Navbar() {
  const { lang, toggleLang } = useLang();
  const { path } = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (itemPath: string) =>
    itemPath === '/' ? path === '/' : path.startsWith(itemPath);

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal-100 bg-white/90 backdrop-blur">
      <nav className="container-app flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" className="flex items-center gap-2" ariaLabel="Ecoyol home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-charcoal-950 font-bold text-gold-400">E</span>
          <span className="text-xl font-bold tracking-tight text-charcoal-950">
            Eco<span className="text-gold-600">yol</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                  isActive(item.path)
                    ? 'bg-charcoal-50 text-charcoal-950'
                    : 'text-charcoal-600 hover:bg-charcoal-50 hover:text-charcoal-950'
                }`}
              >
                {lang === 'ar' ? item.ar : item.en}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-lg border border-charcoal-200 px-3 py-2 text-sm font-medium text-charcoal-700 transition-colors hover:border-gold-500 hover:text-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
          >
            <Languages className="h-4 w-4" aria-hidden />
            {lang === 'en' ? 'العربية' : 'EN'}
          </button>
          <Link
            to="/contact"
            className="hidden rounded-lg bg-charcoal-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-charcoal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 md:inline-flex"
          >
            {lang === 'ar' ? 'احجز استشارة' : 'Get in touch'}
          </Link>
          <button
            className="rounded-lg p-2 text-charcoal-700 hover:bg-charcoal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-charcoal-100 bg-white md:hidden">
          <ul className="container-app flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-charcoal-50 text-charcoal-950'
                      : 'text-charcoal-600 hover:bg-charcoal-50'
                  }`}
                >
                  {lang === 'ar' ? item.ar : item.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
