"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
    Activity, Shield, Clock, MousePointer2,
    BrainCircuit, Download, Star, Quote,
    Moon, Sun, History, ExternalLink, Trash2
} from 'lucide-react';

import ChatBox from '../components/chat/chatbox';
import Results from '../components/dashboard/results';

export default function HealthPlatform() {
    const [showApp, setShowApp] = useState(false);
    const [analysis, setAnalysis] = useState<any>(null);
    const [isDarkMode, setIsDarkMode] = useState(false); // Option: Dark Mode
    const [history, setHistory] = useState<any[]>([]); // Option: Historique
    const appRef = useRef<HTMLDivElement>(null);

    // Charger l'historique et le thème au démarrage
    useEffect(() => {
        const savedHistory = localStorage.getItem('vitascan_history');
        if (savedHistory) setHistory(JSON.parse(savedHistory));

        const savedTheme = localStorage.getItem('vitascan_theme');
        if (savedTheme === 'dark') setIsDarkMode(true);
    }, []);

    // Sauvegarder le thème
    useEffect(() => {
        localStorage.setItem('vitascan_theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const startConsultation = () => {
        setShowApp(true);
        setTimeout(() => {
            appRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleAnalysisComplete = (data: any) => {
        setAnalysis(data);
        const newEntry = { ...data, date: new Date().toLocaleDateString('fr-FR') };
        const newHistory = [newEntry, ...history].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem('vitascan_history', JSON.stringify(newHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('vitascan_history');
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
            {/* --- NAVBAR --- */}
            <nav className={`flex justify-between items-center px-8 py-6 max-w-7xl mx-auto no-print`}>
                <div className="flex items-center gap-2 font-black text-2xl text-blue-600">
                    <Activity size={32} />
                    <span>VitaScan IA</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-8 font-medium text-slate-500">
                        <a href="#services" className="hover:text-blue-600 transition">Services</a>
                        <a href="#avis" className="hover:text-blue-600 transition">Avis</a>
                    </div>
                    {/* Bouton Dark Mode */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-xl transition ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white shadow-sm text-slate-600'}`}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={startConsultation}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition"
                    >
                        {analysis ? "Mon Bilan" : "Démarrer"}
                    </button>
                </div>
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
                    <button
                        onClick={startConsultation}
                        className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center gap-3 mx-auto"
                    >
                        Lancer ma consultation <MousePointer2 size={20} />
                    </button>
                </div>
            </header>

            {/* --- SECTION HISTORIQUE (Option 1) --- */}
            {history.length > 0 && !showApp && (
                <section className="max-w-7xl mx-auto px-8 py-12 no-print">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <History size={20} /> Mes dernières analyses
                        </h2>
                        <button onClick={clearHistory} className="text-red-500 text-sm flex items-center gap-1 hover:underline">
                            <Trash2 size={14} /> Effacer
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {history.map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                                <p className="text-xs text-blue-500 font-bold mb-1">{item.date}</p>
                                <p className="text-sm font-medium truncate">{item.summary || "Analyse de santé"}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- APPLICATION SECTION --- */}
            <section ref={appRef} className={`py-20 transition-all duration-700 ${showApp ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                {showApp && (
                    <div className="max-w-4xl mx-auto px-6">
                        {!analysis ? (
                            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} p-8 rounded-[2.5rem] shadow-2xl border border-blue-50`}>
                                <ChatBox onComplete={handleAnalysisComplete} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center no-print">
                                    <button onClick={() => setAnalysis(null)} className="text-blue-600 font-bold">← Nouvelle analyse</button>
                                    <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                                        <Download size={18} /> Télécharger PDF
                                    </button>
                                </div>

                                <Results analysis={analysis} />

                                {/* Option 2: Lien Rendez-vous */}
                                <div className={`mt-8 p-8 rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-blue-100 bg-blue-50/50'} text-center`}>
                                    <h3 className="text-xl font-bold mb-2">Besoin d'un avis médical approfondi ?</h3>
                                    <p className={`mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Consultez un spécialiste près de chez vous en quelques clics.</p>
                                    <a
                                        href="https://www.doctolib.fr"
                                        target="_blank"
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition"
                                    >
                                        Prendre rendez-vous <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <section id="services" className={`py-20 no-print border-y ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Nos services</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <ServiceCard isDark={isDarkMode} icon={<BrainCircuit className="text-blue-600" />} title="IA Prédictive" desc="Analyse avancée de vos symptômes." />
                        <ServiceCard isDark={isDarkMode} icon={<Shield className="text-emerald-500" />} title="100% Privé" desc="Données stockées localement." />
                        <ServiceCard isDark={isDarkMode} icon={<Clock className="text-orange-500" />} title="Historique" desc="Gardez une trace de vos bilans." />
                    </div>
                </div>
            </section>

            <footer className="py-12 text-center text-slate-500 text-sm">
                <p>© 2026 VitaScan IA • Santé & Technologie</p>
            </footer>
        </div>
    );
}

function ServiceCard({ icon, title, desc, isDark }: { icon: React.ReactNode, title: string, desc: string, isDark: boolean }) {
    return (
        <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <div className="mb-4">{icon}</div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-slate-500 text-sm">{desc}</p>
        </div>
    );
}