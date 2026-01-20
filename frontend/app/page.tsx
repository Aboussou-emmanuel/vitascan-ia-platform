"use client";
import React, { useState, useRef } from 'react';
// Importations sécurisées des icônes
import {
    Activity, Shield, Clock, MousePointer2,
    BrainCircuit, Download, CheckCircle2,
    Stethoscope, ClipboardCheck
} from 'lucide-react';
import ChatBox from '@/components/chat/chatbox';
import Results from '@/components/dashboard/results';

export default function HealthPlatform() {
    const [showApp, setShowApp] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);
    const appRef = useRef<HTMLDivElement>(null);

    const startConsultation = () => {
        setShowApp(true);
        // Petit délai pour laisser le DOM se mettre à jour avant le scroll
        setTimeout(() => {
            appRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* --- NAVBAR --- */}
            <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto no-print">
                <div className="flex items-center gap-2 font-black text-2xl text-blue-600">
                    <Activity size={32} />
                    <span>VitaScan IA</span>
                </div>
                <div className="hidden md:flex gap-8 font-medium text-slate-600">
                    <a href="#services" className="hover:text-blue-600 transition">Services</a>
                    <a href="#methode" className="hover:text-blue-600 transition">Méthode</a>
                </div>
                <button
                    onClick={startConsultation}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition"
                >
                    {analysis ? "Mon Bilan" : "Démarrer"}
                </button>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="max-w-7xl mx-auto px-8 py-16 flex flex-col items-center text-center no-print">
                <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
                    IA Médicale Llama 3.3
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                    Votre santé, <br />
                    <span className="text-blue-600">analysée en direct.</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed">
                    Décrivez vos symptômes à notre IA et obtenez instantanément un bilan prédictif
                    pour vous aider à prendre les meilleures décisions pour votre santé.
                </p>
                <div className="flex flex-col sm:row gap-4">
                    <button
                        onClick={startConsultation}
                        className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center gap-3"
                    >
                        Lancer ma consultation <MousePointer2 size={20} />
                    </button>
                </div>
            </header>

            {/* --- SECTION SERVICES --- */}
            <section id="services" className="bg-white py-20 no-print border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Nos points forts</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <BrainCircuit className="text-blue-600 mb-4" size={32} />
                            <h3 className="font-bold text-xl mb-2">IA Prédictive</h3>
                            <p className="text-slate-500 text-sm">Analyse avancée de vos symptômes en temps réel.</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <Shield className="text-emerald-500 mb-4" size={32} />
                            <h3 className="font-bold text-xl mb-2">100% Privé</h3>
                            <p className="text-slate-500 text-sm">Aucune donnée personnelle n'est stockée sur nos serveurs.</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <Clock className="text-orange-500 mb-4" size={32} />
                            <h3 className="font-bold text-xl mb-2">Réponse 24h/7</h3>
                            <p className="text-slate-500 text-sm">Un assistant toujours disponible pour vous répondre.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- COMMENT ÇA MARCHE --- */}
            <section id="methode" className="py-20 no-print">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-3xl font-black text-center mb-16">Comment ça marche ?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Step number="1" title="Discutez" desc="Expliquez vos symptômes à l'IA." />
                        <Step number="2" title="Analyse" desc="L'IA croise les données médicales." />
                        <Step number="3" title="Bilan" desc="Recevez votre rapport complet." />
                    </div>
                </div>
            </section>

            {/* --- APPLICATION SECTION --- */}
            <section ref={appRef} className={`py-20 transition-all duration-700 ${showApp ? 'opacity-100' : 'opacity-0'}`}>
                {showApp && (
                    <div className="max-w-4xl mx-auto px-6">
                        {!analysis ? (
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50">
                                <div className="flex items-center gap-2 mb-6 text-blue-600 font-bold">
                                    <CheckCircle2 size={20} /> Session sécurisée
                                </div>
                                <ChatBox onComplete={(data) => setAnalysis(data)} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-end no-print">
                                    <button
                                        onClick={() => window.print()}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                                    >
                                        <Download size={18} /> Télécharger PDF
                                    </button>
                                </div>
                                <Results analysis={analysis} />
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-900 text-slate-500 py-12 px-8 text-center no-print">
                <p className="text-sm">© 2026 VitaScan IA - Usage informatif uniquement.</p>
            </footer>
        </div>
    );
}

// Sous-composant pour les étapes
function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 shadow-lg">
                {number}
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-slate-500 text-sm">{desc}</p>
        </div>
    );
}