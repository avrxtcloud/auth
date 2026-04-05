"use client";

import { useState } from "react";
import { updateProviderAction, deleteProviderAction } from "./actions";
import { 
    Plus, 
    Trash2, 
    Save, 
    MoreVertical, 
    CheckCircle, 
    XCircle,
    LayoutGrid,
    LayoutList
} from "lucide-react";

export default function ProvidersClient({ initialProviders }: any) {
    const [providers, setProviders] = useState(initialProviders);
    const [isSaving, setIsSaving] = useState<string | null>(null);

    const handleUpdate = async (provider: any) => {
        setIsSaving(provider.id);
        try {
            await updateProviderAction(provider);
            // Visual feedback
        } catch (err) {
            alert("Failed to update protocol node.");
        } finally {
            setIsSaving(null);
        }
    };

    return (
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Toolbar Area */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex bg-white/5 rounded-xl border border-white/10 p-1">
                    <button className="p-2 rounded-lg bg-white/10 text-white transition-all">
                        <LayoutGrid className="w-5 h-5 opacity-80" />
                    </button>
                    <button className="p-2 rounded-lg text-muted hover:text-white transition-all">
                        <LayoutList className="w-5 h-5 opacity-80" />
                    </button>
                </div>
                
                <div className="flex gap-4">
                    <button className="btn-secondary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>Register_New_Node</span>
                    </button>
                </div>
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {providers.map((p: any) => (
                    <div key={p.id} className="glass-card flex flex-col p-8 group hover:border-indigo-500/20 transition-all duration-500">
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center p-3">
                                    <img 
                                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.id}&backgroundColor=6366f1`} 
                                        className="w-full h-full rounded-xl object-contain opacity-80" 
                                        alt={p.id} 
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{p.name || p.id}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${p.enabled ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500'} animate-pulse`} />
                                        <span className={`text-[10px] uppercase font-bold tracking-widest ${p.enabled ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {p.enabled ? 'Protocol_Active' : 'Protocol_Deactivated'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-3 rounded-xl hover:bg-white/5 text-muted hover:text-white">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-muted tracking-widest px-1">Access_Identifier (Client ID)</label>
                                <input 
                                    className="w-full p-4 rounded-xl bg-black/30 border border-white/5 focus:border-indigo-500/30 outline-none transition-all font-mono text-sm tracking-tight text-white/70"
                                    defaultValue={p.clientId}
                                    onChange={(e) => p.clientId = e.target.value}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-muted tracking-widest px-1">Access_Secret (Client Secret)</label>
                                <div className="relative">
                                    <input 
                                        type="password"
                                        className="w-full p-4 rounded-xl bg-black/30 border border-white/5 focus:border-indigo-500/30 outline-none transition-all font-mono text-sm tracking-tight text-white/70"
                                        defaultValue={p.clientSecret}
                                        onChange={(e) => p.clientSecret = e.target.value}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                <div>
                                    <p className="text-xs font-bold text-white mb-1">State_Sync</p>
                                    <p className="text-[10px] text-muted">Enable or disable this authentication endpoint globally.</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        p.enabled = !p.enabled;
                                        setProviders([...providers]);
                                    }}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${p.enabled ? 'bg-indigo-600' : 'bg-white/10'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${p.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button 
                                onClick={() => handleUpdate(p)}
                                disabled={isSaving === p.id}
                                className="flex-1 btn-primary py-3"
                            >
                                {isSaving === p.id ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Update_Protocol</span>
                                    </>
                                )}
                            </button>
                            <button className="px-5 rounded-xl border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-muted hover:text-red-400 transition-all">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
