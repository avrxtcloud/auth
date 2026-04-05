import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { 
    Settings, 
    Shield, 
    Network, 
    Database, 
    Cpu, 
    Globe, 
    Lock, 
    Key, 
    Fingerprint, 
    Webhook, 
    RefreshCw,
    HardDrive,
    Cloud,
    Save,
    ChevronRight,
    Search
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || (session.user as any).role !== 'admin') {
        redirect("/login/admin?error=unauthorized");
    }

    return (
        <div className="space-y-12 animate-fade-in mb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">System_Configuration</h1>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mt-2">Core_Gateway_Infrastructure_Settings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Advanced Security Configuration */}
                <Card className="xl:col-span-2 p-10 group hover:border-emerald-500/20 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-gradient-to-br from-black to-emerald-500/[0.02]">
                    <CardHeader className="flex flex-row items-center gap-6 mb-12">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
                            <Shield className="w-6 h-6 text-emerald-500 shadow-[0_0_15px_#10b981]" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl uppercase italic tracking-tighter text-white">Security_Parameters</CardTitle>
                            <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-[0.4em] mt-1">Infrastructure_Override_Node</p>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest px-1">Session_Pulse_Rate</h4>
                                <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter mb-4 italic">Automatic_Invalidation_Timer</p>
                                <div className="flex items-center gap-6">
                                    <input type="range" className="flex-1 h-1 bg-white/5 rounded-full accent-emerald-500" />
                                    <span className="text-[10px] font-mono text-emerald-500 underline">24H</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest px-1">Encryption_Level</h4>
                                <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter mb-4 italic">End_To_End_Protocols</p>
                                <div className="flex bg-white/5 p-1 rounded-xl">
                                    <Button variant="ghost" size="sm" className="flex-1 text-[9px] bg-white/5 text-white">AES_256</Button>
                                    <Button variant="ghost" size="sm" className="flex-1 text-[9px] opacity-40">RSA_4096</Button>
                                    <Button variant="ghost" size="sm" className="flex-1 text-[9px] opacity-40">CHACHA</Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-8 group-hover:border-emerald-500/10 transition-colors duration-700">
                             <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">MFA_Enforcement</h4>
                                    <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter italic">Mandatory Identity Verification</p>
                                </div>
                                <div className="w-12 h-6 bg-emerald-500 rounded-full flex justify-end p-1 shadow-[0_0_15px_#10b981]">
                                    <div className="w-4 h-4 bg-white rounded-full shadow-2xl" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between opacity-40">
                                <div>
                                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">IP_Threshold_Lock</h4>
                                    <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter italic">Regional Access Restriction</p>
                                </div>
                                <div className="w-12 h-6 bg-white/10 rounded-full flex justify-start p-1">
                                    <div className="w-4 h-4 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    
                    <CardFooter className="pt-12">
                        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-[0.2em] h-16 rounded-[2rem] gap-4 group/btn shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)] transition-all">
                            <Save className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            <span>Commit_Security_Overrides</span>
                            <ChevronRight className="w-4 h-4 opacity-30 group-hover/btn:translate-x-1 transition-all" />
                        </Button>
                    </CardFooter>
                </Card>

                {/* Satellite Connectivity Panel */}
                <div className="space-y-8 xl:col-span-1">
                    <Card className="p-8 group hover:border-cyan-500/20 transition-all duration-700 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-cyan-500/10 rounded-2xl">
                                <Network className="w-5 h-5 text-cyan-500" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Environment_Nodes</h3>
                        </div>
                        <div className="space-y-6">
                            {[
                                { node: "AWS_EAST_1", status: "ONLINE", color: "text-emerald-500" },
                                { node: "NEON_PRIMARY", status: "SYNCED", color: "text-cyan-500" },
                                { node: "VERCEL_PROD", status: "LIVE", color: "text-emerald-500" },
                                { node: "EDGE_RUNTIME", status: "STABLE", color: "text-white" },
                            ].map((n, i) => (
                                <div key={i} className="flex justify-between items-center text-[9px] font-mono p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-cyan-500/10 transition-colors group/node">
                                    <span className="text-zinc-600 group-hover/node:text-white transition-colors uppercase tracking-widest">{n.node}</span>
                                    <span className={`${n.color} font-black italic`}>{n.status}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-8 group hover:border-purple-500/20 transition-all duration-700 opacity-40 hover:opacity-100 shadow-[0_20px_40px_rgba(0,0,0,0.2)] cursor-help">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-purple-500/10 rounded-2xl">
                                <Cpu className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hardware_Resource</h3>
                        </div>
                        <div className="space-y-4">
                             <div className="flex justify-between text-[9px] uppercase font-mono mb-2">
                                <span className="text-zinc-600">PROCESSOR:</span>
                                <span className="text-white">THREADRIPPER_PRO</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-white/5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 h-full w-[44%] bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
