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
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const appRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedHistory = localStorage.getItem('vitascan_history');
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        const savedTheme = localStorage.getItem('vitascan_theme');
        if (savedTheme === 'dark') setIsDarkMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('vitascan_theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const startConsultation = () => {
        setShowApp(true);
        setAnalysis(null); // Reset pour une nouvelle analyse
        setTimeout(() => {
            appRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Nouvelle fonction pour charger une ancienne analyse depuis l'historique
    const loadHistoryItem = (item: any) => {
        setAnalysis(item);
        setShowApp(true);
        setTimeout(() => {
            appRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleAnalysisComplete = (data: any) => {
        const newEntry = { ...data, date: new Date().toLocaleDateString('fr-FR') };
        setAnalysis(newEntry);
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
            {/* NAV */}
            <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto no-print">
                <div className="flex items-center gap-2 font-black text-2xl text-blue-600">
                    <Activity size={32} />
                    <span>VitaScan IA</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className={`hidden md:flex gap-8 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <a href="#services" className="hover:text-blue-600 transition">Services</a>
                        <a href="#methode" className="hover:text-blue-600 transition">Méthode</a>
                        <a href="#avis" className="hover:text-blue-600 transition">Avis</a>
                    </div>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-xl ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white shadow-sm text-slate-600'}`}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={startConsultation} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition">
                        Démarrer
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <header className="relative w-full max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col items-center text-center rounded-[3rem] overflow-hidden shadow-2xl" style={{ backgroundImage: "url('/images/img6.jpg')", backgroundSize: 'cover' }}>
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">Votre santé, <br /><span className="text-blue-400">analysée en direct.</span></h1>
                    <button onClick={startConsultation} className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-2xl flex items-center gap-3 mx-auto">
                        Lancer ma consultation <MousePointer2 size={20} />
                    </button>
                </div>
            </header>

            {/* HISTORIQUE INTERACTIF */}
            {history.length > 0 && !showApp && (
                <section className="max-w-7xl mx-auto px-8 py-12 no-print">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2"><History size={20} /> Dernières analyses</h2>
                        <button onClick={clearHistory} className="text-red-500 text-xs flex items-center gap-1 hover:underline">
                            <Trash2 size={14} /> Effacer l'historique
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {history.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => loadHistoryItem(item)}
                                className={`group text-left p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:border-blue-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}
                            >
                                <p className="text-xs text-blue-500 font-bold mb-1">{item.date}</p>
                                <p className="text-sm font-medium truncate">{item.summary || "Bilan de santé enregistré"}</p>
                                <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Cliquer pour ouvrir <ExternalLink size={10} />
                                </p>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* SERVICES */}
            <section id="services" className={`py-20 border-y ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Nos services</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <ServiceCard isDark={isDarkMode} icon={<BrainCircuit className="text-blue-600" />} title="IA Prédictive" desc="Analyse avancée de vos symptômes." />
                        <ServiceCard isDark={isDarkMode} icon={<Shield className="text-emerald-500" />} title="100% Privé" desc="Données stockées localement." />
                        <ServiceCard isDark={isDarkMode} icon={<Clock className="text-orange-500" />} title="Historique" desc="Gardez une trace de vos bilans." />
                    </div>
                </div>
            </section>

            {/* METHODE */}
            <section id="methode" className="py-20 no-print">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-3xl font-black mb-12 text-center">Notre Méthode</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <Step number="01" title="Symptômes" desc="Décrivez vos ressentis." isDark={isDarkMode} />
                        <Step number="02" title="Analyse" desc="Traitement Llama 3.3." isDark={isDarkMode} />
                        <Step number="03" title="Validation" desc="Protocoles croisés." isDark={isDarkMode} />
                        <Step number="04" title="Bilan" desc="Rapport détaillé." isDark={isDarkMode} />
                    </div>
                </div>
            </section>

            {/* AVIS */}
            <section id="avis" className={`py-20 ${isDarkMode ? 'bg-slate-800/30' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-black mb-12">Avis utilisateurs</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <TestimonialCard name="Dr. Marc L." role="Généraliste" isDark={isDarkMode} text="Un outil précieux pour le pré-diagnostic." />
                        <TestimonialCard name="Sarah J." role="Utilisatrice" isDark={isDarkMode} text="Rapide, clair et très rassurant." />
                        <TestimonialCard name="Thomas B." role="Utilisateur" isDark={isDarkMode} text="Le bilan PDF est impressionnant." />
                    </div>
                </div>
            </section>

            {/* APP SECTION */}
            <section ref={appRef} className={`py-20 ${showApp ? 'block' : 'hidden'}`}>
                <div className="max-w-4xl mx-auto px-6">
                    <button
                        onClick={() => setShowApp(false)}
                        className="mb-6 text-blue-600 font-bold flex items-center gap-2 hover:underline"
                    >
                        ← Retour à l'accueil
                    </button>

                    {!analysis ? (
                        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-blue-50'} p-8 rounded-[2.5rem] shadow-2xl border`}>
                            <ChatBox onComplete={handleAnalysisComplete} />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <Results analysis={analysis} />
                            <div className={`p-8 rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'border-slate-700 bg-slate-800/50' : 'border-blue-100 bg-blue-50/50'} text-center`}>
                                <h3 className="text-xl font-bold mb-4">Besoin d'un avis médical ?</h3>
                                <a href="https://www.doctolib.fr" target="_blank" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition">
                                    Prendre RDV sur Doctolib <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

// Composants réutilisables (ServiceCard, Step, TestimonialCard restent identiques)
function ServiceCard({ icon, title, desc, isDark }: any) {
    return (
        <div className={`p-8 rounded-[2rem] border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <div className="mb-4">{icon}</div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-slate-500 text-sm">{desc}</p>
        </div>
    );
}

function Step({ number, title, desc, isDark }: any) {
    return (
        <div className={`relative p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <span className="text-4xl font-black text-blue-500/20 absolute top-4 right-4">{number}</span>
            <h3 className="font-bold mb-2">{title}</h3>
            <p className="text-slate-500 text-sm">{desc}</p>
        </div>
    );
}

function TestimonialCard({ name, role, text, isDark }: any) {
    return (
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <Quote className="text-blue-500/20 mb-4" size={30} />
            <p className="italic mb-6">"{text}"</p>
            <h4 className="font-bold">{name}</h4>
            <p className="text-blue-600 text-xs font-bold uppercase">{role}</p>
        </div>
    );
}