"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function RefundPolicy() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'fr';

  const content = locale === 'en' ? {
    title: "Refund Policy", back: "Back to Home", updated: "Last updated: May 2026",
    intro: "We stand behind our IPTV service quality. That is why we offer a 100% transparent 7-day money-back guarantee.",
    s1_title: "1. 7-Day Money-Back Guarantee", s1_desc: "If you are not fully satisfied with your B-SMART TV subscription, you have the right to request a full refund within 7 days of your initial purchase.",
    s2_title: "2. How to Request a Refund", s2_desc: "To process your refund, simply contact our expert team via WhatsApp or email with your account details. No questions asked, refunds are processed within 24 to 48 hours.",
    s3_title: "3. After 7 Days", s3_desc: "Any refund requests submitted after the 7-day period will not be eligible for a full refund. However, our 24/7 support will work with you to fix any technical issues immediately."
  } : {
    title: "Politique de Remboursement", back: "Retour à l'accueil", updated: "Dernière mise à jour : Mai 2026",
    intro: "Nous croyons en la qualité de notre service IPTV. C'est pourquoi nous offrons une garantie de remboursement de 7 jours 100% transparente.",
    s1_title: "1. Garantie de Remboursement de 7 Jours", s1_desc: "Si vous n'êtes pas entièrement satisfait de votre abonnement B-SMART TV, vous avez le droit de demander un remboursement complet dans les 7 jours suivant votre achat initial.",
    s2_title: "2. Comment Demander un Remboursement", s2_desc: "Pour traiter votre remboursement, contactez simplement notre équipe d'experts via WhatsApp ou e-mail avec les détails de votre compte. Aucun justificatif n'est demandé, les remboursements sont traités sous 24 à 48 heures.",
    s3_title: "3. Après 7 Jours", s3_desc: "Toute demande de remboursement soumise après la période de 7 jours ne sera pas éligible. Cependant, notre support 24/7 travaillera avec vous pour résoudre immédiatement tout problème technique."
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