"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SignInButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await authClient.signIn.social({
                provider: "discord",
                callbackURL: "/login/test"
            });
        } catch (err) {
            alert("FAILURE: Terminal authorization error.");
            setIsLoading(false);
        }
    };

    return (
        <Button 
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full h-16 bg-white/[0.03] hover:bg-emerald-500 hover:text-black border border-white/5 hover:border-emerald-500/50 rounded-[2rem] gap-4 group/btn transition-all font-black uppercase tracking-[0.2em]"
            variant="secondary"
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    <span>Authorize_Standard_Handshake</span>
                    <ChevronRight className="w-4 h-4 opacity-30 group-hover/btn:translate-x-1 transition-all" />
                </>
            )}
        </Button>
    );
}
