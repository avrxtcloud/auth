"use client";

import { useState } from "react";
import { updateProviderAction } from "./actions";
import { 
    Plus, 
    Trash2, 
    Save, 
    MoreVertical, 
    LayoutGrid,
    LayoutList,
    ChevronRight,
    Search,
    Shield
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProvidersClient({ initialProviders }: any) {
    const [providers, setProviders] = useState(initialProviders);
    const [isSaving, setIsSaving] = useState<string | null>(null);

    const handleUpdate = async (provider: any) => {
        setIsSaving(provider.id);
        try {
            await updateProviderAction(provider);
        } catch (err) {
            alert("FAILURE: Protocol synchronization error.");
        } finally {
            setIsSaving(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("TERMINATE_PROTOCOL: Are you sure you want to decommission this identity node?")) return;
        try {
            // No UI state for delete yet, just reload
            window.location.reload(); 
        } catch (err) {
            alert("FAILURE: Protocol termination denied.");
        }
    };

    const addNewProvider = () => {
        const id = `NODE_${Math.random().toString(36).substring(7).toUpperCase()}`;
        const newProvider = {
            id,
            name: "NEW_PROTOCOL",
            clientId: "",
            clientSecret: "",
            enabled: false
        };
        setProviders([newProvider, ...providers]);
    };

    return (
        <div className="animate-fade-in space-y-10">
            {/* Toolbar Area */}
            <div className="flex items-center justify-between">
                <div className="flex bg-white/5 rounded-xl border border-white/5 p-1 backdrop-blur-xl">
                    <Button variant="ghost" size="icon" className="bg-white/5 text-white">
                        <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="opacity-40 hover:opacity-100">
                        <LayoutList className="w-4 h-4" />
                    </Button>
                </div>
                
                <Button 
                    onClick={addNewProvider}
                    variant="secondary" 
                    className="gap-2 border-white/5 hover:border-emerald-500/30"
                >
                    <Plus className="w-4 h-4" />
                    <span>Register_New_Protocol</span>
                </Button>
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {providers.map((p: any) => (
                    <Card key={p.id} className="group hover:border-emerald-500/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        <CardHeader className="flex flex-row items-center justify-between pb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                                    <img 
                                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.id}&backgroundColor=10b981`} 
                                        className="w-full h-full rounded-xl object-contain opacity-60 group-hover:opacity-100 transition-opacity" 
                                        alt={p.id} 
                                    />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl uppercase italic tracking-tighter text-white">{p.name || p.id}</CardTitle>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${p.enabled ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500'} animate-pulse`} />
                                        <span className={`text-[9px] uppercase font-black tracking-[0.2em] ${p.enabled ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {p.enabled ? 'ONLINE' : 'OFFLINE'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-20 hover:opacity-100">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[9px] uppercase font-black text-zinc-600 tracking-[0.3em] px-1">Identifier (Client_ID)</label>
                                <input 
                                    className="w-full p-5 rounded-2xl bg-black/40 border border-white/5 focus:border-emerald-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.05)] outline-none transition-all font-mono text-xs tracking-tight text-white/50 focus:text-white"
                                    value={p.clientId}
                                    onChange={(e) => {
                                        const newProviders = [...providers];
                                        const idx = newProviders.findIndex(x => x.id === p.id);
                                        newProviders[idx].clientId = e.target.value;
                                        setProviders(newProviders);
                                    }}
                                    placeholder="node_id_4772x..."
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] uppercase font-black text-zinc-600 tracking-[0.3em] px-1">Integrity_Key (Client_Secret)</label>
                                <input 
                                    type="password"
                                    className="w-full p-5 rounded-2xl bg-black/40 border border-white/5 focus:border-emerald-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.05)] outline-none transition-all font-mono text-xs tracking-tight text-white/50 focus:text-white"
                                    value={p.clientSecret}
                                    onChange={(e) => {
                                        const newProviders = [...providers];
                                        const idx = newProviders.findIndex(x => x.id === p.id);
                                        newProviders[idx].clientSecret = e.target.value;
                                        setProviders(newProviders);
                                    }}
                                    placeholder="••••••••••••••••"
                                />
                            </div>

                            <div className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-colors">
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">State_Synchronization</p>
                                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">Global Endpoint Control</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        p.enabled = !p.enabled;
                                        setProviders([...providers]);
                                    }}
                                    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none ${p.enabled ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-white/10'}`}
                                >
                                    <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-xl transition-all duration-300 ease-in-out ${p.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </CardContent>

                        <CardFooter className="flex gap-4 pt-10">
                            <Button 
                                onClick={() => handleUpdate(p)}
                                disabled={isSaving === p.id}
                                variant="premium"
                                className="flex-1 h-14 group/btn"
                            >
                                {isSaving === p.id ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <div className="flex items-center justify-between w-full px-2">
                                        <div className="flex items-center gap-3">
                                            <Save className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            <span>Update_Protocol</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 opacity-30 group-hover/btn:translate-x-1 transition-all" />
                                    </div>
                                )}
                            </Button>
                             <Button 
                                onClick={() => handleDelete(p.id)}
                                variant="outline" 
                                size="icon" 
                                className="h-14 w-14 rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
