# User Flow — First Session

```mermaid
flowchart TD
    A[Land on marketing page] --> B{Has account?}
    B -- No --> C[Sign up — Supabase Auth]
    B -- Yes --> D[Log in]
    C --> E[Onboarding: link or seed a portfolio]
    D --> F[Dashboard]
    E --> F
    F --> G[See Sleep Score + Risk Radar]
    G --> H{Wants detail on a position?}
    H -- Yes --> I[Open Decision Card]
    I --> J[Read confidence breakdown + invalidation conditions]
    H -- No --> K[Check Macro Calendar / Watchlist]
    J --> L[Optionally log reasoning in Trade Journal]
```

Phase 1 flow deliberately ends at "read and understand" (J/L), not "execute a trade" — see `docs/PRD.md` success metric: correct restatement of *why* a confidence number is what it is, not conversion to a transaction.
