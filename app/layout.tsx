import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";

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
  params, // 🎯 زدنا params هنا باش نعرفو واش fr أولا en أوتوماتيكياً
}: {
  children: React.ReactNode;
  params: { locale: string }; // 🎯 تحديد النوع د الـ params فـ TypeScript
}) {
  return (
    <html 
      lang={params?.locale || "fr"} // 🎯 كايقرا اللغة ديناميكياً على حساب المتصفح
      suppressHydrationWarning 
      data-scroll-behavior="smooth" // 🚀 الضربة القاضية اللي غاتحيد الـ Warning د الـ Smooth Scroll نهائياً!
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        {/* الـ Navbar ديالك */}
        <Navbar />
        
        {/* المحتوى د السيت */}
        <main className="flex-grow pt-[72px]">{children}</main>

        {/* التاغ مانجر الذكي */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NX7Z2G4Z"
        />
      </body>
    </html>
  );
}