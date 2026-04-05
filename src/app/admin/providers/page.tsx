import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProvidersClient from "./ProvidersClient";
import { 
    LayoutDashboard, 
    Users, 
    Globe, 
    ShieldAlert, 
    Activity, 
    LogOut, 
    ShieldCheck, 
    Server
} from "lucide-react";
import Link from "next/link";

export default async function ProvidersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== 'admin') {
        redirect("/login/admin");
    }

    const providers = await db.query.oauthProviders.findMany();

    return (
        <div className="min-h-screen bg-mesh">
            <div className="bg-grid opacity-50" />
            
            <div className="flex">
                {/* Modern Sidebar (Duplicated for consistency, in a real app this would be a shared Layout) */}
                <aside className="w-72 min-h-screen sticky top-0 bg-white/[0.02] border-r border-white/[0.05] p-8 flex flex-col backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">AVRXT_ADMIN</span>
                    </div>

                    <nav className="flex-1 flex flex-col gap-2">
                        <Link href="/admin" className="p-3 rounded-xl text-muted hover:bg-white/5 hover:text-white flex items-center gap-3 font-medium transition-all">
                            <LayoutDashboard className="w-5 h-5 opacity-70" />
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/admin/users" className="p-3 rounded-xl text-muted hover:bg-white/5 hover:text-white flex items-center gap-3 font-medium transition-all">
                            <Users className="w-5 h-5 opacity-70" />
                            <span>User_Management</span>
                        </Link>
                        <Link href="/admin/providers" className="p-3 rounded-xl bg-white/5 border border-white/10 text-white flex items-center gap-3 font-medium transition-all">
                            <Globe className="w-5 h-5 opacity-70" />
                            <span>OAuth_Protocols</span>
                        </Link>
                        <div className="my-4 border-t border-white/[0.05]" />
                        <Link href="/admin/security" className="p-3 rounded-xl text-muted hover:bg-white/5 hover:text-white flex items-center gap-3 font-medium transition-all">
                            <ShieldAlert className="w-5 h-5 opacity-70" />
                            <span>Security_Nodes</span>
                        </Link>
                        <Link href="/admin/logs" className="p-3 rounded-xl text-muted hover:bg-white/5 hover:text-white flex items-center gap-3 font-medium transition-all">
                            <Activity className="w-5 h-5 opacity-70" />
                            <span>System_Logs</span>
                        </Link>
                    </nav>

                    <div className="mt-auto pt-8 border-t border-white/[0.05]">
                        <div className="flex items-center gap-4 p-3 mb-6 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
                            <img src={session.user.image || ''} className="w-10 h-10 rounded-xl" alt="avatar" />
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold truncate">{session.user.name}</p>
                                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Access_Level: ADMIN</p>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 p-12">
                    <section className="mb-12 animate-fade-in">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h1 className="mb-2">OAuth_Protocols</h1>
                                <p className="muted">Manage and configure dynamic authentication provider endpoints.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-indigo-500/10">
                                    <Server className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Master_Override</p>
                                    <p className="text-xs font-bold text-white">Active_ControlEnabled</p>
                                </div>
                            </div>
                        </div>

                        <ProvidersClient initialProviders={providers} />
                    </section>
                </main>
            </div>
        </div>
    );
}
