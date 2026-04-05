"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Shield, Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            await authClient.signIn.social({
                provider: "discord",
                callbackURL: "/admin",
            });
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="bg-mesh" />
            <div className="bg-grid" />
            
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            <div className="w-full max-w-md px-6 animate-fade-in">
                {/* Logo & Branding */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/20 rotate-12 hover:rotate-0 transition-all duration-500">
                        <Shield className="w-9 h-9 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3 tracking-tight">AVRXT_GATEWAY</h1>
                    <p className="muted max-w-[280px]">
                        Secure authentication node for the <span className="text-[#fff]">avrxt.in</span> infrastructure core.
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-card flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Lock className="w-5 h-5 text-indigo-400" />
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-2">Administrator_Login</h2>
                    <p className="muted mb-8 text-sm">
                        Verification required for server-side management.
                    </p>

                    {error && (
                        <div className="w-full mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <button 
                        onClick={handleLogin}
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                                </svg>
                                <span>Continue_with_Discord</span>
                            </>
                        )}
                    </button>

                    <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-[10px] uppercase tracking-widest font-medium">Protocol_v2.0</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white" />
                        <span className="text-[10px] uppercase tracking-widest font-medium">© 2026 AVRXT</span>
                    </div>
                </div>
            </div>

        </main>
    );
}
