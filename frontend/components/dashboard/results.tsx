"use client";
import React from 'react';
import { Activity, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';

export default function Results({ analysis }: { analysis: any }) {
    const probabilities = analysis?.probabilities || [];
    const prevention = analysis?.prevention || [];

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6 animate-in fade-in zoom-in duration-700">
            {/* En-tête du Bilan */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 text-center">
                <div className="inline-flex p-3 bg-blue-50 rounded-2xl mb-4">
                    <Activity className="text-blue-600" size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-800">Votre Bilan Santé IA</h2>
                <p className="text-slate-500 mt-2 italic text-sm">Analyse prédictive basée sur vos symptômes</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Diagnostics Probables */}
                <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Probabilités</h3>
                    <div className="space-y-5">
                        {probabilities.map((p: any, i: number) => (
                            <div key={i}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-slate-700">{p.condition}</span>
                                    <span className="text-blue-600 font-bold">{p.score}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-full transition-all duration-1000 ease-out"
                                        style={{ width: `${p.score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Niveau d'Urgence */}
                <div className={`rounded-[2rem] p-6 border-2 flex flex-col items-center justify-center text-center ${analysis?.urgency_level === 'high' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
                    }`}>
                    <AlertCircle className={`mb-3 ${analysis?.urgency_level === 'high' ? 'text-red-500' : 'text-emerald-500'}`} size={40} />
                    <p className="text-xs font-black uppercase text-slate-400 mb-1">Niveau d'Urgence</p>
                    <h4 className="text-2xl font-black text-slate-800 uppercase">{analysis?.urgency_level || 'Modéré'}</h4>
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                        {analysis?.urgency_level === 'high'
                            ? "Consultez un médecin en urgence."
                            : "Surveillez vos symptômes et reposez-vous."}
                    </p>
                </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-blue-600" size={18} /> Recommandations de l'IA
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                    {prevention.map((item: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 font-medium text-sm">
                            <div className="h-2 w-2 bg-blue-400 rounded-full" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
                <RefreshCw size={18} /> Nouvelle consultation
            </button>
        </div>
    );
}