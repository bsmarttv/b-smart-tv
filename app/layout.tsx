import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";import Navbar from "./components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B-SMART TV",
  description: "B-SMART TV IPTV Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        {/* الـ Navbar دابا عيطنا ليه هنا وغادي يبقى شاد بلاصتو بلا ما يتعاود يتشارجا */}
        <Navbar />
        
        {/* هنا فين كيتشارجا المحتوى المتغير ديال كاع الصفحات */}
        <main className="flex-grow pt-[72px]">{children}</main>
      </body>
    </html>
  );
}