import { Loader2, SearchX } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-charcoal-950 py-16 text-white sm:py-20">
      <div className="container-app animate-fade-up">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-400">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-300 sm:text-lg">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}

export function LoadingState({ label }: { label?: string }) {
  const { lang } = useLang();
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-20 text-charcoal-500"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-gold-500" aria-hidden />
      <p className="text-sm">{label ?? (lang === 'ar' ? 'جارٍ التحميل…' : 'Loading…')}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-charcoal-200 bg-charcoal-50 py-16 text-center">
      <SearchX className="h-10 w-10 text-charcoal-300" aria-hidden />
      <p className="max-w-sm text-sm text-charcoal-600">{message}</p>
    </div>
  );
}

export function WhatsAppButton({ className }: { className?: string }) {
  const { lang } = useLang();
  const label = lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp';
  return (
    <a
      href="https://wa.me/964000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={
        className ??
        'inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2'
      }
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      {label}
    </a>
  );
}
