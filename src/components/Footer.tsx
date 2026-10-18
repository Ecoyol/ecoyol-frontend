import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/lib/router';
import { useLang } from '@/lib/i18n';

export function Footer() {
  const { lang } = useLang();

  const links = [
    { path: '/properties', en: 'Properties', ar: 'العقارات' },
    { path: '/services', en: 'Services', ar: 'الخدمات' },
    { path: '/about', en: 'About Ecoyol', ar: 'عن إيكويول' },
    { path: '/contact', en: 'Contact', ar: 'اتصل بنا' },
  ];

  return (
    <footer className="bg-charcoal-950 text-charcoal-300">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-bold text-charcoal-950">E</span>
            <span className="text-xl font-bold tracking-tight text-white">
              Eco<span className="text-gold-400">yol</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {lang === 'ar'
              ? 'منصة عقارية عراقية حديثة للتسويق العقاري والأتمتة.'
              : 'A modern Iraqi real estate technology platform for property marketing and automation.'}
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <span
                key={i}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-charcoal-700 text-charcoal-400 transition-colors hover:border-gold-500 hover:text-gold-400"
                aria-hidden
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {lang === 'ar' ? 'روابط سريعة' : 'Quick links'}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {links.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="transition-colors hover:text-gold-400">
                  {lang === 'ar' ? l.ar : l.en}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {lang === 'ar' ? 'تواصل' : 'Contact'}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-400" aria-hidden />
              <span dir="ltr">+964 XXX XXX XXXX</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-400" aria-hidden />
              hello@ecoyol.iq
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-400" aria-hidden />
              {lang === 'ar' ? 'بغداد، العراق' : 'Baghdad, Iraq'}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {lang === 'ar' ? 'ملاحظة' : 'Note'}
          </h3>
          <p className="mt-4 rounded-xl border border-charcoal-800 bg-charcoal-900 p-4 text-xs leading-relaxed">
            {lang === 'ar'
              ? 'هذا نموذج أولي بصري. جميع العقارات المعروضة هي بيانات تجريبية وليست عروضًا حقيقية أو مُتحقّقًا منها.'
              : 'This is a visual prototype. All listed properties are demo data and are not real or verified offers.'}
          </p>
        </div>
      </div>
      <div className="border-t border-charcoal-800 py-5">
        <p className="container-app text-center text-xs text-charcoal-500">
          © 2026 Ecoyol. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
