import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DixNova | Public Transportation Intelligence Platform",
  description: "Innovation driven by data - Advanced analytics for public transport authorities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-navy-950 text-slate-100 antialiased selection:bg-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
