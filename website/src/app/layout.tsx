import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// Metadata
export const metadata: Metadata = {
  title: "Intrinsic Labs | Mobile & Web Development Studio",
  description: "We build exceptional digital experiences that solve real problems, from native mobile apps to full-stack web applications.",
  keywords: ["mobile development", "web development", "iOS", "Android", "Swift", "Kotlin", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/CallingCode-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Grid pattern overlay */}
        <div className="grid-pattern" />
        
        {/* Grain texture overlay */}
        <div className="grain-overlay" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Vercel Analytics */}
        <Analytics />
        
        {/* Helper script for hydration */}
        <Script id="hydration-helper" strategy="afterInteractive">
          {`
            // Force a repaint to ensure client components render properly
            document.body.style.display = 'none';
            setTimeout(() => {
              document.body.style.display = '';
            }, 10);
          `}
        </Script>
      </body>
    </html>
  );
}
