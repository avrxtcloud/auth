import { db } from "@/lib/db";
import { oauthProviders } from "@/lib/db/schema";
import ProvidersClient from "./ProvidersClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProvidersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== 'admin') {
        redirect('/login/admin');
    }

    const providers = await db.query.oauthProviders.findMany();

    // Default list of supported providers if DB is empty
    const defaultProviders = [
        { id: 'discord', name: 'Discord', clientId: '', clientSecret: '', enabled: false },
        { id: 'github', name: 'GitHub', clientId: '', clientSecret: '', enabled: false },
        { id: 'google', name: 'Google', clientId: '', clientSecret: '', enabled: false },
    ];

    const merged = defaultProviders.map(dp => {
        const found = providers.find(p => p.id === dp.id);
        return found ? found : dp;
    });

    return (
        <div className="min-h-screen bg-[#050505] text-white p-10">
            <ProvidersClient initialProviders={merged} />
        </div>
    );
}
