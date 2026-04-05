import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/redirect";
import { db } from "@/lib/db";
import ProvidersClient from "./ProvidersClient";
import { 
    Globe, 
    Server,
    Search
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProvidersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== 'admin') {
        const { redirect } = await import("next/navigation");
        redirect("/login/admin");
    }

    const providers = await db.query.oauthProviders.findMany();

    return (
        <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black mb-2 uppercase italic tracking-tighter text-white">OAuth_Protocols</h1>
                    <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.4em]">Manage and configure dynamic authentication provider endpoints.</p>
                </div>
                <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center gap-6 backdrop-blur-xl">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <Server className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest leading-none mb-1">Master_Control</p>
                        <p className="text-sm font-black text-white uppercase italic tracking-tighter">PROTOCOL_LAYER_ACTIVE</p>
                    </div>
                </div>
            </div>

            <ProvidersClient initialProviders={providers} />
        </section>
    );
}
