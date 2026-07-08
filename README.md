# WebP Converter

Free online tool to convert JPG, PNG, GIF, BMP, TIFF, and SVG images to WebP format. Runs entirely in the browser — no uploads, no server processing.

## Features

- **Batch conversion** — drop multiple images at once
- **Quality slider** — adjust WebP compression (1–100%)
- **Size comparison** — see original vs WebP file sizes and savings %
- **Download all** — individual downloads or a single ZIP file
- **100% private** — all processing happens locally in your browser

## Tech Stack

- Next.js 15 (static export)
- React 19
- Tailwind CSS 4
- JSZip (for bulk download)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Next.js — click **Deploy**

Or use the CLI:

```bash
npm i -g vercel
vercel
```

The app uses `output: "export"` so it deploys as a static site with zero server costs.

## License

MIT
