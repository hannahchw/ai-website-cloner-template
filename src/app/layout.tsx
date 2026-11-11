import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./site.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "clickTRUE Malaysia | Inbound Marketing Agency",
  description:
    "clickTRUE is a digital marketing consultancy that specialises in inbound strategy and lead generation for B2B and Education brands.",
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
