import Converter from "@/components/Converter";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-400 ring-1 ring-brand-500/20">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          100% private — runs in your browser
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Image to{" "}
          <span className="bg-gradient-to-r from-brand-400 to-emerald-300 bg-clip-text text-transparent">
            WebP
          </span>{" "}
          Converter
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          Convert JPG, PNG, GIF, and BMP images to WebP format instantly.
          Smaller files, same quality — no upload needed.
        </p>
      </header>

      <Converter />

      <footer className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        <p>
          All processing happens locally in your browser. No images are ever
          uploaded to any server.
        </p>
      </footer>
    </main>
  );
}
