import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Lang = 'en' | 'ar';

interface LangContextValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  toggleLang: () => void;
  t: <T extends Record<string, string>>(obj: T) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback(
    <T extends Record<string, string>>(obj: T) => obj[lang] ?? obj.en,
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, dir, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
