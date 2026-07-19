# Typography

| Role | Typeface | Usage |
|---|---|---|
| Display | Fraunces (serif, weight 400–500) | Headlines, large score numerals (Sleep Score, Confidence Ring center). Used with restraint — never body copy. |
| UI / Body | Inter | Everything else: nav, buttons, labels, paragraph copy. |
| Data | IBM Plex Mono | Prices, percentages, tickers, any number the user might want to compare precisely. |

## Scale (Tailwind classes → use)

- Hero headline: `text-5xl` / Fraunces 400
- Section headline: `text-[34px]` / Fraunces 400
- Card title: `text-sm font-semibold` / Inter 600
- Body: `text-sm` – `text-base` / Inter 400
- Data / numbers: `font-mono` at whatever size the context needs, always `font-semibold` or heavier for scannability
