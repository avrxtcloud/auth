import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { account } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { 
    ShieldCheck, 
    Activity, 
    Terminal, 
    Cpu, 
    Database, 
    Network, 
    Search, 
    Lock,
    ChevronRight,
    Globe
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DiscordProbe from "./DiscordProbe";
import SignInButton from "./SignInButton";

export const dynamic = 'force-dynamic';

export default async function DiscordTestPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-10 font-medium">
                <Card className="w-full max-w-xl p-16 group hover:border-emerald-500/20 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem]">
                    <div className="flex flex-col items-center text-center gap-10">
                        <div className="p-6 bg-emerald-500/10 rounded-3xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                            <Activity className="w-12 h-12 text-emerald-500 group-hover:text-inherit" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">OAuth_Test_Terminal</h1>
                            <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Discord_Node_Validation_Protocol</p>
                        </div>
                        
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
                            Establishing a secure handshake for identity verification.<br />
                            Please authorize with the Discord node to begin probing server data.
                        </p>

                        <SignInButton />
                    </div>
                </Card>
            </div>
        );
    }

    // Attempt to fetch accessToken for probing
    const acc = await db.query.account.findFirst({
        where: eq(account.userId, session.user.id),
    });

    return (
        <div className="min-h-screen bg-[#020202] text-zinc-400 p-10 lg:p-20 font-medium">
            <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-emerald-500 shadow-[0_0_15px_#10b981]" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Handshake_Verified</h1>
                            <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.4em] mt-1">Terminal_Active: {session.user.name}</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">SESSION_ID</span>
                        <span className="text-[10px] font-mono text-white/40 uppercase">{session.session.id.substring(0, 24)}...</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                    {/* Identification Panel */}
                    <Card className="p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] group">
                        <CardHeader className="flex flex-row items-center gap-6 mb-12">
                            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl uppercase italic tracking-tighter text-white">Identity_Nodes</CardTitle>
                                <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-[0.4em] mt-1">Node_Metadata_Extraction</p>
                            </div>
                        </CardHeader>
                        
                        <CardContent>
                            <DiscordProbe accessToken={acc?.accessToken} />
                        </CardContent>
                    </Card>
                </div>

                <div className="flex items-center justify-center pt-20">
                     <p className="text-[9px] font-mono text-zinc-800 uppercase tracking-[0.5em] italic">AVRXT_CORE_PROTOCOLS_V4.0 // END_OF_TRANSMISSION</p>
                </div>
            </div>
        </div>
    );
}
