"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function PaymentMethods() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || 'fr';

  const content = locale === 'en' ? {
    title: "Payment Information",
    back: "Back to Home",
    updated: "Last updated: May 2026",
    intro: "We offer secure and flexible payment options to ensure a smooth subscription process for our international customers.",
    s1_title: "1. Accepted Payment Methods",
    s1_desc: "We accept all major credit/debit cards including Visa, MasterCard, Discover, and secure payments via PayPal. Crypto payments (USDT/Bitcoin) can also be arranged upon request through our support.",
    s2_title: "2. Secure Transactions",
    s2_desc: "All payments are processed through encrypted, secure gateways. B-SMART TV does not store or have access to your private credit card information.",
    s3_title: "3. Order Activation Process",
    s3_desc: "Once your payment is confirmed, your IPTV account credentials will be generated and delivered to your email and WhatsApp within 15 to 30 minutes."
  } : {
    title: "Informations de Paiement",
    back: "Retour à l'accueil",
    updated: "Dernière mise à jour : Mai 2026",
    intro: "Nous proposons des options de paiement sécurisées et flexibles pour garantir un processus d'abonnement fluide à nos clients internationaux.",
    s1_title: "1. Moyens de Paiement Acceptés",
    s1_desc: "Nous acceptons toutes les principales cartes de crédit/débit, notamment Visa, MasterCard, Discover, ainsi que les paiements sécurisés via PayPal. Les paiements en Crypto (USDT/Bitcoin) peuvent également être organisés sur demande via notre support.",
    s2_title: "2. Transactions Sécurisées",
    s2_desc: "Tous les paiements sont traités via des passerelles cryptées et sécurisées. B-SMART TV ne stocke pas et n'a pas accès à vos informations bancaires privées.",
    s3_title: "3. Processus d'Activation de la Commande",
    s3_desc: "Une fois votre paiement confirmé, les identifiants de votre compte IPTV seront générés et envoyés sur votre e-mail et votre WhatsApp dans un délai de 15 à 30 minutes."
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.push(`/${locale}`)}
          className="text-[#3B82F6] hover:underline font-bold text-sm mb-8 flex items-center gap-2 cursor-pointer"
        >
          ← {content.back}
        </button>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">{content.title}</h1>
        <p className="text-[#94A3B8] text-xs font-bold mb-8 uppercase tracking-wider">{content.updated}</p>
        <div className="h-[1px] w-full bg-white/10 mb-8" />
        
        <div className="space-y-8 text-[#94A3B8] text-sm md:text-base leading-relaxed font-medium">
          <p className="text-white text-base md:text-lg">{content.intro}</p>
          
          <div>
            <h2 className="text-white text-xl font-bold mb-3">{content.s1_title}</h2>
            <p className="mb-4">{content.s1_desc}</p>
            {/* لوغويات الدفع وسط الصفحة للزينة والجمالية */}
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 w-fit">
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
          
          <div>
            <h2 className="text-white text-xl font-bold mb-3">{content.s2_title}</h2>
            <p>{content.s2_desc}</p>
          </div>
          
          <div>
            <h2 className="text-white text-xl font-bold mb-3">{content.s3_title}</h2>
            <p>{content.s3_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}