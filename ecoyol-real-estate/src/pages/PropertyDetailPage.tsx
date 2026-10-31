import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building,
  Calendar,
  CheckCircle2,
  MapPin,
  Maximize,
  Phone,
  Share2,
} from 'lucide-react';
import { Link, useRouter } from '@/lib/router';
import { useLang } from '@/lib/i18n';
import { usePriceFormatter } from '@/lib/format';
import { PropertyCard } from '@/components/PropertyCard';
import { WhatsAppButton } from '@/components/ui';
import {
  CITIES,
  DISTRICTS,
  GOVERNORATES,
  PROPERTY_TYPES,
  PURPOSES,
  SAMPLE_PROPERTIES,
} from '@/data/sampleProperties';

export function PropertyDetailPage({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const property = useMemo(() => SAMPLE_PROPERTIES.find((p) => p.slug === slug), [slug]);
  const fmt = usePriceFormatter();

  if (!property) {
    return (
      <div className="container-app flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-charcoal-900">
          {lang === 'ar' ? 'لم يتم العثور على العقار' : 'Property not found'}
        </h1>
        <p className="text-charcoal-600">
          {lang === 'ar'
            ? 'قد يكون هذا العرض التجريبي قد أُزيل من النموذج.'
            : 'This demo listing may have been removed from the prototype.'}
        </p>
        <Link to="/properties" className="btn-gold">
          {lang === 'ar' ? 'تصفح العقارات' : 'Browse properties'}
        </Link>
      </div>
    );
  }

  const typeLabel = t(PROPERTY_TYPES[property.type]);
  const govLabel = t(GOVERNORATES[property.governorate]);
  const cityLabel = t(CITIES[property.city]);
  const districtLabel = t(DISTRICTS[property.district]);
  const purposeLabel = t(PURPOSES[property.purpose]);
  const price = fmt.full(property.priceIqd);
  const period = property.purpose === 'rent' ? (lang === 'ar' ? 'شهريًا' : 'per month') : '';

  const related = SAMPLE_PROPERTIES.filter(
    (p) => p.id !== property.id && p.city === property.city
  ).slice(0, 3);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const specs = [
    {
      icon: BedDouble,
      label: lang === 'ar' ? 'غرف النوم' : 'Bedrooms',
      value: property.bedrooms > 0 ? property.bedrooms : '—',
    },
    {
      icon: Bath,
      label: lang === 'ar' ? 'الحمامات' : 'Bathrooms',
      value: property.bathrooms > 0 ? property.bathrooms : '—',
    },
    { icon: Maximize, label: lang === 'ar' ? 'المساحة' : 'Area', value: `${property.areaSqm} m²` },
    { icon: Building, label: lang === 'ar' ? 'النوع' : 'Type', value: typeLabel },
    {
      icon: Calendar,
      label: lang === 'ar' ? 'سنة البناء' : 'Year built',
      value: property.yearBuilt > 0 ? property.yearBuilt : '—',
    },
    { icon: MapPin, label: lang === 'ar' ? 'الحي' : 'District', value: districtLabel },
    { icon: Building, label: lang === 'ar' ? 'المحافظة' : 'Governorate', value: govLabel },
  ];

  return (
    <>
      <div className="container-app pt-6">
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center gap-2 text-sm font-medium text-charcoal-600 transition-colors hover:text-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <BackIcon className="h-4 w-4" aria-hidden />
          {lang === 'ar' ? 'كل العقارات' : 'All properties'}
        </button>
      </div>

      <article className="container-app py-8">
        <div className="relative overflow-hidden rounded-3xl bg-charcoal-100">
          {imageLoading && <div className="absolute inset-0 animate-pulse bg-charcoal-200" aria-hidden />}
          <img
            src={property.image}
            alt={`${typeLabel} — ${cityLabel} (demo)`}
            onLoad={() => setImageLoading(false)}
            className="aspect-[16/8] w-full object-cover"
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-charcoal-950 px-3 py-1 text-xs font-semibold text-white">
                {purposeLabel}
              </span>
              {property.featured && (
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-charcoal-950">
                  {lang === 'ar' ? 'مميز' : 'Featured'}
                </span>
              )}
              <span className="badge-demo">
                {lang === 'ar' ? 'بيانات تجريبية — ليس عرضًا حقيقيًا' : 'Demo data — not a real offer'}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-charcoal-900 sm:text-3xl">
              {typeLabel} {lang === 'ar' ? 'في' : 'in'} {cityLabel} — {districtLabel}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-charcoal-500">
              <MapPin className="h-4 w-4 text-gold-600" aria-hidden />
              {cityLabel}، {districtLabel}
            </p>

            <p className="mt-6 leading-relaxed text-charcoal-700">
              {lang === 'ar' ? property.descriptionAr : property.descriptionEn}
            </p>

            <h2 className="mt-10 text-lg font-semibold text-charcoal-900">
              {lang === 'ar' ? 'المواصفات' : 'Specifications'}
            </h2>
            <dl className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
              {specs.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-charcoal-100 bg-white p-4"
                >
                  <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <dt className="text-xs text-charcoal-500">{label}</dt>
                    <dd className="text-sm font-semibold text-charcoal-900">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm leading-relaxed text-gold-900">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden />
                {lang === 'ar'
                  ? 'تنبيه: هذا العقار جزء من نموذج أولي بصري. البيانات والصور توضيحية فقط ولا تمثل أي عقار حقيقي.'
                  : 'Notice: this property is part of a visual prototype. Data and images are illustrative only and do not represent any real property.'}
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-charcoal-100 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-2xl font-bold text-charcoal-950 sm:text-3xl">
                {price}
                {period && <span className="text-sm font-semibold text-charcoal-500"> / {period}</span>}
              </p>
              <p className="mt-1 text-sm text-charcoal-500">
                {purposeLabel} · {cityLabel}
              </p>
              <div className="mt-6 space-y-3">
                <button className="btn-gold min-h-[48px] w-full">
                  <Phone className="h-4 w-4" aria-hidden />
                  {lang === 'ar' ? 'اتصل بالمسؤول (تجريبي)' : 'Call agent (demo)'}
                </button>
                <WhatsAppButton className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2" />
                <button onClick={share} className="btn-outline min-h-[48px] w-full">
                  <Share2 className="h-4 w-4" aria-hidden />
                  {copied
                    ? lang === 'ar'
                      ? 'تم نسخ الرابط'
                      : 'Link copied'
                    : lang === 'ar'
                      ? 'مشاركة الرابط'
                      : 'Share link'}
                </button>
              </div>
              <p className="mt-4 text-center text-xs text-charcoal-400">
                {lang === 'ar'
                  ? 'أزرار تواصل تجريبية ضمن النموذج الأولي'
                  : 'Demo contact actions in this prototype'}
              </p>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-charcoal-100 bg-charcoal-50 py-14">
          <div className="container-app">
            <h2 className="section-title">
              {lang === 'ar' ? 'عقارات مشابهة (تجريبية)' : 'Similar demo properties'}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
