import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { usePriceFormatter } from '@/lib/format';
import { PropertyCard, DemoTag } from '@/components/PropertyCard';
import { EmptyState, LoadingState, PageHeader } from '@/components/ui';
import {
  CITIES,
  GOVERNORATES,
  GOVERNORATE_CITIES,
  PROPERTY_TYPES,
  SAMPLE_PROPERTIES,
  SALE_BUDGET_STEPS_IQD,
  RENT_BUDGET_STEPS_IQD,
} from '@/data/sampleProperties';
import type { City, Filters, Governorate, PropertyType } from '@/data/properties';
import { DEFAULT_FILTERS, matchesFilters } from '@/lib/router';

type Tab = 'all' | 'sale' | 'rent';

export function PropertiesPage() {
  const { lang, t } = useLang();
  const fmt = usePriceFormatter();
  const [tab, setTab] = useState<Tab>(() => {
    const p = new URLSearchParams(window.location.search).get('purpose');
    return p === 'sale' || p === 'rent' ? p : 'all';
  });
  const [filters, setFilters] = useState<Filters>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      ...DEFAULT_FILTERS,
      type: (params.get('type') as PropertyType) || 'any',
      governorate: (params.get('governorate') as Governorate) || 'any',
      city: (params.get('city') as City) || 'any',
      maxPriceIqd: params.get('maxPriceIqd') ? Number(params.get('maxPriceIqd')) : null,
      minPriceIqd: params.get('minPriceIqd') ? Number(params.get('minPriceIqd')) : null,
    };
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const isRentContext = tab === 'rent';
  const budgetSteps = isRentContext ? RENT_BUDGET_STEPS_IQD : SALE_BUDGET_STEPS_IQD;

  const results = useMemo(() => {
    const withPurpose: Filters = { ...filters, purpose: tab === 'all' ? 'any' : tab };
    return SAMPLE_PROPERTIES.filter((p) => matchesFilters(withPurpose, p));
  }, [filters, tab]);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const setGovernorate = (value: string) => {
    const gov = value as Governorate | 'any';
    const cities = gov === 'any' ? [] : GOVERNORATE_CITIES[gov];
    const cityOk = filters.city !== 'any' && cities.includes(filters.city);
    setFilters((f) => ({ ...f, governorate: gov, city: cityOk ? f.city : 'any' }));
  };

  const activeCount =
    (filters.type !== 'any' ? 1 : 0) +
    (filters.governorate !== 'any' ? 1 : 0) +
    (filters.city !== 'any' ? 1 : 0) +
    (filters.maxPriceIqd !== null ? 1 : 0) +
    (filters.minPriceIqd !== null ? 1 : 0) +
    (filters.minBedrooms !== 'any' ? 1 : 0);

  const filterPanel = (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-charcoal-600">
          {lang === 'ar' ? 'المحافظة' : 'Governorate'}
        </span>
        <select
          value={filters.governorate}
          onChange={(e) => setGovernorate(e.target.value)}
          className="input-field"
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
        <span className="mb-1 block text-xs font-medium text-charcoal-600">
          {lang === 'ar' ? 'المدينة' : 'City'}
        </span>
        <select
          value={filters.city}
          onChange={(e) => set('city', e.target.value as City | 'any')}
          className="input-field"
          disabled={filters.governorate === 'any'}
        >
          <option value="any">
            {filters.governorate === 'any'
              ? lang === 'ar'
                ? 'اختر المحافظة أولاً'
                : 'Choose a governorate first'
              : lang === 'ar'
                ? 'كل المدن'
                : 'All cities'}
          </option>
          {filters.governorate !== 'any' &&
            GOVERNORATE_CITIES[filters.governorate].map((c) => (
              <option key={c} value={c}>
                {t(CITIES[c])}
              </option>
            ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-charcoal-600">
          {lang === 'ar' ? 'نوع العقار' : 'Property type'}
        </span>
        <select
          value={filters.type}
          onChange={(e) => set('type', e.target.value as PropertyType | 'any')}
          className="input-field"
        >
          <option value="any">{lang === 'ar' ? 'كل الأنواع' : 'All types'}</option>
          {Object.entries(PROPERTY_TYPES).map(([k, v]) => (
            <option key={k} value={k}>
              {t(v)}
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="mb-1 block text-xs font-medium text-charcoal-600">
          {lang === 'ar' ? 'نطاق الميزانية' : 'Budget range'}
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.minPriceIqd ?? ''}
            onChange={(e) => set('minPriceIqd', e.target.value ? Number(e.target.value) : null)}
            className="input-field"
            aria-label={lang === 'ar' ? 'الحد الأدنى' : 'Minimum'}
          >
            <option value="">{lang === 'ar' ? 'من' : 'Min'}</option>
            {budgetSteps.map((b) => (
              <option key={b} value={b}>
                {fmt.compact(b)}
              </option>
            ))}
          </select>
          <select
            value={filters.maxPriceIqd ?? ''}
            onChange={(e) => set('maxPriceIqd', e.target.value ? Number(e.target.value) : null)}
            className="input-field"
            aria-label={lang === 'ar' ? 'الحد الأعلى' : 'Maximum'}
          >
            <option value="">{lang === 'ar' ? 'إلى' : 'Max'}</option>
            {budgetSteps.map((b) => (
              <option key={b} value={b}>
                {fmt.compact(b)}
              </option>
            ))}
          </select>
        </div>
        {(filters.minPriceIqd !== null || filters.maxPriceIqd !== null) && (
          <p className="mt-2 text-xs text-charcoal-500">
            {fmt.compact(filters.minPriceIqd ?? 0)} —{' '}
            {filters.maxPriceIqd !== null
              ? fmt.compact(filters.maxPriceIqd)
              : lang === 'ar'
                ? 'بلا حد'
                : 'no limit'}
          </p>
        )}
      </fieldset>

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-charcoal-600">
          {lang === 'ar' ? 'غرف النوم (كحد أدنى)' : 'Min bedrooms'}
        </span>
        <select
          value={String(filters.minBedrooms)}
          onChange={(e) =>
            set('minBedrooms', e.target.value === 'any' ? 'any' : Number(e.target.value))
          }
          className="input-field"
        >
          <option value="any">{lang === 'ar' ? 'أي عدد' : 'Any'}</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </label>

      {activeCount > 0 && (
        <button
          onClick={() => setFilters({ ...DEFAULT_FILTERS })}
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          {lang === 'ar' ? 'مسح كل الفلاتر' : 'Clear all filters'}
        </button>
      )}
    </div>
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: lang === 'ar' ? 'الكل' : 'All' },
    { key: 'sale', label: lang === 'ar' ? 'للبيع' : 'For Sale' },
    { key: 'rent', label: lang === 'ar' ? 'للإيجار' : 'For Rent' },
  ];

  return (
    <>
      <PageHeader
        eyebrow={lang === 'ar' ? 'العقارات' : 'Properties'}
        title={lang === 'ar' ? 'تصفح العقارات' : 'Browse properties'}
        subtitle={
          lang === 'ar'
            ? 'جميع العقارات المعروضة هي بيانات تجريبية لأغراض العرض فقط وليست عروضًا حقيقية أو مُتحقّقًا منها.'
            : 'All properties shown are demo data for demonstration purposes only and are not real or verified offers.'
        }
      />

      <div className="container-app py-8 sm:py-10">
        <div
          className="flex w-full max-w-md rounded-xl border border-charcoal-200 bg-charcoal-50 p-1"
          role="tablist"
          aria-label={lang === 'ar' ? 'نوع العرض' : 'Listing type'}
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                tab === key
                  ? 'bg-charcoal-950 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <input
              type="search"
              value={filters.query}
              onChange={(e) => set('query', e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث باسم المنطقة…' : 'Search by district…'}
              className="input-field min-h-[46px] ps-11"
              aria-label={lang === 'ar' ? 'بحث' : 'Search'}
            />
            <Search
              className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
              aria-hidden
            />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="btn-outline min-h-[46px] self-start sm:hidden"
            aria-expanded={showFilters}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {lang === 'ar' ? 'الفلاتر' : 'Filters'}
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-xs text-charcoal-950">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-charcoal-100 bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 font-semibold text-charcoal-900">
                <SlidersHorizontal className="h-4 w-4 text-gold-600" aria-hidden />
                {lang === 'ar' ? 'تصفية' : 'Filters'}
              </h2>
              {filterPanel}
            </div>
          </aside>

          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
              <div
                className="absolute inset-0 bg-charcoal-950/50"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute bottom-0 start-0 end-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 pb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-charcoal-900">
                    {lang === 'ar' ? 'تصفية' : 'Filters'}
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="rounded-lg p-2 hover:bg-charcoal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>
                {filterPanel}
                <button
                  onClick={() => setShowFilters(false)}
                  className="btn-gold mt-5 min-h-[48px] w-full"
                >
                  {lang === 'ar'
                    ? `عرض النتائج (${results.length})`
                    : `Show results (${results.length})`}
                </button>
              </div>
            </div>
          )}

          <div>
            {loading ? (
              <LoadingState />
            ) : (
              <>
                <p className="mb-4 text-sm text-charcoal-500" aria-live="polite">
                  {results.length}{' '}
                  {lang === 'ar'
                    ? results.length === 1
                      ? 'نتيجة'
                      : 'نتائج'
                    : results.length === 1
                      ? 'result'
                      : 'results'}
                </p>
                {results.length === 0 ? (
                  <EmptyState
                    message={
                      lang === 'ar'
                        ? 'لا توجد نتائج مطابقة. جرّب تعديل الفلاتر أو مسحها.'
                        : 'No matching results. Try adjusting or clearing your filters.'
                    }
                  />
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                    {results.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                )}
                <div className="mt-10">
                  <DemoTag />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
