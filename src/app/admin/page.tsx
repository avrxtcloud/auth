import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { 
    Users, 
    ShieldAlert, 
    LayoutDashboard, 
    Settings, 
    LogOut, 
    ShieldCheck, 
    Zap,
    Globe,
    Activity
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== 'admin') {
        redirect("/login/admin");
    }

    const StatCard = ({ title, value, icon, color }: any) => (
        <div className="glass-card flex items-center gap-6 group hover:border-[#fff]/20 transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${color} shadow-lg shadow-${color.split(' ')[1]}/20 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div>
                <p className="muted text-xs uppercase tracking-widest font-semibold mb-1">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-mesh">
            <div className="bg-grid opacity-50" />
            
            <div className="flex">
                {/* Modern Sidebar */}
                <aside className="w-72 min-h-screen sticky top-0 bg-white/[0.02] border-r border-white/[0.05] p-8 flex flex-col backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">AVRXT_ADMIN</span>
                    </div>

                    <nav className="flex-1 flex flex-col gap-2">
                        <Link href="/admin" className="p-3 rounded-xl bg-white/5 border border-white/10 text-white flex items-center gap-3 font-medium transition-all">
                            <LayoutDashboard className="w-5 h-5 opacity-70" />
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/admin/users" className="p-3 rounded-xl text-muted hover:bg-white/5 hover:text-white flex items-center gap-3 font-medium transition-all">
                            <Users className="w-5 h-5 opacity-70" />
                            <span>User_Management</span>
                        </Link>
                        <Link href="/admin/providers" className="p-3 rounded-xl text-muted hover:bg-white/5 hover:text-white flex items-center gap-3 font-medium transition-all">
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
                        <button className="w-full btn-secondary flex items-center justify-center gap-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300">
                            <LogOut className="w-4 h-4" />
                            <span>Protocol_SignOut</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-12">
                    <section className="mb-12 animate-fade-in">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="mb-2">Admin_Control_Panel</h1>
                                <p className="muted">Real-time infrastructure management and user oversight.</p>
                            </div>
                            <div className="btn-primary w-fit text-sm">
                                <Zap className="w-4 h-4 fill-current" />
                                <span>Core_Online</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                title="Active_Nodes" 
                                value="2,842" 
                                icon={<Users className="w-7 h-7 text-white" />}
                                color="from-blue-500 to-indigo-600"
                            />
                            <StatCard 
                                title="Auth_Streams" 
                                value="1.2M" 
                                icon={<ShieldCheck className="w-7 h-7 text-white" />}
                                color="from-purple-500 to-pink-600"
                            />
                            <StatCard 
                                title="System_Uptime" 
                                value="99.98%" 
                                icon={<Zap className="w-7 h-7 text-white" />}
                                color="from-amber-500 to-orange-600"
                            />
                            <StatCard 
                                title="Threat_Level" 
                                value="LOW" 
                                icon={<ShieldAlert className="w-7 h-7 text-white" />}
                                color="from-emerald-500 to-teal-600"
                            />
                        </div>
                    </section>

                    {/* Dashboard Placeholder Content */}
                    <div className="glass-card mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.05]">
                            <h3 className="text-xl font-bold">Protocol_Activity</h3>
                            <button className="text-indigo-400 text-sm font-bold hover:underline">View_Global_Logs</button>
                        </div>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/[0.02] transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-muted" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold mb-1">New Administrator Authentication Verified</p>
                                        <p className="text-xs text-muted">Node ID: DE-FRA-01 • Timestamp: 14:23:02 • Protocol: OAUTH2_DISCORD</p>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                                        Verified
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

        </div>
    );
}
