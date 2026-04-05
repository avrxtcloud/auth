import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { 
    Users, 
    Activity, 
    ShieldAlert, 
    History, 
    Zap,
    Server,
    TrendingUp,
    ChevronRight,
    Globe
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || (session.user as any).role !== 'admin') {
        redirect("/login/admin");
    }

    const stats = [
        { label: "Total_Users", value: "2,842", icon: Users, color: "text-emerald-500", trend: "+5%_MO_MO" },
        { label: "Live_Sessions", value: "1.2M", icon: Zap, color: "text-cyan-500", trend: "NOMINAL" },
        { label: "Security_Pulse", value: "ZERO", icon: ShieldAlert, color: "text-red-500", trend: "ZERO_THRESHOLD" },
        { label: "Node_Uptime", value: "99.9%", icon: Server, color: "text-purple-500", trend: "STABLE" },
    ];

    return (
        <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="p-10 group hover:border-white/20 transition-all shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-between items-start mb-10">
                            <div className={`p-4 rounded-2xl bg-white/[0.02] border border-white/5 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{stat.trend}</span>
                        </div>
                        <h3 className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.4em] mb-2">{stat.label}</h3>
                        <div className="text-5xl font-black tracking-tighter text-white">{stat.value}</div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Audit Logs Stream */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <History className="w-5 h-5 text-zinc-500" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Audit_Log_Stream</h3>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100">Archive</Button>
                    </div>

                    <Card className="p-0 overflow-hidden bg-[#050505]/40 border border-white/5 backdrop-blur-xl rounded-[3rem]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.01]">
                                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-700">Timestamp</th>
                                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-700">Actor</th>
                                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-700">Action_Hash</th>
                                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                                            <td className="p-8 font-mono text-[10px] text-zinc-600 uppercase">14:23:0{i}</td>
                                            <td className="p-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[10px]">A</div>
                                                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">System_Admin</span>
                                                </div>
                                            </td>
                                            <td className="p-8 font-mono text-[10px] text-zinc-500 italic">GATEWAY_PROTOCOL_UPDATE</td>
                                            <td className="p-8">
                                                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border text-emerald-500 border-emerald-500/20 bg-emerald-500/5">VERIFIED</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Core Operations */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-4">
                        <TrendingUp className="w-5 h-5 text-zinc-500" />
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Core_Operations</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: "Broadcast_Signal", desc: "Global system announcement", icon: Activity },
                            { title: "OAuth_Terminal", desc: "Protocol wide overrides", icon: Globe },
                            { title: "Security_Wipe", desc: "Terminal data sanitization", icon: ShieldAlert },
                        ].map((op, i) => (
                            <Button key={i} variant="secondary" className="w-full text-left p-8 h-auto flex flex-col items-start gap-4 hover:border-emerald-500/50 group overflow-hidden relative rounded-[2.5rem]">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-start w-full relative z-10">
                                    <div>
                                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1 group-hover:text-emerald-500 transition-colors">{op.title}</h4>
                                        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">{op.desc}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                        <op.icon className="w-4 h-4" />
                                    </div>
                                </div>
                            </Button>
                        ))}

                        <div className="p-8 rounded-[2.5rem] border border-dashed border-white/10 opacity-30 text-center">
                            <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">Protocol_Slot_Available</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
