"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TermsOfUse() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'fr';

  const content = locale === 'en' ? {
    title: "Terms of Use", back: "Back to Home", updated: "Last updated: May 2026",
    intro: "By accessing and using B-SMART TV services, you agree to comply with and be bound by the following terms and conditions.",
    s1_title: "1. Subscription and Usage", s1_desc: "Your IPTV subscription is strictly for personal and non-commercial use. Sharing your account details with unauthorized users may lead to immediate suspension without refund, based on your plan limits (1, 2, or 3 accounts).",
    s2_title: "2. Internet Speed & Quality", s2_desc: "A stable internet speed of at least 15 Mbps is recommended for HD/FHD streaming and 30 Mbps for 4K. B-SMART TV is not responsible for buffering caused by your local Internet Service Provider (ISP) limitations.",
    s3_title: "3. Service Changes", s3_desc: "Our channel playlists and VOD library are updated weekly to give you the latest content. B-SMART TV reserves the right to modify or replace specific channels to maintain server stability."
  } : {
    title: "Conditions d'Utilisation", back: "Retour à l'accueil", updated: "Dernière mise à jour : Mai 2026",
    intro: "En accédant et en utilisant les services de B-SMART TV, vous acceptez de vous conformer aux termes et conditions suivants.",
    s1_title: "1. Abonnement et Utilisation", s1_desc: "Votre abonnement IPTV est strictement réservé à un usage personnel et non commercial. Le partage des détails de votre compte avec des utilisateurs non autorisés peut entraîner une suspension immédiate sans remboursement, selon les limites de votre forfait (1, 2 ou 3 comptes).",
    s2_title: "2. Vitesse Internet et Qualité", s2_desc: "Une vitesse Internet stable d'au moins 15 Mbps est recommandée pour le streaming HD/FHD et de 30 Mbps pour la 4K. B-SMART TV n'est pas responsable des coupures causées par les limitations de votre fournisseur d'accès Internet (FAI).",
    s3_title: "3. Modifications du Service", s3_desc: "Nos listes de chaînes et notre bibliothèque VOD sont mises à jour chaque semaine pour vous offrir les derniers contenus. B-SMART TV se réserve le droit de modifier ou de remplacer certaines chaînes pour maintenir la stabilité du serveur."
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.push(`/${locale}`)} className="text-[#3B82F6] hover:underline font-bold text-sm mb-8 flex items-center gap-2 cursor-pointer">← {content.back}</button>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">{content.title}</h1>
        <p className="text-[#94A3B8] text-xs font-bold mb-8 uppercase tracking-wider">{content.updated}</p>
        <div className="h-[1px] w-full bg-white/10 mb-8" />
        <div className="space-y-8 text-[#94A3B8] text-sm md:text-base leading-relaxed font-medium">
          <p className="text-white text-base md:text-lg">{content.intro}</p>
          <div><h2 className="text-white text-xl font-bold mb-3">{content.s1_title}</h2><p>{content.s1_desc}</p></div>
          <div><h2 className="text-white text-xl font-bold mb-3">{content.s2_title}</h2><p>{content.s2_desc}</p></div>
          <div><h2 className="text-white text-xl font-bold mb-3">{content.s3_title}</h2><p>{content.s3_desc}</p></div>
        </div>
      </div>
    </div>
  );
}