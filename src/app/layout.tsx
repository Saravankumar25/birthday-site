import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Keerthi",
  description: "A cinematic birthday experience crafted with love.",
  metadataBase: new URL("https://birthday-keerthi.vercel.app"),
  openGraph: {
    title: "Happy Birthday, Keerthi",
    description: "A cinematic birthday experience crafted with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="bg-[var(--background)] text-white font-[var(--font-inter)]">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
