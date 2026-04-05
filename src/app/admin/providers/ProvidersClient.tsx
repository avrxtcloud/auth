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
import { cn } from "@/lib/utils";

const SUPPORTED_PROVIDERS = [
    { id: "google", name: "Google", icon: "https://www.svgrepo.com/show/475656/google-color.svg" },
    { id: "github", name: "GitHub", icon: "https://www.svgrepo.com/show/512317/github-142.svg" },
    { id: "discord", name: "Discord", icon: "https://www.svgrepo.com/show/353655/discord-icon.svg" },
    { id: "spotify", name: "Spotify", icon: "https://www.svgrepo.com/show/452093/spotify.svg" },
    { id: "twitch", name: "Twitch", icon: "https://www.svgrepo.com/show/354477/twitch.svg" },
    { id: "apple", name: "Apple", icon: "https://www.svgrepo.com/show/511330/apple-173.svg" },
    { id: "microsoft", name: "Microsoft", icon: "https://www.svgrepo.com/show/512461/microsoft-150.svg" },
];

export default function ProvidersClient({ initialProviders }: any) {
    const [providers, setProviders] = useState(initialProviders);
    const [showSelector, setShowSelector] = useState(false);
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
            await updateProviderAction({ id, enabled: false }); // Disable first?
            window.location.reload(); 
        } catch (err) {
            alert("FAILURE: Protocol termination denied.");
        }
    };

    const addNewProvider = (template: any) => {
        if (providers.find((p: any) => p.id === template.id)) {
            alert(`CONFLICT: Protocol ${template.id} is already operational.`);
            return;
        }
        const newProvider = {
            id: template.id,
            name: template.name,
            clientId: "",
            clientSecret: "",
            enabled: false
        };
        setProviders([newProvider, ...providers]);
        setShowSelector(false);
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
                    onClick={() => setShowSelector(!showSelector)}
                    variant="secondary" 
                    className={`gap-2 border-white/5 hover:border-emerald-500/30 transition-all ${showSelector ? 'bg-emerald-500 text-black shadow-[0_0_20px_#10b981]' : ''}`}
                >
                    <Plus className={cn("w-4 h-4 transition-transform", showSelector ? "rotate-45" : "")} />
                    <span>Authorize_Provider</span>
                </Button>
            </div>

            {/* Provider Selector Grid */}
            {showSelector && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] animate-in zoom-in-95 duration-500">
                    {SUPPORTED_PROVIDERS.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => addNewProvider(template)}
                            className="flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                        >
                            <img src={template.icon} className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all" alt={template.name} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white">{template.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Providers Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {providers.map((p: any) => (
                    <Card key={p.id} className="group hover:border-emerald-500/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        <CardHeader className="flex flex-row items-center justify-between pb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                                    <img 
                                        src={SUPPORTED_PROVIDERS.find(sp => sp.id === p.id)?.icon || `https://api.dicebear.com/7.x/initials/svg?seed=${p.id}&backgroundColor=10b981`} 
                                        className={cn("w-full h-full rounded-xl object-contain transition-opacity", p.enabled ? "opacity-100" : "opacity-40 grayscale")} 
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
