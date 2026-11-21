# Telugu-English Quotes | మనసులోని మాటలు

A growing, category-wise collection of original Telugu quotes with English meaning and Telugu transliteration — presented one quote at a time in a clean, mobile-friendly website.

**Languages:** Telugu • English translation • Telugu in English letters

## Explore the website

- Choose a category from the dropdown.
- Read one quote at a time, with a clear Telugu-first layout.
- Use Previous / Next to move through the selected category.
- Expand transliteration and copy the Telugu + English quote.
- The website reads the JSON files directly, so new repository quotes appear in the UI automatically.

## Categories

- Memories — జ్ఞాపకాలు
- Friendship — స్నేహం
- Friendship Break — స్నేహ విరహం
- Love — ప్రేమ
- Heartbreak — హృదయవేదన
- Life — జీవితం
- Motivation — ప్రేరణ
- Devotional — భక్తి
- Attitude — వైఖరి
- Self-respect — ఆత్మగౌరవం
- Family — కుటుంబం
- Loneliness — ఒంటరితనం
- Indirect quotes — పరోక్ష మాటలు

## Daily quote automation

The `.github/workflows/daily-quotes.yml` workflow runs every day at **09:00 AM IST** and can also be started manually from the Actions tab.

It generates two original quotes in a rotating category, checks the selected category for duplicate Telugu text, validates required fields, and commits the new entries into `quotes/<category>.json`. The website reads those updated files automatically.

### One-time setup

1. Open the repository's **Settings → Secrets and variables → Actions**.
2. Add a repository secret named **`OPENAI_API_KEY`** with an API key that can call the OpenAI API.
3. Open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Open **Actions** and enable workflows if GitHub asks.

The daily workflow will not generate content until the `OPENAI_API_KEY` secret is configured. API usage may incur charges according to the key's account and model pricing.

## Quote format

Every quote is stored as JSON with a stable ID, category, Telugu text, English meaning, transliteration, mood, and tags.

```json
{
  "id": "MEM001",
  "category": "memories",
  "telugu": "కొన్ని జ్ఞాపకాలు నిద్రను దూరం చేస్తాయి.",
  "english": "Some memories keep us awake at night.",
  "transliteration": "Konni gnapakalu nidranu dooram chestayi.",
  "mood": "emotional",
  "tags": ["memories", "night", "emotions"]
}
```

## Repository layout

- `index.html`, `styles.css`, `app.js` — responsive quote website
- `quotes/` — category-wise quote collections
- `scripts/generate-daily-quotes.mjs` — daily quote generator and duplicate check
- `.github/workflows/daily-quotes.yml` — scheduled quote generation and commit
- `.github/workflows/deploy-pages.yml` — GitHub Pages deployment
- `collections/` — curated sets for social posts and statuses
- `CONTRIBUTING.md` — guidelines for adding quotes

## Quality principles

- Prefer natural, readable Telugu over literal machine translation.
- English text should preserve the meaning and emotion of the Telugu original.
- Transliteration should be easy for Telugu speakers to read.
- Keep quotes original; do not knowingly submit copied lyrics, poems, or copyrighted passages.
- Avoid duplicates and keep IDs unique within each category.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---
మనసులోని మాటలు… తెలుగు భావం, ప్రపంచానికి అర్థమయ్యేలా.
