/**
 * Supabase client factories.
 * TODO(integration): requires NEXT_PUBLIC_SUPABASE_URL,
 * NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in env —
 * see /.env.example. Until those are set, calls will throw at runtime,
 * deliberately, rather than silently no-op.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/** Client-side Supabase instance (anon key, respects RLS). */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars. Copy .env.example to .env.local and fill in NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  browserClient = createClient(url, anonKey);
  return browserClient;
}

/**
 * Server-side Supabase instance using the service role key. Bypasses RLS —
 * only ever use inside trusted server code (API routes, server actions),
 * never expose to the client bundle.
 */
export function getSupabaseServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase service role env vars. See .env.example — SUPABASE_SERVICE_ROLE_KEY must never be exposed to the client."
    );
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
