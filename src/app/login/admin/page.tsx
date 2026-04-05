'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { Shield, ChevronRight, Lock, Command, Github, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDiscordLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await signIn.social({
                provider: 'discord',
                callbackURL: '/admin', // Redirect to the internal admin panel on the auth subdomain
            });
        } catch (err: any) {
            setError(err.message || 'AUTHENTICATION_FAILURE');
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 backdrop-blur-xl group hover:border-white/20 transition-all">
                        <Shield className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter uppercase italic text-center">
                        AVRXT <span className="text-zinc-500">AUTH_SYSTEM</span>
                    </h1>
                    <p className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase mt-2">Secure Access Gateway v2.0</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-1000">
                    <div className="space-y-6">
                        <div className="space-y-2 text-center mb-4">
                            <h2 className="text-lg font-bold tracking-tight uppercase">Administrator_Login</h2>
                            <p className="text-xs text-zinc-500">Authorization required for access to the core infrastructure.</p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in shake duration-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-red-500 tracking-wider uppercase font-bold">ERROR: {error}</span>
                            </div>
                        )}

                        <button
                            onClick={handleDiscordLogin}
                            disabled={isLoading}
                            className="w-full h-14 bg-white text-black font-black uppercase italic tracking-widest text-sm rounded-2xl flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98] disabled:opacity-50 group overflow-hidden relative"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Command className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        Continue_with_Discord
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </button>

                        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                           <div className="flex items-center justify-between px-2">
                                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Protocol_Secured</span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-300" />
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-700" />
                                </div>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Footer Credits */}
                <div className="mt-8 flex items-center justify-center gap-6 opacity-30 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
                    <Github className="w-4 h-4 cursor-pointer hover:text-white" />
                    <Twitter className="w-4 h-4 cursor-pointer hover:text-white" />
                    <div className="h-4 w-[1px] bg-white/20" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">&copy; 2026 AVRXT</span>
                </div>
            </div>
        </main>
    );
}
