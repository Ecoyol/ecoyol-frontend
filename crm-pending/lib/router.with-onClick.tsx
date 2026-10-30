import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Filters } from '@/data/properties';
import type { City } from '@/data/properties';

export function navigate(to: string) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const nav = (to: string) => {
    if (to === window.location.pathname) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <RouterContext.Provider value={{ path, navigate: nav }}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function Link({
  to,
  className,
  children,
  ariaLabel,
  onClick,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}) {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

export const DEFAULT_FILTERS: Filters = {
  type: 'any',
  governorate: 'any',
  city: 'any',
  purpose: 'any',
  minPriceIqd: null,
  maxPriceIqd: null,
  minBedrooms: 'any',
  query: '',
};

export function matchesFilters(
  p: Filters,
  property: import('@/data/properties').Property
) {
  if (p.type !== 'any' && property.type !== p.type) return false;
  if (p.governorate !== 'any' && property.governorate !== p.governorate) return false;
  if (p.city !== 'any' && property.city !== p.city) return false;
  if (p.purpose !== 'any' && property.purpose !== p.purpose) return false;
  if (p.minBedrooms !== 'any' && property.bedrooms < p.minBedrooms) return false;
  if (p.minPriceIqd !== null && property.priceIqd < p.minPriceIqd) return false;
  if (p.maxPriceIqd !== null && property.priceIqd > p.maxPriceIqd) return false;
  if (p.query.trim()) {
    const q = p.query.trim().toLowerCase();
    const haystack = `${property.district} ${property.slug}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}
