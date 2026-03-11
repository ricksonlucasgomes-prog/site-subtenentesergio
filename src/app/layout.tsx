import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlobalLogoParallax } from "@/components/GlobalLogoParallax";
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
    "Landing page oficial do Subtenente Sergio: segurança pública, valorização policial, família e ordem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} app-shell min-h-screen overflow-x-clip antialiased`}>
        <GlobalLogoParallax />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
