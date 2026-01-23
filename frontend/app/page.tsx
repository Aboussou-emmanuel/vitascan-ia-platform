"use client";
import React, { useState, useRef } from 'react';
import {
    Activity, Shield, Clock, MousePointer2,
    BrainCircuit, Download, Star, Quote
} from 'lucide-react';

import ChatBox from '../components/chat/chatbox';
import Results from '../components/dashboard/results';

export default function HealthPlatform() {
    const [showApp, setShowApp] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);
    const appRef = useRef<HTMLDivElement>(null);

    // Fonction simplifiée : On lance la consultation directement
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
                    <a href="#avis" className="hover:text-blue-600 transition">Avis</a>
                </div>
                <button
                    onClick={startConsultation}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition"
                >
                    {analysis ? "Mon Bilan" : "Démarrer"}
                </button>
            </nav>

            {/* --- HERO SECTION --- */}
            <header
                className="relative w-full max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col items-center text-center no-print bg-cover bg-center rounded-[3rem] overflow-hidden shadow-2xl"
                style={{ backgroundImage: "url('/images/img6.jpg')" }}
            >
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"></div>

                <div className="relative z-10">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black mb-6 uppercase tracking-widest inline-block">
                        IA Médicale Llama 3.3
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
                        Votre santé, <br />
                        <span className="text-blue-400">analysée en direct.</span>
                    </h1>
                    <p className="text-lg text-slate-100 max-w-2xl mb-10 leading-relaxed font-medium">
                        Décrivez vos symptômes à notre IA et obtenez instantanément un bilan prédictif fiable et privé.
                    </p>
                    <button
                        onClick={startConsultation}
                        className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center gap-3 mx-auto"
                    >
                        Lancer ma consultation <MousePointer2 size={20} />
                    </button>
                </div>
            </header>

            {/* --- SECTION SERVICES --- */}
            <section id="services" className="bg-white py-20 no-print border-y border-slate-100 mt-20">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Nos points forts</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <ServiceCard icon={<BrainCircuit className="text-blue-600" />} title="IA Prédictive" desc="Analyse avancée de vos symptômes." />
                        <ServiceCard icon={<Shield className="text-emerald-500" />} title="100% Privé" desc="Données non stockées." />
                        <ServiceCard icon={<Clock className="text-orange-500" />} title="24h/7" desc="Toujours disponible." />
                    </div>
                </div>
            </section>

            {/* --- SECTION MÉTHODE --- */}
            <section id="methode" className="py-20 bg-slate-50 no-print">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-3xl font-black mb-12 text-center">Notre Méthode</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <Step number="01" title="Symptômes" desc="Décrivez précisément vos ressentis." />
                        <Step number="02" title="Analyse IA" desc="Traitement par Llama 3.3." />
                        <Step number="03" title="Validation" desc="Protocoles médicaux croisés." />
                        <Step number="04" title="Bilan" desc="Rapport détaillé généré." />
                    </div>
                </div>
            </section>

            {/* --- SECTION AVIS --- */}
            <section id="avis" className="bg-white py-20 no-print">
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Avis de nos utilisateurs</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <TestimonialCard name="Dr. Marc L." role="Généraliste" text="Un excellent outil de pré-diagnostic qui aide les patients à mieux formuler leurs symptômes." />
                        <TestimonialCard name="Sarah J." role="Utilisatrice" text="Très rapide et rassurant. Le bilan PDF est complet et facile à partager avec mon médecin." />
                        <TestimonialCard name="Thomas B." role="Utilisateur" text="L'IA est impressionnante de précision. On se sent vraiment écouté et guidé." />
                    </div>
                </div>
            </section>

            {/* --- APPLICATION SECTION (Débloquée directement) --- */}
            <section ref={appRef} className={`py-20 transition-all duration-700 ${showApp ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                {showApp && (
                    <div className="max-w-4xl mx-auto px-6">
                        {!analysis ? (
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50">
                                <ChatBox onComplete={(data: any) => setAnalysis(data)} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-end no-print">
                                    <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
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

// --- COMPOSANTS DE SOUTIEN ---
function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div className="mb-4">{icon}</div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-slate-500 text-sm">{desc}</p>
        </div>
    );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="relative p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-4xl font-black text-blue-100 absolute top-4 right-4">{number}</span>
            <h3 className="font-bold text-lg mb-2 relative z-10">{title}</h3>
            <p className="text-slate-500 text-sm relative z-10">{desc}</p>
        </div>
    );
}

function TestimonialCard({ name, role, text }: { name: string, role: string, text: string }) {
    return (
        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative shadow-sm">
            <Quote className="text-blue-200 absolute top-6 right-6" size={30} />
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-orange-400 text-orange-400" />)}
            </div>
            <p className="text-slate-600 italic mb-6">"{text}"</p>
            <div>
                <h4 className="font-bold text-slate-900">{name}</h4>
                <p className="text-blue-600 text-xs font-medium uppercase tracking-wider">{role}</p>
            </div>
        </div>
    );
}