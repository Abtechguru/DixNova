import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DixNova | Public Transportation Intelligence Platform",
  description: "Driven by Data — Advanced Public Transportation Analytics & Command Center by DixNova.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className={`${inter.className} bg-navy-950 text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950`}
      >
        {children}
      </body>
    </html>
  );
}
