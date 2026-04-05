'use server';

import { db } from "@/lib/db";
import { oauthProviders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session || session.user.role !== 'admin') {
        throw new Error('UNAUTHORIZED_ACCESS_DENIED');
    }
    return session;
}

export async function updateProviderAction(provider: any) {
    await verifyAdmin();

    const existing = await db.query.oauthProviders.findFirst({
        where: eq(oauthProviders.id, provider.id),
    });

    if (existing) {
        await db.update(oauthProviders)
            .set({
                name: provider.name,
                clientId: provider.clientId,
                clientSecret: provider.clientSecret,
                enabled: provider.enabled,
                updatedAt: new Date(),
            })
            .where(eq(oauthProviders.id, provider.id));
    } else {
        await db.insert(oauthProviders).values({
            id: provider.id,
            name: provider.name,
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
            enabled: provider.enabled,
            updatedAt: new Date(),
        });
    }

    revalidatePath('/admin/providers');
    return { success: true };
}

export async function deleteProviderAction(id: string) {
    await verifyAdmin();
    await db.delete(oauthProviders).where(eq(oauthProviders.id, id));
    revalidatePath('/admin/providers');
    return { success: true };
}
