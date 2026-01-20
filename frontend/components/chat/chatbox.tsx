"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';

export default function ChatBox({ onComplete }: { onComplete: (data: any) => void }) {
    const [messages, setMessages] = useState([{ role: 'assistant', content: 'Bonjour. Je suis votre assistant virtuel. Pouvez-vous décrire vos symptômes ?' }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newHistory = [...messages, { role: 'user', content: input }];
        setMessages(newHistory);
        setInput('');
        setIsTyping(true);

        try {
            const res = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: newHistory }),
            });
            const data = await res.json();

            if (data.is_final) {
                onComplete(data.analysis);
            } else {
                setMessages([...newHistory, { role: 'assistant', content: data.message }]);
            }
        } catch (e) {
            console.error("Erreur Backend");
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px]">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
                {messages.map((m, i) => (
                    <div key={i} className={`flex items-end gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-blue-600' : 'bg-slate-200'}`}>
                            {m.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-slate-600" />}
                        </div>
                        <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isTyping && <div className="text-xs text-slate-400 animate-pulse font-medium ml-11">L'IA analyse vos symptômes...</div>}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                <input
                    className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-inner"
                    placeholder="Répondez ici..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-95">
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}