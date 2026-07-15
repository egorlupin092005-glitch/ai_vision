import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-VISION — The Encyclopedia of AI Engineering",
  description:
    "Encyclopedia, assistant and aggregator for vibe coders and AI developers. Benchmarks, repositories, guides, and tools.",
  openGraph: {
    title: "AI-VISION",
    description: "The Encyclopedia of AI Engineering",
    siteName: "AI-VISION",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className="min-h-full bg-bg-primary text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
