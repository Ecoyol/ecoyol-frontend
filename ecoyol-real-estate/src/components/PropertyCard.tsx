import { ArrowLeft, ArrowRight, Bath, BedDouble, Globe, Maximize, MapPin } from 'lucide-react';
import { Link } from '@/lib/router';
import { useLang } from '@/lib/i18n';
import { usePriceFormatter } from '@/lib/format';
import { CITIES, DISTRICTS, PROPERTY_TYPES, PURPOSES } from '@/data/sampleProperties';
import type { Property } from '@/data/properties';

export function PropertyCard({ property }: { property: Property }) {
  const { lang, t } = useLang();
  const fmt = usePriceFormatter();
  const typeLabel = t(PROPERTY_TYPES[property.type]);
  const purposeLabel = t(PURPOSES[property.purpose]);
  const cityLabel = t(CITIES[property.city]);
  const districtLabel = t(DISTRICTS[property.district]);

  const price = fmt.compact(property.priceIqd);
  const period = property.purpose === 'rent' ? (lang === 'ar' ? '/ شهريًا' : '/mo') : '';

  return (
    <Link
      to={`/property/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-100">
        <img
          src={property.image}
          alt={`${typeLabel} — ${cityLabel} (demo)`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 start-3 rounded-full bg-charcoal-950/85 px-3 py-1 text-xs font-semibold text-white">
          {purposeLabel}
        </span>
        {property.featured && (
          <span className="absolute top-3 end-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-charcoal-950">
            {lang === 'ar' ? 'مميز' : 'Featured'}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate text-sm text-charcoal-500">
              <MapPin className="h-4 w-4 shrink-0 text-gold-600" aria-hidden />
              {cityLabel} — {districtLabel}
            </p>
            <h3 className="mt-1 truncate text-base font-semibold text-charcoal-900 sm:text-lg">
              {typeLabel} · {property.areaSqm} m²
            </h3>
          </div>
          <div className="shrink-0 text-end">
            <p className="whitespace-nowrap text-base font-bold text-gold-600 sm:text-lg">
              {price}
              <span className="text-xs font-semibold text-charcoal-500"> {period}</span>
            </p>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3 border-t border-charcoal-100 pt-3 text-xs text-charcoal-600 sm:gap-4 sm:text-sm">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4 text-charcoal-400" aria-hidden />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-charcoal-400" aria-hidden />
              {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-charcoal-400" aria-hidden />
            {property.areaSqm} m²
          </span>
          <span className="ms-auto flex items-center gap-1 text-xs font-medium text-charcoal-800 transition-colors group-hover:text-gold-600 sm:text-sm">
            {lang === 'ar' ? 'التفاصيل' : 'Details'}
            {lang === 'ar' ? (
              <ArrowLeft className="h-4 w-4" aria-hidden />
            ) : (
              <ArrowRight className="h-4 w-4" aria-hidden />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function DemoTag() {
  const { lang } = useLang();
  return (
    <span className="badge-demo">
      <Globe className="h-3 w-3" aria-hidden />
      {lang === 'ar' ? 'بيانات تجريبية' : 'Demo data'}
    </span>
  );
}
