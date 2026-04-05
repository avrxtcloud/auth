'use client';

import { useState } from 'react';
import { Shield, Save, ToggleLeft, ToggleRight, Key, Plus, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateProviderAction, deleteProviderAction } from './actions';

export default function ProvidersClient({ initialProviders }: { initialProviders: any[] }) {
    const [providers, setProviders] = useState(initialProviders);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

    const handleUpdate = async (p: any) => {
        setIsSaving(true);
        try {
            await updateProviderAction(p);
            setStatus({ type: 'success', msg: `SYNCED: ${p.id.toUpperCase()}_INITIALIZED` });
        } catch (e: any) {
            setStatus({ type: 'error', msg: `FAILURE: ${e.message}` });
        } finally {
            setIsSaving(false);
            setTimeout(() => setStatus({ type: null, msg: '' }), 5000);
        }
    };

    const toggleEnabled = (id: string) => {
        setProviders(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black italic uppercase tracking-tight">Identity_Providers</h2>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Manage OAuth Auth Controllers</p>
                </div>
                {status.type && (
                    <div className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest font-bold",
                        status.type === 'success' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                    )}>
                        {status.msg}
                    </div>
                )}
            </header>

            <div className="grid gap-4">
                {providers.map((provider) => (
                    <div key={provider.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-col gap-6 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                                    <Key className={cn("w-5 h-5", provider.enabled ? "text-emerald-500" : "text-zinc-700")} />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-tight italic">{provider.name}</h3>
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">ID: {provider.id}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => toggleEnabled(provider.id)}
                                className={cn("transition-colors", provider.enabled ? "text-emerald-500" : "text-zinc-800")}
                            >
                                {provider.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-mono text-zinc-500 px-1">CLIENT_ID</label>
                                <input 
                                    type="text" 
                                    value={provider.clientId}
                                    onChange={(e) => setProviders(prev => prev.map(p => p.id === provider.id ? { ...p, clientId: e.target.value } : p))}
                                    className="w-full h-12 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-mono focus:border-white/20 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-mono text-zinc-500 px-1">CLIENT_SECRET</label>
                                <input 
                                    type="password" 
                                    value={provider.clientSecret}
                                    onChange={(e) => setProviders(prev => prev.map(p => p.id === provider.id ? { ...p, clientSecret: e.target.value } : p))}
                                    className="w-full h-12 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-mono focus:border-white/20 outline-none transition-all"
                                    placeholder="••••••••••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button 
                                onClick={() => handleUpdate(provider)}
                                disabled={isSaving}
                                className="px-6 h-10 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Save size={14} /> Update_{provider.id.toUpperCase()}
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Provider Mockup/Button */}
                <button className="p-8 rounded-3xl border-2 border-dashed border-white/5 hover:border-white/10 transition-all flex flex-col items-center justify-center gap-3 group text-zinc-700 hover:text-zinc-500">
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    <span className="text-[9px] font-mono uppercase tracking-widest font-black italic">Initialize_New_Control_Gateway</span>
                </button>
            </div>
        </div>
    );
}
