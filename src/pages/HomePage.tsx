import { useMemo, useState } from 'react';
import { Building2, LineChart, Megaphone, Search, ShieldCheck } from 'lucide-react';
import { Link } from '@/lib/router';
import { useLang } from '@/lib/i18n';
import { usePriceFormatter } from '@/lib/format';
import { PropertyCard, DemoTag } from '@/components/PropertyCard';
import { EmptyState } from '@/components/ui';
import {
  SAMPLE_PROPERTIES,
  GOVERNORATES,
  GOVERNORATE_CITIES,
  CITIES,
  PROPERTY_TYPES,
  SALE_BUDGET_STEPS_IQD,
  RENT_BUDGET_STEPS_IQD,
} from '@/data/sampleProperties';
import type { Governorate, PropertyType } from '@/data/properties';

function HomeSearch() {
  const { lang, t } = useLang();
  const fmt = usePriceFormatter();
  const [purpose, setPurpose] = useState<'any' | 'sale' | 'rent'>('any');
  const [type, setType] = useState<PropertyType | 'any'>('any');
  const [governorate, setGovernorate] = useState<Governorate | 'any'>('any');
  const [maxPrice, setMaxPrice] = useState('');

  const isRent = purpose === 'rent';
  const budgetSteps = isRent ? RENT_BUDGET_STEPS_IQD : SALE_BUDGET_STEPS_IQD;

  const go = () => {
    const params = new URLSearchParams();
    if (purpose !== 'any') params.set('purpose', purpose);
    if (type !== 'any') params.set('type', type);
    if (governorate !== 'any') params.set('governorate', governorate);
    if (maxPrice) params.set('maxPriceIqd', maxPrice);
    window.location.href = `/properties?${params.toString()}`;
  };

  const selectCls =
    'min-h-[46px] w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none [&>option]:text-charcoal-900';

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-charcoal-900/80 p-4 backdrop-blur sm:p-5">
      <div
        className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-charcoal-950/60 p-1"
        role="tablist"
        aria-label={lang === 'ar' ? 'نوع العرض' : 'Listing type'}
      >
        {(
          [
            ['any', lang === 'ar' ? 'الكل' : 'All'],
            ['sale', lang === 'ar' ? 'للبيع' : 'For Sale'],
            ['rent', lang === 'ar' ? 'للإيجار' : 'For Rent'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={purpose === key}
            onClick={() => {
              setPurpose(key);
              setMaxPrice('');
            }}
            className={`min-h-[40px] rounded-lg px-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
              purpose === key ? 'bg-gold-500 text-charcoal-950' : 'text-charcoal-300 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-charcoal-300">
            {lang === 'ar' ? 'المحافظة' : 'Governorate'}
          </span>
          <select
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value as Governorate | 'any')}
            className={selectCls}
          >
            <option value="any">{lang === 'ar' ? 'كل المحافظات' : 'All governorates'}</option>
            {Object.entries(GOVERNORATES).map(([k, v]) => (
              <option key={k} value={k}>
                {t(v)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-charcoal-300">
            {lang === 'ar' ? 'المدينة' : 'City'}
          </span>
          <select
            value={
              governorate !== 'any' && GOVERNORATE_CITIES[governorate].length === 1
                ? GOVERNORATE_CITIES[governorate][0]
                : 'any'
            }
            disabled={governorate === 'any'}
            className={`${selectCls} disabled:opacity-50`}
            aria-label={lang === 'ar' ? 'المدينة' : 'City'}
          >
            <option value="any">
              {governorate === 'any'
                ? lang === 'ar'
                  ? 'اختر المحافظة أولاً'
                  : 'Choose a governorate first'
                : GOVERNORATE_CITIES[governorate].length === 1
                  ? t(CITIES[GOVERNORATE_CITIES[governorate][0]])
                  : lang === 'ar'
                    ? 'كل المدن'
                    : 'All cities'}
            </option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-charcoal-300">
            {lang === 'ar' ? 'نوع العقار' : 'Property type'}
          </span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | 'any')}
            className={selectCls}
          >
            <option value="any">{lang === 'ar' ? 'كل الأنواع' : 'All types'}</option>
            {Object.entries(PROPERTY_TYPES).map(([k, v]) => (
              <option key={k} value={k}>
                {t(v)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-charcoal-300">
            {lang === 'ar' ? 'الميزانية القصوى (دينار عراقي)' : 'Max budget (IQD)'}
          </span>
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={selectCls}>
            <option value="">{lang === 'ar' ? 'بلا حد' : 'No limit'}</option>
            {budgetSteps.map((b) => (
              <option key={b} value={b}>
                {fmt.compact(b)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={go} className="btn-gold mt-4 min-h-[48px] w-full sm:w-auto">
        <Search className="h-4 w-4" aria-hidden />
        {lang === 'ar' ? 'ابحث' : 'Search'}
      </button>
    </div>
  );
}

function HowItHelps() {
  const { lang } = useLang();
  const items = [
    {
      icon: Search,
      en: 'Smart discovery',
      ar: 'اكتشاف ذكي',
      descEn: 'Filter demo listings by governorate, budget, and property type in seconds.',
      descAr: 'تصفح العروض التجريبية حسب المحافظة والميزانية ونوع العقار في ثوانٍ.',
    },
    {
      icon: ShieldCheck,
      en: 'Verified workflow',
      ar: 'آلية توثيق',
      descEn: 'Every listing is designed to pass a structured verification flow before going live.',
      descAr: 'كل عرض مصمم ليمر بآلية توثيق منظمة قبل النشر.',
    },
    {
      icon: Megaphone,
      en: 'Marketing built in',
      ar: 'تسويق مدمج',
      descEn: 'Professional presentation for every property — photos, details, and sharing tools.',
      descAr: 'عرض احترافي لكل عقار — صور وتفاصيل وأدوات مشاركة.',
    },
    {
      icon: LineChart,
      en: 'Market insight',
      ar: 'رؤى السوق',
      descEn: 'Understand pricing trends across Iraqi cities with clear, simple dashboards.',
      descAr: 'افهم اتجاهات الأسعار في المدن العراقية عبر لوحات واضحة وبسيطة.',
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          {lang === 'ar' ? 'كيف نساعدك' : 'How Ecoyol helps'}
        </p>
        <h2 className="section-title mt-2 max-w-2xl">
          {lang === 'ar' ? 'اكتشف العقار المناسب بثقة' : 'Discover the right property with confidence'}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, en, ar, descEn, descAr }) => (
            <div
              key={en}
              className="rounded-2xl border border-charcoal-100 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-charcoal-950 text-gold-400">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold text-charcoal-900">{lang === 'ar' ? ar : en}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                {lang === 'ar' ? descAr : descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  const { lang } = useLang();
  return (
    <section className="bg-charcoal-50 py-16 sm:py-20">
      <div className="container-app flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
            {lang === 'ar' ? 'للمكاتب والمسوقين' : 'For offices & marketers'}
          </p>
          <h2 className="section-title mt-2">
            {lang === 'ar' ? 'أدوات مصممة لمهنيي العقارات' : 'Tools built for real estate professionals'}
          </h2>
          <p className="mt-4 text-charcoal-600">
            {lang === 'ar'
              ? 'مكاتب العقارات والمسوقون المستقلون يمكنهم إدارة عروضهم، وتسويق عقاراتهم، وأتمتة متابعاتهم — كل ذلك من مكان واحد.'
              : 'Real estate offices and independent marketers can manage listings, market properties, and automate follow-ups — all from one place.'}
          </p>
          <Link to="/services" className="btn-outline mt-6">
            {lang === 'ar' ? 'استكشف الخدمات' : 'Explore services'}
          </Link>
        </div>
        <div className="grid w-full max-w-md grid-cols-2 gap-4">
          {[
            { icon: Building2, label: lang === 'ar' ? 'إدارة العروض' : 'Listing management' },
            { icon: Megaphone, label: lang === 'ar' ? 'حملات تسويقية' : 'Marketing campaigns' },
            { icon: LineChart, label: lang === 'ar' ? 'تحليلات السوق' : 'Market analytics' },
            { icon: ShieldCheck, label: lang === 'ar' ? 'مؤشرات الثقة' : 'Trust signals' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-charcoal-200 bg-white p-4 text-sm font-medium text-charcoal-800"
            >
              <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const { lang } = useLang();
  const featured = useMemo(() => SAMPLE_PROPERTIES.filter((p) => p.featured), []);

  return (
    <>
      <section className="relative overflow-hidden bg-charcoal-950 text-white">
        <img
          src="https://images.pexels.com/photos/11861957/pexels-photo-11861957.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-charcoal-950/70 to-charcoal-950" />
        <div className="container-app relative py-20 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
              {lang === 'ar' ? 'منصة العقارات العراقية' : 'Iraqi real estate platform'}
            </p>
            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {lang === 'ar' ? (
                <>
                  عقارات العراق، <span className="text-gold-400">بذكاء</span> وثقة
                </>
              ) : (
                <>
                  Iraq&apos;s properties, <span className="text-gold-400">smarter</span> and with trust
                </>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-300 sm:text-lg">
              {lang === 'ar'
                ? 'إيكويول تساعد المشترين والمستأجرين على اكتشاف العقارات، وتمنح مكاتب العقارات والمسوقين أدوات تسويق وأتمتة حديثة.'
                : 'Ecoyol helps buyers and renters discover properties, and gives real estate offices and marketers modern marketing and automation tools.'}
            </p>
          </div>
          <HomeSearch />
          <p className="mt-3 text-xs text-charcoal-400">
            {lang === 'ar'
              ? 'نموذج أولي: جميع النتائج بيانات تجريبية وليست عروضًا حقيقية.'
              : 'Prototype: all results are demo data, not real offers.'}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-app">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="section-title">{lang === 'ar' ? 'عقارات مميزة' : 'Featured properties'}</h2>
              <p className="mt-1 text-sm text-charcoal-500">
                {lang === 'ar' ? 'عروض تجريبية للعرض التقديمي' : 'Sample listings for demonstration'}
              </p>
            </div>
            <DemoTag />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          {featured.length === 0 && <EmptyState message="No featured demo properties." />}
          <div className="mt-8 text-center">
            <Link to="/properties" className="btn-outline">
              {lang === 'ar' ? 'عرض كل العقارات' : 'View all properties'}
            </Link>
          </div>
        </div>
      </section>

      <HowItHelps />
      <ServicesTeaser />

      <section className="bg-charcoal-950 py-16 text-white sm:py-20">
        <div className="container-app flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">
            {lang === 'ar' ? 'جاهز لتبدأ مع إيكويول؟' : 'Ready to get started with Ecoyol?'}
          </h2>
          <p className="max-w-xl text-charcoal-300">
            {lang === 'ar'
              ? 'تواصل مع فريقنا لمناقشة كيف يمكن للمنصة دعمك — سواء كنت مشتري أو مكتب عقاري.'
              : 'Talk to our team about how the platform can support you — whether you are a buyer or a real estate office.'}
          </p>
          <Link to="/contact" className="btn-gold">
            {lang === 'ar' ? 'اتصل بنا' : 'Contact us'}
          </Link>
        </div>
      </section>
    </>
  );
}
