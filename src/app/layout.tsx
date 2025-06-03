import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { neueMontreal, cardo, lato, callingCode } from "./fonts";

// Metadata
export const metadata: Metadata = {
  title: "Intrinsic Labs LLC | Software Development Studio",
  description: "Thoughtful, human-centered software development studio.",
  keywords: ["software development", "mobile development", "web development", "iOS", "Android", "Swift", "Kotlin", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${neueMontreal.variable}
        ${cardo.variable}
        ${lato.variable}
        ${callingCode.variable}
      `}
    >
      <body
        className={`antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
