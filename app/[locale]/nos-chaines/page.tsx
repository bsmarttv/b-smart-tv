"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function NosChaines() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'fr';

  const content = locale === 'en' ? {
    title: "Our Channels & VOD",
    back: "Back to Home",
    desc: "Discover our premium selection of over 20,000 live TV channels and 60,000+ Movies and Series updated weekly in 4K/FHD quality.",
    cat1: "International Live TV",
    cat1_desc: "Sports, News, Entertainment, and Cinema from Belgium, France, UK, Netherlands, Germany, USA, Arabic countries, and more.",
    cat2: "Premium Sports Leagues",
    cat2_desc: "Watch UEFA Champions League, Premier League, LaLiga, Serie A, and major PPV events with stable anti-freeze servers.",
    cat3: "Video On Demand (VOD)",
    cat3_desc: "The latest movies and box office hits, plus complete series from Netflix, Amazon Prime, Disney+, and HBO with multi-language subtitles."
  } : {
    title: "Nos Chaînes & VOD",
    back: "Retour à l'accueil",
    desc: "Découvrez notre sélection premium de plus de 20 000 chaînes de télévision en direct et plus de 60 000 films et séries mis à jour chaque semaine en qualité 4K/FHD.",
    cat1: "TV en Direct Internationale",
    cat1_desc: "Sports, Actualités, Divertissement et Cinéma depuis la Belgique, la France, le Royaume-Uni, les Pays-Bas, l'Allemagne, les États-Unis, les pays arabes, etc.",
    cat2: "Ligues de Sport Premium",
    cat2_desc: "Regardez la UEFA Champions League, la Premier League, la LaLiga, la Serie A et les grands événements PPV avec des serveurs anti-coupure stables.",
    cat3: "Vidéo à la Demande (VOD)",
    cat3_desc: "Les derniers films et succès du box-office, ainsi que des séries complètes de Netflix, Amazon Prime, Disney+ et HBO avec sous-titres multilingues."
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.push(`/${locale}`)} className="text-[#3B82F6] hover:underline font-bold text-sm mb-8 flex items-center gap-2 cursor-pointer">← {content.back}</button>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">{content.title}</h1>
        <p className="text-[#94A3B8] text-base mb-12 max-w-2xl">{content.desc}</p>
        <div className="h-[1px] w-full bg-white/10 mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
            <div className="text-2xl mb-4">📺</div>
            <h3 className="text-white text-lg font-bold mb-2">{content.cat1}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">{content.cat1_desc}</p>
          </div>
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
            <div className="text-2xl mb-4">⚽</div>
            <h3 className="text-white text-lg font-bold mb-2">{content.cat2}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">{content.cat2_desc}</p>
          </div>
          <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
            <div className="text-2xl mb-4">🎬</div>
            <h3 className="text-white text-lg font-bold mb-2">{content.cat3}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">{content.cat3_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}