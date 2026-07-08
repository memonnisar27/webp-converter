"use client";

import { useCallback, useState } from "react";
import JSZip from "jszip";
import DropZone from "./DropZone";
import ImageCard, { type ConvertedImage } from "./ImageCard";
import {
  convertToWebp,
  isImageFile,
  getWebpFilename,
  downloadBlob,
  formatBytes,
} from "@/lib/convert";

export default function Converter() {
  const [images, setImages] = useState<ConvertedImage[]>([]);
  const [quality, setQuality] = useState(80);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleFiles = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter(isImageFile);
      if (!imageFiles.length) return;

      setConverting(true);
      setProgress({ current: 0, total: imageFiles.length });

      const results: ConvertedImage[] = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        try {
          const { blob, width, height } = await convertToWebp(file, quality);
          results.push({
            id: `${Date.now()}-${i}`,
            originalFile: file,
            originalSize: file.size,
            webpBlob: blob,
            webpSize: blob.size,
            width,
            height,
            previewUrl: URL.createObjectURL(blob),
          });
        } catch (err) {
          console.error(`Failed to convert ${file.name}:`, err);
        }
        setProgress({ current: i + 1, total: imageFiles.length });
      }

      setImages((prev) => [...prev, ...results]);
      setConverting(false);
    },
    [quality]
  );

  const handleDownloadAll = async () => {
    if (images.length === 1) {
      downloadBlob(
        images[0].webpBlob,
        getWebpFilename(images[0].originalFile.name)
      );
      return;
    }

    const zip = new JSZip();
    for (const img of images) {
      zip.file(getWebpFilename(img.originalFile.name), img.webpBlob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    downloadBlob(zipBlob, "converted-images.zip");
  };

  const handleClear = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  };

  const totalOriginal = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalWebp = images.reduce((sum, img) => sum + img.webpSize, 0);
  const totalSavings =
    totalOriginal > 0
      ? Math.round(((totalOriginal - totalWebp) / totalOriginal) * 100)
      : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-300">
            Quality: {quality}%
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            disabled={converting}
            className="h-2 w-40 cursor-pointer appearance-none rounded-full bg-slate-700 accent-brand-500 disabled:opacity-50"
          />
        </div>
        {images.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-500"
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
              Download All ({images.length})
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <DropZone onFiles={handleFiles} disabled={converting} />

      {converting && (
        <div className="flex items-center justify-center gap-3 rounded-xl bg-slate-800/50 p-6">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <span className="text-sm text-slate-300">
            Converting {progress.current} of {progress.total}...
          </span>
        </div>
      )}

      {images.length > 0 && (
        <>
          <div className="flex items-center justify-between rounded-xl bg-slate-800/30 px-4 py-3 text-sm">
            <span className="text-slate-400">
              {images.length} image{images.length !== 1 ? "s" : ""} converted
            </span>
            <span className="text-slate-300">
              {formatBytes(totalOriginal)} →{" "}
              <span className="font-semibold text-brand-400">
                {formatBytes(totalWebp)}
              </span>
              {totalSavings > 0 && (
                <span className="ml-2 text-brand-400">({totalSavings}% smaller)</span>
              )}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <ImageCard key={img.id} image={img} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
