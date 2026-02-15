import type { Metadata } from "next";
import { Fredoka, Urbanist } from "next/font/google";
import "./globals.css";

export const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fredoka",
});

export const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Snuggl",
  description: "Adopt, don't shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${fredoka.variable} ${urbanist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
