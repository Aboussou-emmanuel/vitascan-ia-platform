"use client";
import React, { useState, useRef } from 'react';
// Importations sécurisées des icônes
import {
    Activity, Shield, Clock, MousePointer2,
    BrainCircuit, Download, CheckCircle2
} from 'lucide-react';

// CORRECTION : Utilisation de chemins relatifs directs au lieu de l'alias @
import ChatBox from '../components/chat/chatbox';
import Results from '../components/dashboard/results';

export default function HealthPlatform() {
    const [showApp, setShowApp] = useState(false);
    // Utilisation d'un type plus précis ou 'any' pour éviter les erreurs de compilation
    const [analysis, setAnalysis] = useState<any>(null);
    const appRef = useRef<HTMLDivElement>(null);

    const startConsultation = () => {
        setShowApp(true);
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
                    Décrivez vos symptômes à notre IA et obtenez instantanément un bilan prédictif.
                </p>
                <button
                    onClick={startConsultation}
                    className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center gap-3"
                >
                    Lancer ma consultation <MousePointer2 size={20} />
                </button>
            </header>

            {/* --- SECTION SERVICES --- */}
            <section id="services" className="bg-white py-20 no-print border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Nos points forts</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <ServiceCard icon={<BrainCircuit className="text-blue-600" />} title="IA Prédictive" desc="Analyse avancée de vos symptômes." />
                        <ServiceCard icon={<Shield className="text-emerald-500" />} title="100% Privé" desc="Données non stockées." />
                        <ServiceCard icon={<Clock className="text-orange-500" />} title="24h/7" desc="Toujours disponible." />
                    </div>
                </div>
            </section>

            {/* --- APPLICATION SECTION --- */}
            <section ref={appRef} className={`py-20 transition-all duration-700 ${showApp ? 'opacity-100' : 'opacity-0'}`}>
                {showApp && (
                    <div className="max-w-4xl mx-auto px-6">
                        {!analysis ? (
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50">
                                <ChatBox onComplete={(data: any) => setAnalysis(data)} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-end no-print">
                                    <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                                        <Download size={18} /> Télécharger PDF
                                    </button>
                                </div>
                                <Results analysis={analysis} />
                            </div>
                        )}
                    </div>
                )}
            </section>

            <footer className="bg-slate-900 text-slate-500 py-12 text-center no-print">
                <p>© 2026 VitaScan IA</p>
            </footer>
        </div>
    );
}

// Composants internes pour la clarté
function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="mb-4">{icon}</div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-slate-500 text-sm">{desc}</p>
        </div>
    );
}