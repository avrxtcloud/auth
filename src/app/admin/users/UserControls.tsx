"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { banUserAction, unbanUserAction, revokeAllSessionsAction } from "./actions";
import { Ban, Unlock, ZapOff, MoreVertical, ShieldAlert } from "lucide-react";

export default function UserControls({ user }: any) {
    const [isLoading, setIsLoading] = useState(false);

    const handleBan = async () => {
        const reason = prompt("BLACKLIST_PROTOCOL: Enter reason for node termination:");
        if (!reason) return;
        setIsLoading(true);
        try {
            await banUserAction(user.id, reason);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnban = async () => {
        if (!confirm("RESTORE_PROTOCOL: Are you sure you want to authorize this node?")) return;
        setIsLoading(true);
        try {
            await unbanUserAction(user.id);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRevoke = async () => {
        if (!confirm("REVOKE_ALL_TOKENS: This will force disconnect all active terminals for this node. Continue?")) return;
        setIsLoading(true);
        try {
            await revokeAllSessionsAction(user.id);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-3">
            <Button 
                onClick={handleRevoke}
                disabled={isLoading}
                variant="outline" 
                size="sm" 
                className="h-10 px-4 bg-white/[0.01] hover:bg-red-500/10 hover:text-red-500 border-white/5 gap-3"
            >
                <ZapOff className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline">Revoke_Sessions</span>
            </Button>

            {user.banned ? (
                <Button 
                    onClick={handleUnban}
                    disabled={isLoading}
                    variant="outline" 
                    size="sm" 
                    className="h-10 px-4 border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500 hover:text-black gap-3"
                >
                    <Unlock className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline">Authorize_Node</span>
                </Button>
            ) : (
                <Button 
                    onClick={handleBan}
                    disabled={isLoading}
                    variant="outline" 
                    size="sm" 
                    className="h-10 px-4 border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-black gap-3"
                >
                    <Ban className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest hidden md:inline">Terminate_Node</span>
                </Button>
            )}
        </div>
    );
}
