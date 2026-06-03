"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function Installation() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'fr';

  const content = locale === 'en' ? {
    title: "Installation Guide",
    back: "Back to Home",
    intro: "Setting up your IPTV subscription is simple. Follow the instructions below depending on your device.",
    d1: "Smart TV (Samsung, LG, Philips...)",
    d1_step: "Download applications like 'IBO Player', 'SET IPTV', or 'Net IPTV' from your TV store. Send us your MAC Address, and we will activate the playlist for you instantly.",
    d2: "Android / Firestick Devices",
    d2_step: "Install 'IPTV Smarters Pro' or 'XCIPTV'. Log in using the Xtream Codes API (Username, Password, and Server URL) sent to your email/WhatsApp.",
    d3: "MAG Boxes",
    d3_step: "Send us your MAC Address (starts with 00:1A:79:...). Add our Server Portal URL into your MAG inner portal settings as instructed by our support."
  } : {
    title: "Guide d'Installation",
    back: "Retour à l'accueil",
    intro: "La configuration de votre abonnement IPTV est simple. Suivez les instructions ci-dessous en fonction de votre appareil.",
    d1: "Smart TV (Samsung, LG, Philips...)",
    d1_step: "Téléchargez des applications comme 'IBO Player', 'SET IPTV' ou 'Net IPTV' depuis le store de votre TV. Envoyez-nous votre adresse MAC, et nous activerons la playlist pour vous instantanément.",
    d2: "Appareils Android / Firestick",
    d2_step: "Installez 'IPTV Smarters Pro' ou 'XCIPTV'. Connectez-vous en utilisant l'API Xtream Codes (Nom d'utilisateur, Mot de passe et URL du serveur) envoyée sur votre e-mail/WhatsApp.",
    d3: "Boîtiers MAG",
    d3_step: "Envoyez-nous votre adresse MAC (commence par 00:1A:79:...). Ajoutez l'URL de notre portail de serveur dans les paramètres de votre boîtier MAG comme indiqué par notre support."
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.push(`/${locale}`)} className="text-[#3B82F6] hover:underline font-bold text-sm mb-8 flex items-center gap-2 cursor-pointer">← {content.back}</button>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">{content.title}</h1>
        <p className="text-[#94A3B8] text-base mb-10">{content.intro}</p>
        <div className="h-[1px] w-full bg-white/10 mb-10" />
        
        <div className="space-y-8">
          <div className="border-l-2 border-[#3B82F6] pl-4">
            <h3 className="text-white font-bold text-lg mb-2">📺 {content.d1}</h3>
            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed font-medium">{content.d1_step}</p>
          </div>
          <div className="border-l-2 border-[#3B82F6] pl-4">
            <h3 className="text-white font-bold text-lg mb-2">🔥 {content.d2}</h3>
            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed font-medium">{content.d2_step}</p>
          </div>
          <div className="border-l-2 border-[#3B82F6] pl-4">
            <h3 className="text-white font-bold text-lg mb-2">📟 {content.d3}</h3>
            <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed font-medium">{content.d3_step}</p>
          </div>
        </div>
      </div>
    </div>
  );
}