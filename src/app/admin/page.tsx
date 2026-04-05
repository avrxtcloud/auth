'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { Users, ShieldAlert, Activity, LayoutDashboard, Search, Ban, Unlock, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
    const { data: session, isPending } = authClient.useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Initial check for session and redirect if not admin
    useEffect(() => {
        if (!isPending && (!session || session.user.role !== 'admin')) {
             // Redirect away if unauthorized
             window.location.href = '/login/admin';
        }
    }, [session, isPending]);

    const fetchUsers = async () => {
        setIsRefreshing(true);
        try {
            // Use better-auth admin plugin to list users
            const response = await authClient.admin.listUsers({
                query: {
                    limit: 100,
                }
            });
            if (response.data) {
                setUsers(response.data.users);
            }
        } catch (e) {
            console.error("List users failed", e);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        if (session?.user?.role === 'admin') {
            fetchUsers();
        }
    }, [session]);

    if (isPending) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-zinc-500 uppercase italic">Verifying_Credentials...</div>;

    const filteredUsers = users.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-black/20 flex flex-col p-6 gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="font-black tracking-tighter uppercase italic text-sm">AVRXT_CORE</span>
                </div>

                <nav className="space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 text-white text-xs font-bold uppercase tracking-widest transition-all">
                        <LayoutDashboard size={14} /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">
                        <Users size={14} /> Users
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-600 hover:text-white text-xs font-bold uppercase tracking-widest transition-all">
                        <ShieldAlert size={14} /> Security
                    </button>
                </nav>

                <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase mb-2">Authenticated_As</p>
                    <p className="text-[10px] font-bold truncate underline underline-offset-4 decoration-zinc-800 uppercase italic">{session?.user.email}</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-1">User_Pulse</h1>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Infrastructure Management Interface</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                            <input 
                                type="text" 
                                placeholder="SEARCH_IDENTIFIER..."
                                className="h-12 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 text-xs font-mono focus:border-white/40 transition-all outline-none min-w-[300px] uppercase"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={fetchUsers}
                            className="h-12 px-6 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {isRefreshing ? 'SYNCING...' : 'SYNC_NOW'}
                        </button>
                    </div>
                </header>

                {/* Table */}
                <div className="grid gap-4">
                    {filteredUsers.length === 0 ? (
                        <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                            <Users className="w-10 h-10 text-zinc-800 mx-auto mb-4" />
                            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">No matching nodes found in the network</p>
                        </div>
                    ) : (
                        <div className="border border-white/5 bg-white/[0.01] rounded-3xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/[0.02] border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Identity</th>
                                        <th className="px-6 py-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Role</th>
                                        <th className="px-6 py-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Activity</th>
                                        <th className="px-6 py-4 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-6 font-bold uppercase italic text-sm tracking-tight">{user.name} <span className="block text-[9px] font-mono opacity-20 italic lowercase not-italic normal-case">{user.email}</span></td>
                                            <td className="px-6">
                                                <span className={cn(
                                                    "px-2.5 py-1 text-[8px] font-black rounded uppercase tracking-widest",
                                                    user.role === 'admin' ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-white/5 text-zinc-500 border border-white/10"
                                                )}>{user.role}</span>
                                            </td>
                                            <td className="px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", user.banned ? "bg-red-500" : "bg-emerald-500")} />
                                                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">{user.banned ? 'Banned' : 'Authorized'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6">
                                                <span className="text-[9px] font-mono text-zinc-600 uppercase">{new Date(user.createdAt).toLocaleDateString()}</span>
                                            </td>
                                            <td className="px-6 text-right">
                                                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20"><UserCheck size={14} /></button>
                                                    <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-colors"><Ban size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
