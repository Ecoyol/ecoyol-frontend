import { Compass, HeartHandshake, Layers, ShieldCheck, Target } from 'lucide-react';
import { Link } from '@/lib/router';
import { useLang } from '@/lib/i18n';
import { PageHeader } from '@/components/ui';

export function AboutPage() {
  const { lang } = useLang();

  const values = [
    {
      icon: ShieldCheck,
      titleEn: 'Trust first',
      titleAr: 'الثقة أولاً',
      descEn: 'Clear information, honest presentation, and a verification-first mindset in everything we design.',
      descAr: 'معلومات واضحة وعرض صادق وعقلية التوثيق أولاً في كل ما نصممه.',
    },
    {
      icon: Compass,
      titleEn: 'Local understanding',
      titleAr: 'فهم محلي',
      descEn: 'Built for Iraqi cities, districts, and the way property is actually bought and rented here.',
      descAr: 'مصمم للمدن والأحياء العراقية وللطريقة الفعلية لبيع وتأجير العقارات هنا.',
    },
    {
      icon: Layers,
      titleEn: 'Technology with purpose',
      titleAr: 'تقنية بهدف',
      descEn: 'Automation and data only where they genuinely help buyers, renters, offices, and marketers.',
      descAr: 'الأتمتة والبيانات فقط حيث تُفيد فعلًا المشترين والمستأجرين والمكاتب والمسوقين.',
    },
    {
      icon: HeartHandshake,
      titleEn: 'Long-term partnerships',
      titleAr: 'شراكات طويلة الأمد',
      descEn: 'We grow with the offices and marketers who join the platform, not around them.',
      descAr: 'ننمو مع المكاتب والمسوقين المنضمين للمنصة، لا من حولهم.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'من نحن' : 'About'}
        title={lang === 'ar' ? 'عن إيكويول' : 'About Ecoyol'}
        subtitle={
          lang === 'ar'
            ? 'إيكويول منصة عقارية عراقية حديثة تجمع اكتشاف العقارات والتسويق والأتمتة في مكان واحد.'
            : 'Ecoyol is a modern Iraqi real estate platform bringing property discovery, marketing, and automation together in one place.'
        }
      />

      <section className="py-16 sm:py-20">
        <div className="container-app grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="section-title">{lang === 'ar' ? 'قصتنا' : 'Our story'}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-charcoal-700">
              <p>
                {lang === 'ar'
                  ? 'بدأت إيكويول من ملاحظة بسيطة: سوق العقارات في العراق يعتمد على التواصل الشخصي والقوائم غير المنظمة، ويحتاج إلى منصة تعكس جدية السوق وتطوره.'
                  : 'Ecoyol started from a simple observation: the Iraqi property market relies on personal contacts and unstructured spreads, and it needs a platform that reflects how serious the market has become.'}
              </p>
              <p>
                {lang === 'ar'
                  ? 'نحن نبني منصة تخدم طرفي السوق — الأشخاص الذين يبحثون عن منزل أو مكتب، والمكاتب والمسوقين الذين يعرضون هذه العقارات.'
                  : 'We are building a platform that serves both sides of the market — people looking for a home or office, and the offices and marketers presenting those properties.'}
              </p>
              <p className="rounded-xl border border-charcoal-200 bg-charcoal-50 p-4 text-sm text-charcoal-600">
                {lang === 'ar'
                  ? 'ملاحظة: هذه صفحة نموذج أولي بصري. الهوية الكاملة وبيانات الشركة الفعلية ستُضاف لاحقًا.'
                  : 'Note: this page is part of a visual prototype. Full identity and actual company details will be added later.'}
              </p>
            </div>
          </div>

          <div>
            <h2 className="section-title">{lang === 'ar' ? 'قيمنا' : 'Our values'}</h2>
            <div className="mt-6 space-y-4">
              {values.map(({ icon: Icon, titleEn, titleAr, descEn, descAr }) => (
                <div key={titleEn} className="flex gap-4 rounded-2xl border border-charcoal-100 bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-charcoal-950 text-gold-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-charcoal-900">{lang === 'ar' ? titleAr : titleEn}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                      {lang === 'ar' ? descAr : descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal-50 py-16 sm:py-20">
        <div className="container-app">
          <div className="mx-auto max-w-2xl rounded-3xl border border-charcoal-200 bg-white p-8 text-center sm:p-12">
            <Target className="mx-auto h-8 w-8 text-gold-600" aria-hidden />
            <h2 className="mt-4 text-xl font-bold text-charcoal-900 sm:text-2xl">
              {lang === 'ar' ? 'مهمتنا' : 'Our mission'}
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal-600">
              {lang === 'ar'
                ? 'أن نُيسّر على كل شخص في العراق اكتشاف العقار المناسب بثقة — وأن نمنح مكاتب العقارات والمسوقين أدوات رقمية بالمعايير العالمية.'
                : 'To make it easy for everyone in Iraq to discover the right property with confidence — and to give real estate offices and marketers world-class digital tools.'}
            </p>
            <Link to="/properties" className="btn-gold mt-8">
              {lang === 'ar' ? 'تصفح العقارات التجريبية' : 'Browse demo properties'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
