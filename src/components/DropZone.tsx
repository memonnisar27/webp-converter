"use client";

import { useCallback, useRef, useState } from "react";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}

export default function DropZone({ onFiles, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onFiles(files);
    },
    [disabled, onFiles]
  );

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFiles(files);
    e.target.value = "";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
        isDragging
          ? "border-brand-400 bg-brand-500/10 scale-[1.01]"
          : "border-slate-700 bg-slate-800/50 hover:border-brand-500/50 hover:bg-slate-800/80"
      } ${disabled ? "pointer-events-none opacity-50" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/bmp,image/tiff,image/svg+xml"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors ${
          isDragging
            ? "bg-brand-500/20 text-brand-400"
            : "bg-slate-700/50 text-slate-400 group-hover:bg-brand-500/10 group-hover:text-brand-400"
        }`}
      >
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>

      <p className="text-lg font-medium text-slate-200">
        {isDragging ? "Drop images here" : "Drag & drop images here"}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        or click to browse — JPG, PNG, GIF, BMP, TIFF, SVG
      </p>
    </div>
  );
}
