"use client";
import React from 'react';
import { useParams } from 'next/navigation';

export default function Revendeur() {
  const params = useParams();
  const locale = params?.locale || 'fr';

  const content = locale === 'en' ? {
    back: "← Back to Home",
    title: "Become an IPTV Reseller",
    desc: "Start your own profitable IPTV business today. Get access to our high-quality management panel, generate subscriptions easily, and maximize your revenue with 24/7 expert support.",
    benefit_title: "Why Partner With Us?",
    b1: "Advanced IPTV Panel (Manage users easily)",
    b2: "High Profit Margin (Buy credits cheap, sell high)",
    b3: "100% Stable Servers with Anti-Freeze Technology",
    cta: "Contact Us on WhatsApp to Get Started"
  } : {
    back: "← Retour à l'accueil",
    title: "Devenir Revendeur IPTV",
    desc: "Lancez votre propre entreprise IPTV rentable dès aujourd'hui. Accédez à notre panneau de gestion de haute qualité, générez des abonnements facilement et maximisez vos revenus avec un support d'experts 24/7.",
    benefit_title: "Pourquoi Devenir Partenaire ?",
    b1: "Panneau IPTV Avancé (Gérez les utilisateurs facilement)",
    b2: "Marge Bénéficiaire Élevée (Achetez des crédits pas chers, vendez cher)",
    b3: "Serveurs 100% Stables avec Technologie Anti-Coupure",
    cta: "Contactez-nous sur WhatsApp pour Commencer"
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex items-center justify-start px-6 md:px-20 py-20">
      {/* 🎯 ردّينا المحاذاة لليسر text-left وطيرنا السنتر */}
      <div className="max-w-3xl mx-auto w-full text-left">
        
        {/* 🎯 بوطون العودة: دابا جا لاصق على اليسار فوق العنوان نيشااان بالستايل الأزرق والـ Underline */}
        <div className="mb-6">
          <a 
            href={`/${locale}`} 
            className="text-[#3B82F6] hover:underline font-bold text-sm md:text-base transition duration-300"
          >
            {content.back}
          </a>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
          {content.title}
        </h1>
        <p className="text-[#94A3B8] text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
          {content.desc}
        </p>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left max-w-xl mb-10">
          <h3 className="text-white font-bold text-lg mb-4">{content.benefit_title}</h3>
          <ul className="space-y-3 text-sm text-[#94A3B8]">
            <li className="flex items-center gap-2 text-white/90">⚡ {content.b1}</li>
            <li className="flex items-center gap-2 text-white/90">💰 {content.b2}</li>
            <li className="flex items-center gap-2 text-white/90">🛡️ {content.b3}</li>
          </ul>
        </div>

        <a 
          href="https://wa.me/YOUR_PHONE_NUMBER" /* غاتحط هنا رابط الواتساب بالنمرة ديالك */
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-sm md:text-base px-8 py-4 rounded-xl transition-all cursor-pointer transform hover:scale-105 shadow-lg shadow-blue-500/10"
        >
          {content.cta}
        </a>
      </div>
    </div>
  );
}