# Security Policy

Atlas handles financial account and portfolio data. Security reports are taken seriously and triaged before feature work.

## Reporting a vulnerability

Please do **not** open a public GitHub issue for security vulnerabilities.

Instead, email **security@atlas-app.example** (placeholder — replace before launch) with:

- A description of the vulnerability and its potential impact
- Steps to reproduce, or a proof of concept
- Any relevant logs or screenshots

We aim to acknowledge reports within 3 business days.

## Supported versions

Atlas is pre-release (v0.x). Until v1.0, only the latest commit on `main` receives security fixes.

## Scope

In scope: `frontend/`, `backend/`, authentication flows, API routes, database access patterns.

Out of scope: third-party services we depend on but don't control (Supabase, Vercel, Anthropic API) — please report those directly to the respective vendor.

## Data handling principles

- No plaintext credentials ever committed — see `.env.example` for the pattern.
- Supabase Row Level Security (RLS) policies must scope every table to the authenticated user; see `docs/Database.md`.
- Market/portfolio data returned by mocked services in `backend/services/` is synthetic and does not represent real accounts.
