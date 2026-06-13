import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    <html 
      lang="fr"
      suppressHydrationWarning 
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
   <body className="min-h-full flex flex-col bg-[#050505] text-white">
        {/* الـ Navbar ديالك */}
        <Navbar />
        
        {/* المحتوى د السيت */}
        <main className="flex-grow pt-[72px]">{children}</main>

        {/* 🎯 مسمار كوكل أدس الجديد المـستهدف لبلجيكا */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18223390926"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18223390926');
          `}
        </Script>

        {/* الـ التاغ مانجر القديم ديالك خليناه ف التيـساع بلاصتو */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NX7Z2G4Z"
        />

        {/* ⚡ المراقبة الذكية لسرعة السيت من Vercel */}
        <SpeedInsights />
      </body>
    </html>
  );
}