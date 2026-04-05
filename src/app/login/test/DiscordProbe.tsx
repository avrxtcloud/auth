"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Globe, Shield, Activity, Terminal, ChevronRight, Server } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DiscordProbe({ accessToken }: { accessToken?: string | null }) {
    const [guilds, setGuilds] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const probeNodes = async () => {
        if (!accessToken) {
            setError("FAILURE: Node Access Token Missing.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Step 1: Fetch all guilds the user is in
            const guildRes = await fetch("https://discord.com/api/v10/users/@me/guilds", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!guildRes.ok) throw new Error(`Discord_API_Error: ${guildRes.status}`);
            const guildData = await guildRes.json();
            
            // Step 2: For each guild, attempt to probe member data (roles)
            const probedGuilds = await Promise.all(guildData.map(async (guild: any) => {
                try {
                    const memberRes = await fetch(`https://discord.com/api/v10/users/@me/guilds/${guild.id}/member`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });
                    
                    if (memberRes.ok) {
                        const memberData = await memberRes.json();
                        return { ...guild, roles: memberData.roles };
                    }
                    return { ...guild, roles: [], restricted: true };
                } catch (e) {
                    return { ...guild, roles: [], restricted: true };
                }
            }));

            setGuilds(probedGuilds);
        } catch (err: any) {
            setError(`HANDSHAKE_FAILURE: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 border-dashed">
                <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Protocol_Metadata_Stream</h3>
                    <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter italic">Deep_Node_Extraction_Active</p>
                </div>
                <Button 
                    onClick={probeNodes}
                    disabled={isLoading || !accessToken}
                    variant="premium"
                    className="h-14 px-10 gap-4 group/btn"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Search className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span>Probe_Discord_Nodes</span>
                        </>
                    )}
                </Button>
            </div>

            {error && (
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 text-[10px] font-mono uppercase tracking-widest flex items-center gap-4 animate-in fade-in duration-500">
                    <Activity className="w-4 h-4 animate-pulse" />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guilds.map((g) => (
                    <div key={g.id} className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 hover:border-emerald-500/20 transition-all group/node relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity" />
                        
                        <div className="flex items-center gap-6 relative z-10 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden relative">
                                {g.icon ? (
                                    <img src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`} className="w-full h-full object-cover grayscale group-hover/node:grayscale-0 transition-all" alt={g.name} />
                                ) : (
                                    <Server className="w-6 h-6 text-zinc-700" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[11px] font-black text-white uppercase tracking-tighter truncate">{g.name}</h4>
                                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest mt-1">ID: {g.id}</p>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <Shield className="w-3 h-3 text-emerald-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Authorized_Roles:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {g.roles && g.roles.length > 0 ? (
                                    g.roles.map((rId: string) => (
                                        <div key={rId} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-mono uppercase">
                                            {rId}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-700 text-[8px] font-mono uppercase italic">
                                        {g.restricted ? "NODE_ACCESS_RESTRICTED" : "NO_ROLES_DETECTED"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {guilds.length === 0 && !isLoading && !error && (
                <div className="p-20 text-center space-y-4">
                    <Activity className="w-12 h-12 text-zinc-800 mx-auto opacity-20" />
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Awaiting_Node_Command...</p>
                </div>
            )}
        </div>
    );
}
