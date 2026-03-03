import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundWatermark } from "@/components/BackgroundWatermark";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subtenente Sergio",
  description:
    "Landing page oficial do Subtenente Sergio: seguranca publica, valorizacao policial, familia e ordem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundWatermark />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
