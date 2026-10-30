import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const LS_URL_KEY = 'ecoyol_supabase_url';
const LS_ANON_KEY = 'ecoyol_supabase_anon_key';

/** Values from the .env file bundled at build time. */
const ENV_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const ENV_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  source: 'localStorage' | 'env';
}

/** Returns the active Supabase config, preferring localStorage overrides over .env. */
export function getSupabaseConfig(): SupabaseConfig {
  const lsUrl = localStorage.getItem(LS_URL_KEY);
  const lsAnonKey = localStorage.getItem(LS_ANON_KEY);
  if (lsUrl && lsAnonKey) {
    return { url: lsUrl, anonKey: lsAnonKey, source: 'localStorage' };
  }
  return { url: ENV_URL ?? '', anonKey: ENV_ANON_KEY ?? '', source: 'env' };
}

/** Saves custom Supabase credentials to localStorage. */
export function saveSupabaseConfig(url: string, anonKey: string): void {
  localStorage.setItem(LS_URL_KEY, url.trim());
  localStorage.setItem(LS_ANON_KEY, anonKey.trim());
}

/** Removes localStorage overrides so the app falls back to .env values. */
export function clearSupabaseConfig(): void {
  localStorage.removeItem(LS_URL_KEY);
  localStorage.removeItem(LS_ANON_KEY);
}

let client: SupabaseClient | null = null;
let cachedKey = '';

/** Returns a cached SupabaseClient, rebuilding it when the config changes. */
export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;
  const key = `${url}::${anonKey}`;
  if (client && key === cachedKey) return client;
  client = createClient(url, anonKey);
  cachedKey = key;
  return client;
}
