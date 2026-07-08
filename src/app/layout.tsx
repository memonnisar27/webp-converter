import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebP Converter — Convert Images to WebP Online",
  description:
    "Free online tool to convert JPG, PNG, GIF, and BMP images to WebP format. Fast, private, and runs entirely in your browser.",
  keywords: ["webp", "converter", "image", "jpg", "png", "compress"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
