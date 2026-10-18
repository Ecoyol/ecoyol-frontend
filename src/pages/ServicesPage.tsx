import {
  BarChart3,
  Bot,
  Building2,
  Camera,
  Megaphone,
  MessageSquare,
  Presentation,
} from 'lucide-react';
import { Link } from '@/lib/router';
import { useLang } from '@/lib/i18n';
import { PageHeader, WhatsAppButton } from '@/components/ui';

export function ServicesPage() {
  const { lang } = useLang();

  const services = [
    {
      icon: Megaphone,
      en: 'Property marketing campaigns',
      ar: 'حملات التسويق العقاري',
      descEn: 'Structured campaigns for individual properties or full portfolios, across digital channels.',
      descAr: 'حملات منظمة لعقار واحد أو محفظة كاملة، عبر القنوات الرقمية.',
    },
    {
      icon: Camera,
      en: 'Professional listing presentation',
      ar: 'عرض احترافي للعقارات',
      descEn: 'Photo guidance, layout tips, and copy structure that make every listing clear and appealing.',
      descAr: 'إرشادات التصوير ونصائح التنسيق وصياغة النصوص لجعل كل عرض واضحًا وجذابًا.',
    },
    {
      icon: Bot,
      en: 'Automation for real estate teams',
      ar: 'أتمتة لفرق العقارات',
      descEn: 'Automated follow-ups, enquiry routing, and status updates so no lead slips through.',
      descAr: 'متابعات تلقائية وتوجيه للاستفسارات وتحديثات للحالة حتى لا يفوتك أي عميل.',
    },
    {
      icon: BarChart3,
      en: 'Market & pricing insight',
      ar: 'رؤى السوق والأسعار',
      descEn: 'Simple dashboards that show enquiry activity and pricing context for your area.',
      descAr: 'لوحات بسيطة تعرض نشاط الاستفسارات وسياق الأسعار في منطقتك.',
    },
    {
      icon: MessageSquare,
      en: 'Enquiry management',
      ar: 'إدارة الاستفسارات',
      descEn: 'One inbox for buyer and renter enquiries, organised per listing and per agent.',
      descAr: 'صندوق واحد لاستفسارات المشترين والمستأجرين، منظم حسب العقار وحسب الموظف.',
    },
    {
      icon: Presentation,
      en: 'Office & marketer onboarding',
      ar: 'تهيئة المكاتب والمسوقين',
      descEn: 'Guided setup for real estate offices joining the platform, with team roles.',
      descAr: 'إعداد موجّه لمكاتب العقارات المنضمة للمنصة، مع أدوار للفريق.',
    },
  ];

  const audience = [
    {
      icon: Building2,
      titleEn: 'Real estate offices',
      titleAr: 'مكاتب العقارات',
      descEn: 'Manage your full portfolio, assign listings to agents, and present every property professionally.',
      descAr: 'أدر محفظتك الكاملة، وزّع العقارات على الموظفين، وقدّم كل عقار باحترافية.',
    },
    {
      icon: Megaphone,
      titleEn: 'Independent marketers',
      titleAr: 'المسوقون المستقلون',
      descEn: 'Promote properties for partner offices with ready-made campaign structures and tracking.',
      descAr: 'روّج لعقارات المكاتب الشريكة عبر هياكل حملات جاهزة وتتبع للنتائج.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'خدماتنا' : 'Services'}
        title={lang === 'ar' ? 'خدمات تسويق وأتمتة عقارية' : 'Property marketing & automation services'}
        subtitle={
          lang === 'ar'
            ? 'صُممت خدمات إيكويول لمكاتب العقارات والمسوقين في العراق — من إدارة العروض إلى الحملات التسويقية.'
            : 'Ecoyol services are designed for real estate offices and marketers in Iraq — from listing management to marketing campaigns.'
        }
      />

      <section className="py-16 sm:py-20">
        <div className="container-app">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, en, ar, descEn, descAr }) => (
              <div
                key={en}
                className="group rounded-2xl border border-charcoal-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-charcoal-950 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-charcoal-950">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 font-semibold text-charcoal-900">{lang === 'ar' ? ar : en}</h2>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                  {lang === 'ar' ? descAr : descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-950 py-16 text-white sm:py-20">
        <div className="container-app">
          <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">
            {lang === 'ar' ? 'لمن هذه الخدمات؟' : 'Who are these services for?'}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {audience.map(({ icon: Icon, titleEn, titleAr, descEn, descAr }) => (
              <div key={titleEn} className="rounded-2xl border border-charcoal-800 bg-charcoal-900 p-7">
                <Icon className="h-6 w-6 text-gold-400" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{lang === 'ar' ? titleAr : titleEn}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-300">
                  {lang === 'ar' ? descAr : descEn}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-gold-500/30 bg-gradient-to-b from-charcoal-900 to-charcoal-950 p-8 text-center sm:flex-row sm:justify-between sm:text-start">
            <div>
              <h3 className="text-lg font-semibold">
                {lang === 'ar' ? 'مهتم بخدماتنا؟' : 'Interested in our services?'}
              </h3>
              <p className="mt-1 text-sm text-charcoal-300">
                {lang === 'ar'
                  ? 'تواصل معنا لمناقشة الاحتياج المناسب لمكتبك أو عملك التجاري.'
                  : 'Contact us to discuss what fits your office or business.'}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-gold">
                {lang === 'ar' ? 'تواصل معنا' : 'Contact us'}
              </Link>
              <WhatsAppButton className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
