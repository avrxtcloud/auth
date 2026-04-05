"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Shield, Lock, ShieldCheck, Discord } from "lucide-react";

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
                                <Discord className="w-5 h-5" />
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

            {/* Custom CSS overrides for tailwind-like behavior on pure CSS project */}
            <style jsx>{`
                .text-4xl { font-size: 2.25rem; }
                .text-xl { font-size: 1.25rem; }
                .text-sm { font-size: 0.875rem; }
                .font-bold { font-weight: 700; }
                .font-semibold { font-weight: 600; }
                .mb-10 { margin-bottom: 2.5rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-3 { margin-bottom: 0.75rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .mb-8 { margin-bottom: 2rem; }
                .mt-8 { margin-top: 2rem; }
                .tracking-tight { letter-spacing: -0.025em; }
                .tracking-widest { letter-spacing: 0.1em; }
                .text-center { text-align: center; }
                .rotate-12 { transform: rotate(12deg); }
                .hover\:rotate-0:hover { transform: rotate(0deg); }
                .transition-all { transition: all 0.5s; }
                .duration-500 { transition-duration: 0.5s; }
                .gap-2 { gap: 0.5rem; }
                .gap-6 { gap: 1.5rem; }
                .uppercase { text-transform: uppercase; }
            `}</style>
        </main>
    );
}
