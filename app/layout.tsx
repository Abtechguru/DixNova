import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ProgramWatermark } from "@/components/layout/ProgramWatermark";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "DixNova | Transportation Analytics & Decision Intelligence",
  description: "Enterprise Transportation Analytics & Executive Decision Support Platform by Team DixNova.",
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
        className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground relative`}
      >
        {children}
        <ProgramWatermark />
      </body>
    </html>
  );
}
