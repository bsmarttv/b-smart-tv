"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; 
import { useParams } from 'next/navigation';
import Link from 'next/link';

// ─── UNIFIED SECTION (SLIDER + IMAGE ON THE RIGHT) ───
function UnifiedSection() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const postersData = ["11.png","12.png", "13.png","14.png","15.png"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 bg-[#050505] border-t border-white/5 overflow-hidden contain-paint">
      <div className="flex flex-col lg:flex-row items-center gap-8 pr-6 lg:pr-16 pl-0 w-full transform-gpu isolate">
        
        <div className="w-full lg:w-1/2 flex items-center overflow-hidden transform-gpu backface-hidden">
          <DraggableSlider items={postersData} variant="four-posters" />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4 lg:h-[280px] py-2 transform-gpu">
          <div className={`flex-1 min-h-0 flex items-center justify-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}>
            <img 
              src="/all-devices.webp" 
              alt="Main Feature" 
              className="w-full h-full object-contain transition-transform duration-500 ease-out hover:[transform:scale(1.02)_translateZ(0)] will-change-transform cursor-pointer transform-gpu" 
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            />
          </div>
          
          <div className="flex justify-center w-full">
            <button 
              onClick={() => window.open("https://wa.me/447723340014", "_blank")}
              className="w-fit bg-gradient-to-r from-[#3B82F6] via-[#1e3a8a] to-[#3B82F6] bg-[length:200%_auto] hover:bg-[position:right_center] text-white py-2.5 px-8 rounded-xl font-black transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 cursor-pointer text-sm flex items-center gap-2 uppercase tracking-wide transform-gpu"
            >
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.173.001 6.154 1.241 8.396 3.486 2.241 2.246 3.475 5.23 3.471 8.406-.013 6.545-5.352 11.893-11.901 11.893-2.008-.002-3.98-.511-5.73-1.479L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436 0 9.86-4.427 9.872-9.869.006-2.636-1.018-5.114-2.885-6.983A9.782 9.782 0 0 0 11.944 1.41C6.51 1.41 2.083 5.834 2.072 11.272c-.001 1.63.435 3.21 1.262 4.623l-.116.185-1.018 3.722 3.812-.999.191.113z"/>
              </svg>
              {locale === 'en' ? 'Contact Us' : 'Contactez-Nous'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DRAGGABLE SLIDER COMPONENT (AUTO-PLAY ONLY) ───
interface DraggableSliderProps {
  items: string[];
  variant?: "four-posters" | "mini-poster" | "poster" | "default" | "clean-logo" | "logo";
  direction?: "left" | "right";
}

function DraggableSlider({
  items,
  variant = "default",
  direction = "left"
}: DraggableSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentVariant = variant as string;
  const isCleanLogo = currentVariant === "clean-logo" || currentVariant === "clean_logo" || currentVariant === "cleanLogo";
  const isLogoType = currentVariant === "logo" || isCleanLogo;

  const params = useParams();
  const locale = (params?.locale as string) || 'fr';

  const displayItems = isLogoType ? [...items, ...items, ...items] : [...items, ...items, ...items, ...items, ...items, ...items];

  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLogoType || !sliderRef.current) return;
    
    const slider = sliderRef.current;

    const killAllAnimations = () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };

    const startAutoPlay = () => {
      killAllAnimations();

      autoPlayTimerRef.current = setInterval(() => {
        if (!slider || slider.children.length < 2) return;
        
        const firstCard = slider.children[0] as HTMLElement;
        const secondCard = slider.children[1] as HTMLElement;
        const stepSize = secondCard.offsetLeft - firstCard.offsetLeft;

        const maxScroll = slider.scrollWidth / 2;
        if (slider.scrollLeft >= maxScroll) {
          slider.style.scrollBehavior = 'auto';
          slider.scrollLeft = slider.scrollLeft - maxScroll;
        }

        const startScroll = slider.scrollLeft;
        const targetScroll = startScroll + stepSize;
        const duration = 850; 
        const startTime = performance.now();

        slider.style.scrollSnapType = 'none';

        const easeInOutQuart = (t: number) => {
          return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        };

        const animateScroll = (currentTime: number) => {
          if (!slider) return;
          const timeElapsed = currentTime - startTime;
          let progress = timeElapsed / duration;
          if (progress > 1) progress = 1;

          slider.scrollLeft = startScroll + (targetScroll - startScroll) * easeInOutQuart(progress);

          if (progress < 1) {
            animFrameRef.current = requestAnimationFrame(animateScroll);
          } else {
            slider.style.scrollSnapType = 'x mandatory';
          }
        };

        animFrameRef.current = requestAnimationFrame(animateScroll);
      }, 1500); 
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAutoPlay();
        else killAllAnimations();
      },
      { threshold: 0.2 }
    );

    observer.observe(slider);

    return () => {
      killAllAnimations();
      observer.disconnect();
    };
  }, [isLogoType, locale]);

  const getCleanSrc = (item: any) => {
    if (!item) return "";
    const itemStr = String(item);
    if (itemStr.startsWith('http://') || itemStr.startsWith('https://')) return itemStr;
    const hasExtension = itemStr.includes('.');

    if (isCleanLogo || currentVariant === "logo") {
      return hasExtension ? `/logos/${itemStr}` : `/logos/${itemStr}.png`;
    }
    return hasExtension ? `/posters/${itemStr}` : `/posters/${itemStr}.jpg`;
  };

  const currentGapClass = isCleanLogo ? "gap-12" : "gap-4";

  return (
    <div className="w-full overflow-hidden bg-transparent relative flex pointer-events-none" style={{ contentVisibility: 'auto' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
        @keyframes marqueeRight { 0% { transform: translate3d(-50%, 0, 0); } 100% { transform: translate3d(0, 0, 0); } }
        .marquee-track { display: flex; width: max-content; will-change: transform; }
        .marquee-anim-left { animation: marqueeLeft 20s linear infinite; }
        .marquee-anim-right { animation: marqueeRight 20s linear infinite; }
        .marquee-clean-left { animation: marqueeLeft 26s linear infinite; }
        .marquee-clean-right { animation: marqueeRight 26s linear infinite; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .smooth-slider-gpu { will-change: scroll-position; transform: translate3d(0,0,0); }
      `}} />

      {isLogoType ? (
        <div className="w-full overflow-hidden py-3">
          <div className={`marquee-track ${currentGapClass} ${
            direction === "right" 
              ? (isCleanLogo ? "marquee-clean-right" : "marquee-anim-right")
              : (isCleanLogo ? "marquee-clean-left" : "marquee-anim-left")
          }`}>
            {displayItems.map((item, index) => (
              <div key={`l1-${index}`} className={isCleanLogo ? "w-24 h-12 flex-shrink-0 flex items-center justify-center bg-transparent mx-2" : "w-16 h-16 md:w-20 md:h-20 lg:w-[85px] lg:h-[85px] border-2 border-[#3B82F6] rounded-2xl p-2 bg-white/5 flex-shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] transform-gpu"}>
                <img src={getCleanSrc(item)} alt="Logo Item" draggable="false" className="w-full h-full object-contain pointer-events-none antialiased transform-gpu" />
              </div>
            ))}
            {displayItems.map((item, index) => (
              <div key={`l2-${index}`} className={isCleanLogo ? "w-24 h-12 flex-shrink-0 flex items-center justify-center bg-transparent mx-2" : "w-16 h-16 md:w-20 md:h-20 lg:w-[85px] lg:h-[85px] border-2 border-[#3B82F6] rounded-2xl p-2 bg-white/5 flex-shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] transform-gpu"}>
                <img src={getCleanSrc(item)} alt="Logo Item Duplicate" draggable="false" className="w-full h-full object-contain pointer-events-none antialiased transform-gpu" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="flex items-center w-full py-4 overflow-hidden scrollbar-none px-2 gap-3 scroll-pl-2 select-none smooth-slider-gpu"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayItems.map((item, index) => {
            let cardClass = "snap-start flex-shrink-0 transform-gpu ";
            if (currentVariant === "four-posters") {
              cardClass += "w-32 h-48 md:w-40 md:h-56 lg:w-48 lg:h-64 rounded-xl overflow-hidden border-2 border-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.45)]";
            } else if (currentVariant === "mini-poster") {
              cardClass += "w-32 h-48 md:w-44 md:h-64 lg:w-[240px] lg:h-[360px] rounded-xl overflow-hidden border-2 border-[#3B82F6] shadow-[0_0_18px_rgba(59,130,246,0.5)]";
            } else {
              cardClass += "w-48 h-72 md:w-60 md:h-[340px] rounded-2xl overflow-hidden border-2 border-[#3B82F6] shadow-[0_0_22px_rgba(59,130,246,0.6)]";
            }

            return (
              <div key={index} className={cardClass}>
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img src={getCleanSrc(item)} alt="Slider Item" draggable="false" className="w-full h-full object-cover pointer-events-none antialiased" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── MISSION SECTION ───
function MissionSection() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const __observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          __observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) __observer.observe(sectionRef.current);
    return () => __observer.disconnect();
  }, []);

  const features = locale === 'en' ? [
    "High-quality operation without interruptions is 100% guaranteed",
    "Adult package is also available upon request.",
    "Enjoy your favorite channels in 4K / FHD / HD / SD.",
    "24/7 Expert Support.",
    "Satisfied or refunded.",
    "Never miss your favorite matches, shows, and series!"
  ] : [
    "Un fonctionnement de haute qualité sans interruptions est garanti à 100%",
    "Le \"bouquet adulte\" également disponible sur demande.",
    "Profitez de vos chaînes préférées en 4K / FHD / HD / SD.",
    "Support Expert 24/7.",
    "Satisfait ou remboursé.",
    "Ne manquez jamais vos matchs, émissions et séries préférés !"
  ];

  return (
    <section ref={sectionRef} className="py-10 px-8 md:px-20 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <h2 className={`text-4xl md:text-[25px] font-bold text-white mb-10 leading-[1.2] transform transition-all duration-700 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {locale === 'en' ? 'Our ultimate mission is your satisfaction:' : 'Notre mission ultime est votre satisfaction:'}
          </h2>
          <ul className="space-y-2 mb-12">
            {features.map((feature, index) => (
              <li 
                key={index} 
                className={`flex items-start gap-4 transform transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${300 + (index * 150)}ms` }}
              >
                <svg className="w-6 h-6 text-[#E11D48] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-medium text-[17px]">{feature}</span>
              </li>
            ))}
          </ul>
<button 
  onClick={() => window.open("https://wa.me/447723340014", "_blank")}
  className={`mt-auto mb-10 mx-auto w-[90%] text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 cursor-pointer transform btn-premium-red ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
  style={{ transition: 'all 0.4s ease', transitionDelay: '200ms' }}
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
  <span className="text-lg tracking-wide">{locale === 'en' ? 'Test IPTV' : 'Test IPTV'}</span>
</button>
        </div>
        <div className={`w-full lg:w-1/2 relative group transform transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img src="/Interface-VF.svg" alt="Interface TV" className="relative w-full h-auto drop-shadow-2xl rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS SECTION ───
function HowItWorksSection() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const __observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          __observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) __observer.observe(sectionRef.current);
    return () => __observer.disconnect();
  }, []);

  const steps = locale === 'en' ? [
    {
      icon: <svg className="w-12 h-12 text-white mb-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "Place Your Order",
      desc: "Place your order by choosing the subscription duration that suits you: 1, 3, 6, or 12 months."
    },
    {
      icon: <svg className="w-12 h-12 text-white mb-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      title: "Get Your Account",
      desc: <>This process takes 15 to 30 minutes. Please check your inbox and spam folder. To speed up the process, <span onClick={() => window.open("https://wa.me/447723340014", "_blank")} className="text-[#E11D48] font-bold cursor-pointer hover:underline">please contact us via WhatsApp.</span></>
    },
    {
      icon: <svg className="w-12 h-12 text-white mb-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "Enjoy Your IPTV!",
      desc: "Enjoy all channels, movies, and series right now!"
    }
  ] : [
    {
      icon: <svg className="w-12 h-12 text-white mb-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "Passez votre commande",
      desc: "Passez votre commande en choosing la durée d'abonnement qui vous convient : 1, 3, 6 ou 12 mois."
    },
    {
      icon: <svg className="w-12 h-12 text-white mb-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      title: "Obtenez votre compte.",
      desc: <>Ce processus peut prendre de 15 à 30 minutes. Veuillez vérifier votre boîte de réception ainsi que votre dossier de courriers indésirables. Pour accélérer le processus, <span onClick={() => window.open("https://wa.me/447723340014", "_blank")} className="text-[#E11D48] font-bold cursor-pointer hover:underline">please contact us via WhatsApp.</span></>
    },
    {
      icon: <svg className="w-12 h-12 text-white mb-6 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "Profitez de votre service IPTV !",
      desc: "Profitez de tous les canaux, films et séries dès maintenant !"
    }
  ];

  return (
    <section ref={sectionRef} className="py-10 px-6 md:px-10 lg:px-20 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-2xl md:text-4xl font-bold text-center text-white mb-10 tracking-tight transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {locale === 'en' ? 'How does it work?' : 'Comment ça marche ?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`bg-[#111111] border border-white/5 rounded-2xl p-8 md:p-10 text-center hover:border-white/20 transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {step.icon}
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING SECTION ───
// ─── PRICING SECTION ───
function PricingSection() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [accounts, setAccounts] = useState<1 | 2 | 3>(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const __observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          __observer.disconnect();
        }
      },
      { threshold: 0.2
       }
    );
    if (sectionRef.current) __observer.observe(sectionRef.current);
    return () => __observer.disconnect();
  }, []);

  const pricingData = {
    1: [
      { duration: locale === 'en' ? "1 MONTH" : "1 MOIS", months: 1, price: 9.99, btn: locale === 'en' ? "START NOW" : "COMMENCER", popular: false },
      { duration: locale === 'en' ? "3 MONTHS" : "3 MOIS", months: 3, price: 24.99, btn: locale === 'en' ? "BEST OFFER" : "MEILLEURE OFFRE", popular: false },
      { duration: locale === 'en' ? "6 MONTHS" : "6 MOIS", months: 6, price: 39.99, btn: locale === 'en' ? "BEST OFFER" : "MEILLEURE OFFRE", popular: false },
      { duration: locale === 'en' ? "12 MONTHS" : "12 MOIS", months: 12, price: 64.99, btn: locale === 'en' ? "EXCELLENT VALUE" : "EXCELLENT RAPPORT", popular: true }
    ],
    2: [
      { duration: locale === 'en' ? "1 MONTH" : "1 MOIS", months: 1, price: 14.99, btn: locale === 'en' ? "START NOW" : "COMMENCER", popular: false },
      { duration: locale === 'en' ? "3 MONTHS" : "3 MOIS", months: 3, price: 34.99, btn: locale === 'en' ? "BEST OFFER" : "MEILLEURE OFFRE", popular: false },
      { duration: locale === 'en' ? "6 MONTHS" : "6 MOIS", months: 6, price: 54.99, btn: locale === 'en' ? "BEST OFFER" : "MEILLEURE OFFRE", popular: false },
      { duration: locale === 'en' ? "12 MONTHS" : "12 MOIS", months: 12, price: 89.99, btn: locale === 'en' ? "EXCELLENT VALUE" : "EXCELLENT RAPPORT", popular: true }
    ],
    3: [
      { duration: locale === 'en' ? "1 MONTH" : "1 MOIS", months: 1, price: 19.99, btn: locale === 'en' ? "START NOW" : "COMMENCER", popular: false },
      { duration: locale === 'en' ? "3 MONTHS" : "3 MOIS", months: 3, price: 44.99, btn: locale === 'en' ? "BEST OFFER" : "MEILLEURE OFFRE", popular: false },
      { duration: locale === 'en' ? "6 MONTHS" : "6 MOIS", months: 6, price: 69.99, btn: locale === 'en' ? "BEST OFFER" : "MEILLEURE OFFRE", popular: false },
      { duration: locale === 'en' ? "12 MONTHS" : "12 MOIS", months: 12, price: 119.99, btn: locale === 'en' ? "EXCELLENT VALUE" : "EXCELLENT RAPPORT", popular: true }
    ]
  };

  const features = locale === 'en' ? [
    "Plus de 25 000 chaînes 4K, FHD et HD",
    "+170,000 HD, FHD VODs",
    "Switch between devices",
    "Free installation assistance",
    "Custom playlist setup",
    "VPN usage supported",
    "TV Guide (EPG)",
    "Weekly updates",
    "Watch on all your devices",
    "Anti-Freeze technology",
    "Free 24/7 VIP Support"
  ] : [
    "Plus de 25 000 chaînes 4K, FHD et HD",
    "+170 000 VOD HD, FHD",
    "Basculer entre les appareils",
    "Assistance à l'installation gratuite",
    "Configuration de la liste personnalisée",
    "Utilisation du VPN prise en charge",
    "Guide TV (EPG)",
    "Mise à jour hebdomadaire",
    "Regarder sur tous vos appareils",
    "Technologie antigel",
    "Assistance VIP gratuite 24h/24 et 7j/7"
  ];

  const trialFeatures = locale === 'en' ? [
    "4K, FHD, HD and SD",
    "Watch live channels",
    "+65,000 channels",
    "7 days money back",
    "+100,000 VODs",
    "WhatsApp Support",
    "Adult content (optional)"
  ] : [
    "4k, FHD, HD et SD",
    "Regardez des chaînes",
    "+65.000 chaînes",
    "7 jours money back",
    "+100.000 Vod",
    "Support WhatsApp",
    "Contenu pour adultes (optionnel)"
  ];

  return (
    <section ref={sectionRef} className="py-8 px-6 md:px-10 lg:px-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        <div className={`text-center mb-6 transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">
            {locale === 'en' ? <>CHOOSE YOUR <span className="text-[#3B82F6]">PLAN</span></> : <>CHOISISSEZ VOTRE <span className="text-[#3B82F6]">FORFAIT</span></>}
          </h2>
          <div className="h-1 w-20 bg-[#3B82F6] mx-auto rounded-full mb-4"></div>
        </div>

        <div className={`flex justify-center mb-6 transform transition-all duration-700 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0F1115] border border-white/10 p-1 rounded-full flex space-x-1 shadow-xl">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setAccounts(num as 1 | 2 | 3)}
                className={`py-2 px-5 md:px-8 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  accounts === num ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30" : "text-[#94A3B8] hover:text-white"
                }`}
              >
                {num} {locale === 'en' ? (num === 1 ? 'ACCOUNT' : 'ACCOUNTS') : (num === 1 ? 'COMPTE' : 'COMPTES')}
              </button>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 transform transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {pricingData[accounts].map((plan, index) => {
            const pricePerMonth = (plan.price / plan.months).toFixed(2);

            return (
              <div 
                key={index} 
                className="relative flex flex-col p-5 rounded-2xl bg-[#0F1115] border border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-500 hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                {plan.popular && (
                  <div className="absolute -top-1 -right-1 overflow-hidden w-24 h-24 rounded-tr-2xl z-20">
                    <div className="absolute top-5 -right-9 bg-[#E11D48] text-white text-[9px] font-black uppercase py-1 px-9 transform rotate-45 shadow-lg tracking-widest">
                      {locale === 'en' ? 'Popular' : 'Populaire'}
                    </div>
                  </div>
                )}

                <div className="text-center mb-2">
                  <h3 className="text-white text-lg font-black mb-0.5">{plan.duration}</h3>
                  <p className="text-[#94A3B8] text-[9px] font-bold uppercase tracking-widest">{accounts} {locale === 'en' ? (accounts === 1 ? 'ACCOUNT' : 'ACCOUNTS') : (accounts === 1 ? 'COMPTE' : 'COMPTES')}</p>
                </div>

                <div className="text-center mb-3 border-y border-white/5 py-2 flex flex-col items-center justify-center min-h-[90px]">
                  <div className="text-[#3B82F6] text-3xl font-black flex items-center justify-center mb-0.5">
                    {plan.price.toFixed(2)}
                    <span className="text-lg ml-0.5 text-white">€</span>
                  </div>
                  
                  <div className="text-[#94A3B8] text-[12px] font-bold">
                    {pricePerMonth} {locale === 'en' ? '€/month' : '€/mois'}
                  </div>

                  {(accounts === 2 || accounts === 3) && (
                    <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-md py-0.5 px-1.5 mt-1">
                      <span className="text-[#10B981] font-black text-[10px] uppercase tracking-wide">
                        {accounts === 2 ? (locale === 'en' ? "💡 PACK 2" : "💡 PACK 2") : (locale === 'en' ? "💡 BEST PRICE 3" : "💡 MEILLEUR PRIX 3")}
                      </span>
                    </div>
                  )}
                </div>

                {accounts === 1 && plan.duration.includes("12") && (
                  <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg py-1.5 px-2 mb-3 flex flex-col items-center justify-center">
                    <span className="text-[#10B981] font-black text-[10px] uppercase mb-0.5">{locale === 'en' ? '🎁 BONUS: 1 Month FREE' : '🎁 BONUS : 1 mois GRATUIT'}</span>
                    <span className="text-[#10B981]/80 text-[8px] font-bold">{locale === 'en' ? '13 months for the price of 12' : '13 mois au prix de 12'}</span>
                  </div>
                )}

                <ul className="flex-1 space-y-2.5 mb-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg className="w-3.5 h-3.5 text-[#3B82F6] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80 text-[12.5px] leading-tight font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.open(`https://wa.me/447723340014?text=Bonjour, je souhaite commander la formule IPTV ${plan.duration} (${accounts} Comptes)`, "_blank")}
                  className="w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-tighter cursor-pointer mb-2 btn-premium-blue text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {plan.btn}
                </button>

                <div className="flex justify-center items-center gap-4 mt-3">
                <img 
  src="/payment-icons/icon-visa.svg" 
  alt="Visa" 
  width={38} 
  height={24} 
  className="h-6 w-auto rounded border border-white/10" 
/>

<img 
  src="/payment-icons/icon-mastercard.svg" 
  alt="Mastercard" 
  width={38} 
  height={24} 
  className="h-6 w-auto rounded border border-white/10" 
/>

<img 
  src="/payment-icons/icon-paypal.svg" 
  alt="Paypal" 
  width={38} 
  height={24} 
  className="h-6 w-auto rounded border border-white/10" 
/>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🎯 هادي هي البلاصة اللي تصلحات باش السكرول يحبس مقاد */}
        <div className="relative w-full bg-[#050505]">
          <div id="essai" className="absolute -top-[120px]"></div>
          
          <section className="w-full">
            <div className={`max-w-5xl mx-auto transform transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-center text-base font-bold text-white mb-3">
                {locale === 'en' ? '24-hour trial of IPTV coverage' : 'Essai de 24 heures de la couverture IPTV'}
              </h3>
              
              <div className="bg-[#0F1115] border border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] rounded-xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4 transition-all duration-500 hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                <div className="w-full lg:w-1/4 text-center lg:text-left">
                  <h4 className="text-base md:text-lg font-black text-white leading-tight">
                    {locale === 'en' ? <>24-hour<br/>testing</> : <>Essai de<br/>24 heures</>}
                  </h4>
                </div>
                
                <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                  {trialFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 border-b border-white/5 pb-1">
                      <svg className="w-3.5 h-3.5 text-white flex-shrink-0 bg-[#3B82F6] rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80 text-xs font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
                
                <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-end justify-center">
                  <div className="text-2xl font-black text-white mb-1">€ 0</div>
                  <button 
                    onClick={() => window.open("https://wa.me/447723340014?text=Bonjour, je souhaite tester le compte IPTV gratuit pendant 24h", "_blank")} 
                    className="text-white text-xs flex items-center justify-center gap-2 px-5 py-2 rounded-lg font-bold uppercase tracking-wider w-full lg:w-auto cursor-pointer btn-premium-red transition-transform hover:scale-[1.02]"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {locale === 'en' ? 'Order Test' : 'Commander'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </section>
  );
}

// ─── FOOTER SECTION ───
function FooterSection() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';

  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-10 pb-12 px-6 md:px-10 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        
        <div className="w-full md:w-1/4 flex justify-center md:justify-start">
          <div className="text-2xl font-black tracking-tighter italic text-[#3B82F6] flex items-center gap-2">
            <span className="border-2 border-[#3B82F6] p-1.5 rounded-lg text-sm">TV</span>
            B-SMART<span className="text-white">TV</span>
          </div>
        </div>

        <div className="w-full md:w-2/4 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-y-4 gap-x-8 text-[13px] font-bold text-white/90 text-center">
          <Link 
            href={`/${locale}/privacy-policy`} 
            className="hover:text-[#3B82F6] transition-colors whitespace-nowrap"
          >
            {locale === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
          </Link>

          <Link 
            href={`/${locale}/terms-of-use`} 
            className="hover:text-[#3B82F6] transition-colors whitespace-nowrap"
          >
            {locale === 'en' ? 'Terms of Use' : "Conditions d'utilisation"}
          </Link>

          <Link 
            href={`/${locale}/refund-policy`} 
            className="hover:text-[#3B82F6] transition-colors whitespace-nowrap"
          >
            {locale === 'en' ? 'Refund Policy' : 'Politique de remboursement'}
          </Link>

          <Link 
            href={`/${locale}/payment-methods`} 
            className="hover:text-[#3B82F6] transition-colors whitespace-nowrap"
          >
            {locale === 'en' ? 'Payment Methods' : 'Paiement'}
          </Link>

          <a 
            href={`/${locale}#essai`} 
            className="text-white hover:text-[#3B82F6] transition-all duration-200 whitespace-nowrap"
          >
            {locale === 'en' ? 'Contact' : 'Contact'}
          </a>
        </div>

        <div className="w-full md:w-1/4 flex flex-col items-center md:items-end gap-6 pt-4 md:pt-0 md:border-t-0 border-t border-white/5">
          <div className="flex items-center gap-2 text-white/70">
            <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="24" rx="3" fill="#141B4D"/>
              <path d="M13.2 16.5l1.6-9.6h2.5l-1.6 9.6h-2.5zm9.8-9.3c-.5-.2-1.3-.4-2.3-.4-2.4 0-4.1 1.3-4.1 3.1 0 1.4 1.2 2.1 2.2 2.6 1 .5 1.3.8 1.3 1.2 0 .6-.8.9-1.5.9-1 0-1.6-.2-2.4-.6l-.3-.1-.4 2.4c.7.3 1.9.6 3.1.6 2.5 0 4.2-1.2 4.2-3.2 0-1.1-.7-1.9-2.1-2.5-.9-.5-1.4-.8-1.4-1.3 0-.4.5-.9 1.5-.9.8 0 1.4.2 1.9.4l.2.1.4-2.3zm5.7 3.4c.2-.5.9-2.5.9-2.5l.2.6.5 2.9h-1.6zm2.4 5.9h2.2l-1.9-9.6H29c-.5 0-.9.3-1.1.7l-3.9 8.9h2.6l.5-1.4h3.2l.3 1.4zm-22.1 0l2.5-9.6H9.1l-2.4 6.5-.3-1.4c-.4-1.4-1.7-2.9-3.2-3.7l2.3 8.2h2.7z" fill="#FFF"/>
            </svg>
            <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="24" rx="3" fill="#222"/>
              <circle cx="15.5" cy="12" r="7" fill="#EB001B"/>
              <circle cx="20.5" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/>
            </svg>
            <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="24" rx="3" fill="#F2F5F7"/>
              <path d="M12.5 17.5l1.8-9c.1-.4.4-.7.8-.7h3.5c1.8 0 2.9.8 2.6 2.4-.3 1.8-1.5 2.8-3.2 2.8h-1.5l-1.1 5.5h-2.9zm3.5-7.5l-.7 3.5h.8c.8 0 1.4-.4 1.5-1.3.1-.8-.3-1.2-1-1.2h-.6z" fill="#003087"/>
              <path d="M14.5 19.5l1.8-9c.1-.4.4-.7.8-.7h3.5c1.8 0 2.9.8 2.6 2.4-.3 1.8-1.5 2.8-3.2 2.8h-1.5l-1.1 5.5h-2.9zm3.5-7.5l-.7 3.5h.8c.8 0 1.4-.4 1.5-1.3.1-.8-.3-1.2-1-1.2h-.6z" fill="#0079C1" opacity="0.6"/>
            </svg>
          </div>
          <div className="text-[#94A3B8] text-[11px] text-center md:text-right font-medium">
            © 2026 b-smart-tv.com — {locale === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </div>
        </div>

      </div>
    </footer>
  );
}

// ─── FAQ SECTION ───
function FaqSection() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const __observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          __observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) __observer.observe(sectionRef.current);
    return () => __observer.disconnect();
  }, []);

  const faqs = locale === 'en' ? [
    { q: "What is IPTV and how does it work?", a: "IPTV (Internet Protocol Television) delivers television programs via your Internet connection rather than traditional antennas or cable. You just need a good Internet connection and a compatible device (Smart TV, Android Box, PC, Smartphone)." },
    { q: "Can I use my subscription on multiple devices?", a: "Absolutely! Depending on the package you chose during ordering (1, 2, or 3 accounts), you can use our service on multiple devices simultaneously. With a 1-account plan, you can install it on multiple devices but use it on only one at a time." },
    { q: "What Internet speed is recommended?", a: "Pour une expérience fluide et sans coupures (grâce à notre technologie Anti-Freeze™), nous recommandons une vitesse de connexion d'au moins 15 Mbps pour la qualité HD/FHD, and de 30 Mbps for la 4K." },
    { q: "Is using a VPN allowed?", a: "Yes, absolutely. Using a VPN is fully supported and even recommended if your Internet Service Provider (ISP) blocks or throttles IPTV traffic." },
    { q: "Do you offer a money-back guarantee?", a: "Yes! We offer a 7-day money-back guarantee. If you are not completely satisfied with our service, contact us on WhatsApp and we will refund you in full." }
  ] : [
    { q: "Qu'est-ce que l'IPTV et comment ça marche ?", a: "L'IPTV (Internet Protocol Television) diffuse des programmes télévisés via votre connexion Internet plutôt que par des antennes traditionnelles ou le câble. Vous avez juste besoin d'une bonne connexion Internet et d'un appareil compatible (Smart TV, Box Android, PC, Smartphone)." },
    { q: "Puis-je utiliser mon abonnement sur plusieurs appareils ?", a: "Absolument ! Selon le forfait que vous avez choisi lors de la commande (1, 2 ou 3 comptes), vous pouvez utiliser notre service sur plusieurs appareils simultanément. Si vous avez un forfait 1 compte, vous pouvez l'installer sur plusieurs appareils mais l'utiliser sur un seul à la fois." },
    { q: "Quelle vitesse Internet est recommandée ?", a: "Pour une expérience fluide et sans coupures (grâce à notre technologie Anti-Freeze™), nous recommandons une vitesse de connexion d'au moins 15 Mbps pour la qualité HD/FHD, et de 30 Mbps for la 4K." },
    { q: "L'utilisation d'un VPN est-elle autorisée ?", a: "Oui, tout à fait. L'utilisation d'un VPN is entièrement prise en charge et même recommandée si votre fournisseur d'accès Internet (FAI) bloque ou bride le trafic IPTV." },
    { q: "Proposez-vous une garantie de remboursement ?", a: "Oui ! Nous offerons une garantie de remboursement de 7 jours. Si vous n'êtes pas entièrement satisfait de notre service, contactez-nous on WhatsApp et nous vous rembourserons intégralement." }
  ];

  return (
    <section ref={sectionRef} className="py-10 px-6 md:px-10 lg:px-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-10 transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            {locale === 'en' ? <>FREQUENTLY <span className="text-[#3B82F6] italic">ASKED QUESTIONS</span></> : <>QUESTIONS <span className="text-[#3B82F6] italic">FRÉQUEMMENT POSÉES</span></>}
          </h2>
          <div className="h-1 w-24 bg-[#3B82F6] mx-auto rounded-full mb-6"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-[#111111] border ${activeIndex === index ? 'border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-white/5'} rounded-2xl overflow-hidden transition-all duration-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 md:p-8 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors focus:outline-none cursor-pointer"
              >
                <span className={`font-bold text-base md:text-lg pr-4 transition-colors ${activeIndex === index ? 'text-[#3B82F6]' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-[#3B82F6] text-white rotate-180' : 'bg-white/5 text-[#94A3B8]'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 md:px-8 md:pb-8 text-[#94A3B8] text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN HOMECONTENT COMPONENT ───
function HomeContent() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
const slides = locale === 'en' ? [
    {
      id: 1,
      h1: <>Best <span className="text-[#3B82F6]">IPTV Subscription 2026</span> <br/> Watch Live TV, Movies and Sports in HD</>,
      p: <>Enjoy an ultra-smooth <span className="text-[#3B82F6]">4K</span> streaming and <span className="text-[#3B82F6]">buffer-free</span> experience on all your devices, wherever you are.</>,
      poster: "https://res.cloudinary.com/ddskjurfk/image/upload/v1780828302/hero-bg_w9ebsk.webp"
    },
    {
      id: 2,
      h1: <>The Latest Featured<br/> Movies & Series!</>,
      p: <>With <span className="text-[#3B82F6]">Strong IPTV</span> , dive into limitless entertainment: over 28,000 live channels and a rich catalog of 200,000 movies and series worldwide, with <span className="text-[#3B82F6]">100% guaranteed stability.</span></>,
      tag: "TV-EU", video: "https://res.cloudinary.com/ddskjurfk/video/upload/f_auto,q_auto/v1780506742/watching-together-family_kjtfsh.mp4",

    },
    {
      id: 3,
      h1: <>Let the Magic Happen:<br/> The Ultimate IPTV Experience.</>,
      p: <>Travel the world with our exceptional selection of international channels. A universe of endless entertainment, designed to satisfy all your desires.</>,
      tag: "TV-EU", video: "https://res.cloudinary.com/ddskjurfk/video/upload/f_auto,q_auto/v1780771731/Let_the_Magic_Happen__The_Ulti_chcc2z.mp4",

    }
  ] : [
    {
      id: 1,
      h1: <>Meilleur abonnement <span className="text-[#3B82F6]" ><br/> IPTV 2026</span> <br/> Regardez la télévision en direct, des films et du sport en HD</>,
      p: <>Profitez d'un streaming <span className="text-[#3B82F6]">4K</span> ultra-fluide et <span className="text-[#3B82F6]">sans coupure</span> sur tous vos appareils, où que vous soyez.</>,
       poster: "https://res.cloudinary.com/ddskjurfk/image/upload/v1780828302/hero-bg_w9ebsk.webp"
    },
    {
      id: 2,
      h1: <>Les derniers films<br/> et séries à la une !</>,
      p: "Avec Strong IPTV, plongez dans un divertissement sans limite : plus de 28 000 chaînes en direct and un catalogue riche of 200 000 films et séries du monde entier, le tout avec une stabilité 100 % garantie.",
      tag: "TV-EU", video: "https://res.cloudinary.com/ddskjurfk/video/upload/f_auto,q_auto/v1780506742/watching-together-family_kjtfsh.mp4",

    },
    {
      id: 3,
      h1: <>Laissez la magie opérer :<br/> l'expérience IPTV ultime.</>,
      p: "Voyagez à travers le monde avec notre selection exceptionnelle de chaînes internationales. Un univers de divertissement sans limite, pensé pour satisfaire toutes vos envies",
      tag: "TV-EU", video: "https://res.cloudinary.com/ddskjurfk/video/upload/f_auto,q_auto/v1780771731/Let_the_Magic_Happen__The_Ulti_chcc2z.mp4"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(() => console.log("Auto-play blocked"));
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div suppressHydrationWarning className="bg-[#050505] min-h-screen font-sans selection:bg-[#3B82F6] text-white overflow-x-hidden w-full relative">
      <div className="w-full">
      {/* 🎯 صغرنا الـ min-h ف التيليفون باش يتجمع الهيدر وما يهربوش النقط */}
        <header className="relative w-full overflow-hidden min-h-[580px] sm:min-h-[650px] md:min-h-[650px] lg:min-h-[700px] flex items-center bg-[#050505]">
          
          {/* أسهم التنقل للـ PC */}
          <div className="absolute inset-y-0 left-0 right-0 z-[80] pointer-events-none">
            {currentSlide > 0 && (
              <button onClick={prevSlide} className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 h-24 w-6 items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 hover:bg-[#3B82F6] pointer-events-auto cursor-pointer rounded-r-lg transition-all">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            {currentSlide < slides.length - 1 && (
              <button onClick={nextSlide} className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 h-24 w-6 items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 hover:bg-[#3B82F6] pointer-events-auto cursor-pointer rounded-l-lg transition-all">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
          </div>

          {/* محتوى السلايدر */}
          <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] w-full h-full pointer-events-none" style={{ transform: `translateX(-${currentSlide * 100}%)`, willChange: 'transform' }}>
            {slides.map((slide, index) => (
              <div 
                key={`${locale}-slide-${slide.id}-${slide.video}`}
                className="w-full flex-shrink-0 relative min-h-[580px] sm:min-h-[650px] md:min-h-[650px] lg:min-h-[700px] flex items-center px-4 md:px-24 pt-24 pb-20 md:py-0" // 🎯 نقصنا الـ pb وزدنا pt24 على قبل الـ Navbar
              >
                
                {/* الفيديو والـ Overlay */}
                <div className="absolute inset-0 -z-20 w-full h-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#050505]"></div>
<video 
  ref={(el) => { videoRefs.current[index] = el; }} 
  key={`vid-${locale}-${slide.id}-${slide.video}`} 
  loop 
  playsInline 
  autoPlay 
  
  // 🚀 الـسـحـر هـنـا: الـ Slide الأول كـيـاخـد auto أولا metadata بـاش يـطـيـر، ولـخـريـن كـايـتـشـارجـاو خـفـيـف ف الـ كـوالـيـس
  preload={index === 0 ? "auto" : "metadata"} 
  
  poster={slide.poster} 
  muted={isMuted} 
  className="w-full h-full object-cover opacity-40 md:opacity-50" 
>
  <source src={slide.video} type="video/mp4" />
</video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent md:bg-gradient-to-r md:from-[#050505] md:via-[#050505]/50 md:to-transparent"></div>
                </div>
                
                {/* المحتوى الداخلي - مجموع ف السنتر */}
                <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center text-center mx-auto pointer-events-auto px-2">
                  
                  {/* 🎯 صغرنا الكلمات شوية ف التيليفون باش ما تفرقش السطور بزاف */}
                  <h1 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black leading-[1.25] md:leading-[1.1] mb-3 tracking-tight uppercase max-w-[95%]">
                    {slide.h1}
                  </h1>
                  
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 mb-3 text-[11px] md:text-sm font-medium w-full">
                    <span className="text-yellow-400 font-bold text-sm whitespace-nowrap">⭐ 8.5</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="text-[#FFF] font-bold text-xs whitespace-nowrap">2026</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span className="text-[#FFF] font-bold text-xs whitespace-nowrap">
                      {locale === 'en' ? 'Free Update' : 'Mise a jour gratuite'}
                    </span>
                    <span className="bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded-md border border-[#3B82F6]/20 font-bold uppercase text-[8px] ml-1">
                      {slide.tag}
                    </span>
                  </div>
                  
                  {/* 🎯 صغرنا الـ mb هنا من 5 لـ 4 */}
                  <div className="max-w-xl mb-4 w-full px-2">
                    <p className="text-[#94A3B8] text-[11px] sm:text-sm md:text-base font-medium leading-relaxed line-clamp-3 md:line-clamp-none">
                      {slide.p}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 w-full">
                    <button 
                      onClick={() => window.open("https://wa.me/212600000000", "_blank")}
                      className="text-white px-5 py-3 rounded-xl font-black cursor-pointer shadow-xl active:scale-95 transition-all duration-500 hover:scale-105 bg-gradient-to-r from-[#3B82F6] via-[#1e3a8a] to-[#3B82F6] bg-[length:200%_auto] hover:bg-[position:right_center] uppercase text-[11px] tracking-wider"
                    >
                      {locale === 'en' ? 'Subscribe Now' : "S'abonner maintenant"}
                    </button>
                    
                    <button 
                      onClick={() => setIsMuted(prev => !prev)} 
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="p-2.5 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-[#3B82F6] transition-all active:scale-95 shadow-xl cursor-pointer"
                    >
                      <span className="text-base flex items-center justify-center h-4 w-4">
                        {isMuted ? "🔇" : "🔊"}
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* 🎯 حركنا النقط (Dots) طالعين بـ bottom-4 عوض bottom-6 باش يبانو مجموعين مع السلايدر */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[90] flex lg:hidden items-center gap-2 bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5 pointer-events-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === i ? "w-5 bg-[#3B82F6]" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </header>

        <nav id="accueil" />
        <section className="py-8 bg-[#050505] overflow-hidden">
          <div className="flex flex-col space-y-10">
            <div className="relative w-full">
              <DraggableSlider items={["Appel-tv.png", "europa league.png", "fire-tv.png", "Fox_Channel.png", "laliga.png", "premier-league.png", "uefa-womens.png"]} variant="logo" direction="right" />
            </div>
            <div className="text-center px-6">
              <p className="text-[#94A3B8] text-sm md:text-base max-w-4xl mx-auto leading-relaxed font-medium">
                {locale === 'en' 
                  ? "The latest movies and series up to date! Enjoy all your favorite Arabic, European, and American live content on your Smart TV, Android Box, PC, MAC, iPhone or Android device."
                  : "Les derniers films et séries à jour ! films et séries Vous pouvez profiter de tous les films arabes en langue européenne et américaine sur votre smart tv, Android Box, PC, MAC, Android, iPhone."
                }
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 px-6 text-center bg-[#050505]">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">{locale === 'en' ? <>Popular movies and series with <span className="text-[#3B82F6]">Powerful IPTV</span></> : <>Films et séries populaires avec <span className="text-[#3B82F6]">IPTV puissante</span></>}</h2>
          <p className="text-[#94A3B8] text-sm md:text-base font-medium max-w-3xl mx-auto">{locale === 'en' ? "Unlimited streaming of the latest movies, live series channels and variants with strongiptv." : "Diffusion illimitée des derniers films, chaînes séries et variantes de en direct avec strongiptv."}</p>
        </section>

        <section className="py-8 bg-[#050505] overflow-hidden mt-8">
          <div className="relative w-full">
            <DraggableSlider items={["https://media.themoviedb.org/t/p/w300_and_h450_face/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
               "https://media.themoviedb.org/t/p/w300_and_h450_face/8ehYxUh5MWE41AeE9gkHE8DKzvB.jpg",
                "https://media.themoviedb.org/t/p/w300_and_h450_face/eAjXAgdjPMZH9Ugub7XYPowFoS1.jpg",
                 "https://media.themoviedb.org/t/p/w300_and_h450_face/eZo31Dhl5BQ6GfbMNf3oU0tUvPZ.jpg",
                  "https://media.themoviedb.org/t/p/w300_and_h450_face/ov8vrRLZGoXHpYjSY9Vpv1tHJX7.jpg",
                   "https://media.themoviedb.org/t/p/w300_and_h450_face/dHxLBtHw4InwsVumnthupZYz6NM.jpg",
                   "https://media.themoviedb.org/t/p/w300_and_h450_face/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
                   "https://media.themoviedb.org/t/p/w300_and_h450_face/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg",
                    ]}
                     variant="poster" direction="left" />
          </div>
        </section>
          
        <MissionSection />    
        <UnifiedSection />
        <PricingSection />

        <section className="py-6 bg-[#050505] overflow-hidden">
          <div className="relative w-full">
            <DraggableSlider items={["netflix","Fubo-tv", "global-tv", "hulu", "pbs", "Vod","primevideo" ]} variant="clean-logo" direction="left" />
          </div>
        </section>

        <HowItWorksSection />
        <FaqSection />
        <FooterSection />

        {/* WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-[90] transform-gpu transition-all duration-300">
          <button
            onClick={() => window.open("https://wa.me/447723340014?text=Bonjour, je souhaite un test IPTV gratuit", "_blank")}
            className="flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.948 0c3.173.001 6.154 1.241 8.396 3.486 2.241 2.246 3.475 5.23 3.471 8.406-.013 6.545-5.352 11.893-11.901 11.893-2.008-.002-3.98-.511-5.73-1.479L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436 0 9.86-4.427 9.872-9.869.006-2.636-1.018-5.114-2.885-6.983A9.782 9.782 0 0 0 11.944 1.41C6.51 1.41 2.083 5.834 2.072 11.272c-.001 1.63.435 3.21 1.262 4.623l-.116.185-1.018 3.722 3.812-.999.191.113z"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}

const DynamicHomeContent = dynamic(() => Promise.resolve(HomeContent), { ssr: false });

export default function Page() {
  return <DynamicHomeContent />;
}