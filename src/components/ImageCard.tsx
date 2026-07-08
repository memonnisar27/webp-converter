"use client";

import { formatBytes, getWebpFilename, downloadBlob } from "@/lib/convert";

export interface ConvertedImage {
  id: string;
  originalFile: File;
  originalSize: number;
  webpBlob: Blob;
  webpSize: number;
  width: number;
  height: number;
  previewUrl: string;
}

interface ImageCardProps {
  image: ConvertedImage;
}

export default function ImageCard({ image }: ImageCardProps) {
  const savings = Math.round(
    ((image.originalSize - image.webpSize) / image.originalSize) * 100
  );

  const handleDownload = () => {
    downloadBlob(image.webpBlob, getWebpFilename(image.originalFile.name));
  };

  return (
    <div className="animate-fade-in overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur">
      <div className="relative aspect-video bg-slate-900/50">
        <img
          src={image.previewUrl}
          alt={image.originalFile.name}
          className="h-full w-full object-contain p-2"
        />
        {savings > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-brand-500/90 px-2.5 py-0.5 text-xs font-semibold text-white">
            -{savings}%
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p
          className="truncate text-sm font-medium text-slate-200"
          title={image.originalFile.name}
        >
          {image.originalFile.name}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            {image.width}×{image.height}
          </span>
          <span>
            {formatBytes(image.originalSize)} →{" "}
            <span className="font-medium text-brand-400">
              {formatBytes(image.webpSize)}
            </span>
          </span>
        </div>

        <button
          onClick={handleDownload}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500 active:bg-brand-700"
        >
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download WebP
        </button>
      </div>
    </div>
  );
}
