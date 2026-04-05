"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Shield, Lock, ShieldCheck, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6 lg:px-8 bg-black">
            {/* Main Site Parallax Backgrounds */}
            <div className="parallax-bg opacity-40" />
            <div className="mesh-gradient" />

            <div className="w-full max-w-[480px] z-10">
                {/* Branding Section */}
                <div className="flex flex-col items-center mb-10 text-center animate-fade-in">
                    <div className="w-14 h-14 bg-zinc-custom border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-2xl hover:scale-110 transition-all duration-500 hover:border-emerald-500/50">
                        <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-4xl font-black mb-3 tracking-tighter gradient-heading uppercase italic">
                        AVRXT_GATEWAY
                    </h1>
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em] opacity-30">
                        CORE_INFRA_ACCESS_PORTAL
                    </p>
                </div>

                {/* Shadcn-like Card Component */}
                <Card className="animate-fade-in shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)]">
                    <CardHeader className="flex flex-row items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-xl uppercase italic tracking-tighter text-white">Verification_Node</CardTitle>
                            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em] mt-1">Identity_Confirmation_Required</p>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                            Authorized personnel access only. Please authenticate via a secure provider to establish a terminal session with the <span className="text-white italic">avrxt.in</span> infrastructure.
                        </p>

                        {error && (
                            <div className="w-full p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <Button 
                            onClick={handleLogin}
                            disabled={loading}
                            variant="premium"
                            size="lg"
                            className="w-full flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-emerald-500 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                        </svg>
                                        <span>Proceed_with_Discord</span>
                                    </>
                                )}
                            </div>
                            <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </Button>
                    </CardContent>

                    <CardFooter className="flex flex-col items-start gap-4 border-t border-white/5 pt-10">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 leading-none">Security_Protocol_Online</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity cursor-help">
                            <ShieldCheck className="w-4 h-4 text-white" />
                            <span className="text-[10px] font-mono uppercase tracking-widest leading-none">V2.0_Standardized_Enforcement</span>
                        </div>
                    </CardFooter>
                </Card>

                {/* Professional Footer Links */}
                <div className="grid grid-cols-2 mt-12 px-6">
                    <div className="flex flex-col gap-3">
                        <span className="footer-link">Documentation</span>
                        <span className="footer-link">Privacy_Policy</span>
                    </div>
                    <div className="flex flex-col gap-3 items-end">
                        <span className="footer-link">Audit_Archive</span>
                        <span className="footer-link">Terminal_Status</span>
                    </div>
                </div>
                
                <p className="mt-16 text-center text-[10px] font-black text-muted uppercase tracking-[0.4em] opacity-10">
                    © 2026 avrxt.in • all rights reserved
                </p>
            </div>
        </main>
    );
}
