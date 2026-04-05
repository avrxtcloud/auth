import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { 
    History, 
    Search, 
    Filter, 
    Activity, 
    Download, 
    Terminal, 
    Database, 
    ShieldCheck, 
    AlertCircle,
    ChevronRight,
    Clock
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || (session.user as any).role !== 'admin') {
        redirect("/login/admin?error=unauthorized");
    }

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Audit_Log_Stream</h1>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mt-2">Historical_Trace_Log_Archive</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <Button variant="secondary" className="gap-3 border-white/5 hover:border-emerald-500/30 group py-6 px-10 rounded-[2rem]">
                        <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Export_Archive</span>
                    </Button>
                </div>
            </div>

            {/* Logs Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Stats Summary Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-8 group hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl">
                                <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Stream_Status</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-mono p-4 rounded-xl bg-white/[0.02]">
                                <span className="text-zinc-600">CONNECTION:</span>
                                <span className="text-emerald-500">ESTABLISHED</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono p-4 rounded-xl bg-white/[0.02]">
                                <span className="text-zinc-600">ENCRYPTION:</span>
                                <span className="text-cyan-500">AES-256</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono p-4 rounded-xl bg-white/[0.02]">
                                <span className="text-zinc-600">THROUGHPUT:</span>
                                <span className="text-white">NOMINAL</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8 hover:border-white/10 transition-colors opacity-40 hover:opacity-100 cursor-crosshair">
                        <div className="flex items-center gap-4 mb-10">
                             <div className="p-3 bg-purple-500/10 rounded-2xl">
                                <Database className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Database_Storage</h3>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 mb-4 relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-[12%] bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                        </div>
                        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">1.2GB_Used / 10GB_Allocated</p>
                    </Card>
                </div>

                {/* Main Log Stream */}
                <Card className="lg:col-span-3 p-0 overflow-hidden bg-[#050505]/40 border border-white/5 backdrop-blur-xl rounded-[3rem]">
                    <CardHeader className="p-10 border-b border-white/5 flex flex-row items-center justify-between">
                        <CardTitle className="text-xl uppercase italic tracking-tighter text-white">Live_Sequence_Output</CardTitle>
                        <div className="flex items-center gap-3 py-2 px-6 bg-white/5 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Synchronization_Active</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-col min-h-[500px]">
                            {/* Placeholder for real logs when integrated */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-8 opacity-40 hover:opacity-100 transition-all duration-700 p-20 text-center">
                                <Terminal className="w-12 h-12 text-zinc-700 animate-bounce" />
                                <div className="space-y-3">
                                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Establishing_Trace_Connection...</h4>
                                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
                                        Handshaking with secure protocol terminal in Washington, D.C., USA...<br />
                                        Authenticating database node integrity... Verified.
                                    </p>
                                </div>
                                <div className="p-4 px-8 border border-white/10 rounded-2xl bg-white/[0.02] text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-700 italic">
                                    [SYSTEM] Trace integration coming in next cycle update.
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
