import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Kuala Lumpur, Malaysia | clickTRUE",
  description:
    "clickTRUE is an integrated digital marketing agency in Kuala Lumpur, with one team across brand, content, performance, SEO and web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-surface font-sans text-ink selection:bg-accent selection:text-surface">{children}</body>
    </html>
  );
}
