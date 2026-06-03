"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'fr';

  const content = locale === 'en' ? {
    title: "Privacy Policy", back: "Back to Home", updated: "Last updated: May 2026",
    intro: "At B-SMART TV, we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and safeguarded.",
    s1_title: "1. Information We Collect", s1_desc: "We collect information you provide directly to us when ordering, such as your name, email address, phone number (WhatsApp), and billing information.",
    s2_title: "2. How We Use Your Information", s2_desc: "We use the collected data to process your IPTV subscription, deliver your account details, provide 24/7 technical support, and send updates regarding your service.",
    s3_title: "3. Data Security", s3_desc: "We implement advanced anti-freeze and secure encryption technologies to protect your data. Your personal information is never sold, traded, or shared with third parties."
  } : {
    title: "Politique de Confidentialité", back: "Retour à l'accueil", updated: "Dernière mise à jour : Mai 2026",
    intro: "Chez B-SMART TV, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment vos informations personnelles sont collectées, utilisées et protégées.",
    s1_title: "1. Informations que nous collectons", s1_desc: "Nous collectons les informations que vous nous fournissez directement lors de la commande, telles que votre nom, adresse e-mail, numéro de téléphone (WhatsApp) et informations de facturation.",
    s2_title: "2. Comment nous utilisons vos informations", s2_desc: "Nous utilisons les données collectées pour traiter votre abonnement IPTV, vous fournir les détails de votre compte, assurer le support technique 24/7 et vous envoyer des mises à jour sur votre service.",
    s3_title: "3. Sécurité des données", s3_desc: "Nous mettons en œuvre des technologies de cryptage sécurisées pour protéger vos données. Vos informations personnelles ne sont jamais vendues, échangées ou partagées avec des tiers."
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