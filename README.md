# మనసులోని మాటలు — Telugu · English Quotes

A premium, mobile-first Telugu and English quote experience. Discover a growing collection, explore moods, save favourites, listen to Telugu quotes, and create share-ready quote artwork.

## Features
- 13 original quote categories with Telugu, English meaning, transliteration, mood and tags.
- Search across Telugu, English, transliteration and tags; category and mood filters.
- Daily featured quote, random discovery and automatic quote rotation.
- Favourites, reading history and reading streak stored locally on the device.
- Native share, clipboard copy, Telugu speech synthesis and swipe navigation.
- Quote Studio exports 1080 × 1350 PNG images with selectable palettes and language layouts.
- Installable PWA with offline caching of the application and all quote JSON collections.
- Responsive premium dark theme with optional light theme and reduced-motion support.

## Run locally
This is a static application. Serve the repository root with any static web server, or deploy it to Vercel / GitHub Pages. The app fetches its existing `quotes/*.json` files directly; no build step or backend is required.

## Daily quote automation
The existing GitHub Actions workflow is retained. It generates 30 quotes across the existing categories and commits quote JSON updates. Configure `OPENAI_API_KEY` under repository Settings → Secrets and variables → Actions for generation.

## Deployment
- **Vercel:** deploy the repository root as a static site; no build command is required.
- **GitHub Pages:** the existing Pages workflow uploads the static repository root. The workflow path filters include the PWA assets so interface updates deploy automatically.
- Daily quote commits continue to trigger the Pages workflow after successful generation.

## Privacy
Favourites, reading history, theme preference and streak are stored in browser localStorage. Quote data is served from the repository. No account or tracking service is required.

## Project structure
- `index.html`, `styles.css`, `app.js`: application UI and interactions
- `quotes/`: existing category JSON data (preserved)
- `manifest.webmanifest`, `sw.js`, `icon.svg`: install and offline support
- `.github/workflows/`: existing automation and Pages deployment
