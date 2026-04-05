import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { Shield, User, Mail, Calendar, MoreVertical, Search, Filter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || (session.user as any).role !== 'admin') {
        redirect("/login/admin?error=unauthorized");
    }

    const allUsers = await db.select().from(user).orderBy(user.createdAt);

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Personnel_Directory</h1>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mt-2">Active_Identity_Nodes_Within_Cluster</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                        <input 
                            placeholder="SEARCH_BY_ID_OR_NAME..." 
                            className="bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-[10px] font-mono uppercase tracking-widest focus:border-emerald-500/30 outline-none w-[300px] transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <Card className="p-0 overflow-hidden bg-[#050505]/40 border border-white/5 backdrop-blur-xl rounded-[3rem]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.01]">
                                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-700">Identity</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-700">Administrative_Clearance</th>
                                <th className="p-8 text-[10px] font-black uppercase tracking-widest text-zinc-700">Established_Timestamp</th>
                                <th className="p-8 text-right text-[10px] font-black uppercase tracking-widest text-zinc-700">Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((u) => (
                                <tr key={u.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/30 transition-all">
                                                {u.image ? (
                                                    <img src={u.image} alt={u.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                                ) : (
                                                    <User className="w-5 h-5 text-zinc-700" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-[11px] font-black text-white uppercase tracking-tighter mb-1">{u.name}</div>
                                                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${u.role === 'admin' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-zinc-800'}`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'text-emerald-500' : 'text-zinc-600'}`}>
                                                {u.role || 'USER'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-3 opacity-40">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-[10px] font-mono uppercase tracking-tighter">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <Button variant="ghost" size="icon" className="opacity-20 hover:opacity-100 hover:bg-white/5">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
