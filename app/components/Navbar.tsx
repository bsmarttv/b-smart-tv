"use client";
import React, { useState, useEffect, useRef, useTransition } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // 🎯 الدالة الذكية اللي كتحسب المسافة باش ما يتخباش المحتوى تحت الـ Navbar
  const scrollToEssai = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('essai');
    if (element) {
      const offset = 100; // 100 بيكسل هي المساحة ديال Navbar باش يبقى كلشي باين
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      router.push(`/${locale}#essai`);
    }
    setIsOpen(false);
  };

  const changeLanguage = (nextLocale: 'fr' | 'en') => {
    if (nextLocale === locale) { setIsDesktopOpen(false); setIsMobileOpen(false); return; }
    
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.pause();
      video.src = "";
      video.load();
    });

    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === locale) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }
    
    const newPath = '/' + segments.join('/');
    
    startTransition(() => {
      router.push(newPath);
    });
    setIsDesktopOpen(false);
    setIsMobileOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
        setIsDesktopOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-10 lg:px-20 py-4 flex items-center justify-between gap-4">
        
        {/* 1. الـ Logo - 🎯 زدنا flex-shrink-0 باش مستحيل يتزير أو يقيسو شي رابط */}
        <Link href={`/${locale}`} prefetch={false} className="flex-shrink-0 text-xl md:text-2xl font-black tracking-tighter italic text-[#3B82F6] flex items-center gap-1.5">
          <span className="border-2 border-[#3B82F6] p-1 rounded-md text-xs font-bold">TV</span>
          B-SMART<span className="text-white">TV</span>
        </Link>

        {/* 2. الـ الروابط (Links) - 🎯 هادا هو التعديل الأساسي! */}
        {/* زدنا mx-auto باش يشد الوسط نيشاان، و gap-x-6 أو gap-x-8 على حسب عرض الشاشة، و whitespace-nowrap باش الكلمات ما يتهرسوش */}
        <div className="hidden md:flex items-center justify-center gap-x-6 lg:gap-x-8 mx-auto text-[12px] font-bold uppercase tracking-[0.2em] text-white/90">
          <Link href={`/${locale}`} prefetch={false} className="relative group text-[#94A3B8] hover:text-white transition duration-300 cursor-pointer whitespace-nowrap">
            {locale === 'en' ? 'Home' : 'Accueil'}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href={`/${locale}/nos-chaines`} prefetch={false} className="relative group text-[#94A3B8] hover:text-white transition duration-300 cursor-pointer whitespace-nowrap">
            {locale === 'en' ? 'Our Channels' : 'Nos chaînes'}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href={`/${locale}/revendeur`} prefetch={false} className="relative group text-[#94A3B8] hover:text-white transition duration-300 cursor-pointer whitespace-nowrap">
            {locale === 'en' ? 'Reseller' : 'Revendeur'}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href={`/${locale}/installation`} prefetch={false} className="relative group text-[#94A3B8] hover:text-white transition duration-300 cursor-pointer whitespace-nowrap">
            Installation
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a href={`/${locale}#essai`} onClick={scrollToEssai} className="relative group text-[#94A3B8] hover:text-white transition duration-300 cursor-pointer whitespace-nowrap">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* 3. الـ اليمين (Buttons + Dropdown) - 🎯 زدنا flex-shrink-0 لحماية المساحة */}
        <div className="flex items-center gap-4 relative z-[100010] flex-shrink-0">
          
          <button 
            onClick={scrollToEssai}
            className="hidden md:block text-white px-4 py-2.5 rounded-xl font-black cursor-pointer shadow-xl active:scale-95 transition-all duration-500 hover:scale-105 bg-gradient-to-r from-[#3B82F6] via-[#1e3a8a] to-[#3B82F6] bg-[length:200%_auto] hover:bg-[position:right_center] uppercase text-xs tracking-wider whitespace-nowrap"
          >
            Test IPTV
          </button>

          <div ref={desktopDropdownRef} className="hidden md:block relative font-sans text-black">
            <button
              onClick={() => !isPending && setIsDesktopOpen(!isDesktopOpen)}
              className={`flex items-center justify-between w-[68px] bg-white px-3 py-2 rounded-xl shadow-lg border border-gray-200 font-black text-[13px] tracking-wide uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none ${isPending ? 'opacity-50 cursor-wait' : ''}`}
            >
              <span>{locale.toUpperCase()}</span>
              <svg className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-300 ${isDesktopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDesktopOpen && (
              <div className="absolute top-full mt-2 right-0 w-[110px] bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden divide-y divide-gray-100 z-50">
                <button onClick={() => changeLanguage('fr')} className={`w-full flex justify-center items-center px-3 py-2.5 font-bold text-xs hover:bg-gray-50 ${locale === 'fr' ? 'bg-blue-50/60 text-[#3B82F6]' : 'text-gray-700'}`}>Français</button>
                <button onClick={() => changeLanguage('en')} className={`w-full flex justify-center items-center px-3 py-2.5 font-bold text-xs hover:bg-gray-50 ${locale === 'en' ? 'bg-blue-50/60 text-[#3B82F6]' : 'text-gray-700'}`}>English</button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <div ref={mobileDropdownRef} className="relative font-sans text-black">
              <button 
                onClick={() => !isPending && setIsMobileOpen(!isMobileOpen)} 
                className="flex items-center justify-between w-[68px] bg-white px-2.5 py-1.5 rounded-xl shadow-md font-black text-[11px] uppercase cursor-pointer border border-gray-200"
              >
                <span>{locale.toUpperCase()}</span>
                <svg className={`w-3 h-3 text-gray-600 transition-transform duration-300 ${isMobileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isMobileOpen && (
                <div className="absolute top-full mt-2 right-0 w-[105px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 divide-y divide-gray-100 z-[100015]">
                  <button onClick={() => changeLanguage('fr')} className={`w-full py-2.5 text-center text-xs font-bold block ${locale === 'fr' ? 'bg-blue-50 text-[#3B82F6]' : 'text-gray-700'}`}>Français</button>
                  <button onClick={() => changeLanguage('en')} className={`w-full py-2.5 text-center text-xs font-bold block ${locale === 'en' ? 'bg-blue-50 text-[#3B82F6]' : 'text-gray-700'}`}>English</button>
                </div>
              )}
            </div>
            
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none cursor-pointer p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {isOpen && (
        // 🛠️ هنا صلحنا الارتفاع رجعناه fixed inset-y-0 مع h-[100dvh] الذكية د التيليفونات
        <div className="fixed inset-y-0 right-0 h-[100dvh] w-screen z-[9999] flex md:hidden">
          
          <div 
            className="flex-1 h-full bg-black/40"
            onClick={() => setIsOpen(false)}
            style={{ WebkitBackdropFilter: 'blur(20px) saturate(140%)', backdropFilter: 'blur(20px) saturate(140%)' }}
          />

          {/* 🛠️ الـ Container الرئيسي نقصنا العرض لـ w-[260px] وزدنا pb-12 باش البوطون تطلع فوق التلفون ديريكت */}
          <div className="w-[260px] sm:w-[300px] h-full bg-[#09090b] flex flex-col justify-between border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] pb-12 animate-[slideInRight_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            
            <div>
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="text-lg font-black italic text-[#3B82F6]">
                  B-SMART<span className="text-white">TV</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col px-6 w-full text-left font-bold text-[12px] uppercase tracking-widest text-white/90 mt-2">
                <Link href={`/${locale}`} prefetch={false} onClick={() => setIsOpen(false)} className="py-4 border-b border-white/5 hover:text-[#3B82F6] transition-colors w-full block">
                  {locale === 'en' ? 'HOME' : 'ACCUEIL'}
                </Link>
                <Link href={`/${locale}/nos-chaines`} prefetch={false} onClick={() => setIsOpen(false)} className="py-4 border-b border-white/5 hover:text-[#3B82F6] transition-colors w-full block">
                  {locale === 'en' ? 'OUR CHANNELS' : 'NOS CHAÎNES'}
                </Link>
                <Link href={`/${locale}/revendeur`} prefetch={false} onClick={() => setIsOpen(false)} className="py-4 border-b border-white/5 hover:text-[#3B82F6] transition-colors w-full block">
                  {locale === 'en' ? 'RESELLER' : 'REVENDEUR'}
                </Link>
                <Link href={`/${locale}/installation`} prefetch={false} onClick={() => setIsOpen(false)} className="py-4 border-b border-white/5 hover:text-[#3B82F6] transition-colors w-full block">
                  INSTALLATION
                </Link>
                <a href={`/${locale}#essai`} onClick={scrollToEssai} className="py-4 hover:text-[#3B82F6] transition-colors w-full block">
                  CONTACT
                </a>
              </div>
            </div>

            {/* 🛠️ هنا عطينا للبوطون px-4 و mb-4 باش تجي مجموعة وباينة ونقصنا حجم الخط شوية */}
            <div className="px-4 w-full">
              <button 
                onClick={scrollToEssai}
                className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-600 text-white font-black rounded-xl text-[11px] tracking-widest transition-colors shadow-2xl active:scale-95 uppercase"
              >
                TEST IPTV
              </button>
            </div>

          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}} />
    </>
  );
}