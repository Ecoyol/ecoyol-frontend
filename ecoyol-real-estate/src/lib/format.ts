import { useLang } from './i18n';

const IQD = 'IQD';

function groupEn(n: number): string {
  return n.toLocaleString('en-US');
}

function groupAr(n: number): string {
  return n.toLocaleString('ar-IQ', { useGrouping: true });
}

/** Full format: 620,000,000 IQD (or Arabic-Indic numerals in Arabic). */
export function formatIqd(iqd: number, lang: 'en' | 'ar'): string {
  return `${(lang === 'ar' ? groupAr(iqd) : groupEn(iqd))} ${IQD}`;
}

/** Compact format for cards: 620M IQD / 1.1M IQD / 900K IQD (مليون/ألف in Arabic). */
export function formatIqdCompact(iqd: number, lang: 'en' | 'ar'): string {
  if (iqd >= 1_000_000) {
    const m = iqd / 1_000_000;
    const v = m >= 100 ? Math.round(m) : Math.round(m * 10) / 10;
    return lang === 'ar' ? `${groupAr(v)} مليون ${IQD}` : `${v}M ${IQD}`;
  }
  if (iqd >= 1_000) {
    const k = iqd / 1_000;
    const v = k >= 100 ? Math.round(k) : Math.round(k * 10) / 10;
    return lang === 'ar' ? `${groupAr(v)} ألف ${IQD}` : `${v}K ${IQD}`;
  }
  return formatIqd(iqd, lang);
}

export function usePriceFormatter() {
  const { lang } = useLang();
  return {
    full: (n: number) => formatIqd(n, lang),
    compact: (n: number) => formatIqdCompact(n, lang),
  };
}
