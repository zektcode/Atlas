import type { NextConfig } from "next";

/**
 * ATLAS uses a non-standard repo layout: the Next.js app lives in /frontend
 * instead of the repo root, so that /backend, /docs, /design, /investor can
 * sit as first-class top-level concerns rather than being buried inside a
 * "web app" folder. This keeps the repository readable as a *company*,
 * not just a codebase.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
