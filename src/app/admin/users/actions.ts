'use server';

import { db } from "@/lib/db";
import { user, session as sessionTable, auditLogs } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session || (session.user as any).role !== 'admin') {
        throw new Error('UNAUTHORIZED_ACCESS_DENIED');
    }
    return session;
}

export async function banUserAction(userId: string, reason: string) {
    const admin = await verifyAdmin();
    
    await db.update(user)
        .set({ 
            banned: true, 
            banReason: reason,
            updatedAt: new Date() 
        })
        .where(eq(user.id, userId));

    // Audit log
    await db.insert(auditLogs).values({
        id: `LOG_${Math.random().toString(36).substring(7).toUpperCase()}`,
        adminId: admin.user.id,
        action: "BAN_USER",
        targetUserId: userId,
        details: reason,
        createdAt: new Date()
    });

    revalidatePath('/admin/users');
    return { success: true };
}

export async function unbanUserAction(userId: string) {
    const admin = await verifyAdmin();

    await db.update(user)
        .set({ 
            banned: false, 
            banReason: null,
            updatedAt: new Date() 
        })
        .where(eq(user.id, userId));

    await db.insert(auditLogs).values({
        id: `LOG_${Math.random().toString(36).substring(7).toUpperCase()}`,
        adminId: admin.user.id,
        action: "UNBAN_USER",
        targetUserId: userId,
        createdAt: new Date()
    });

    revalidatePath('/admin/users');
    return { success: true };
}

export async function revokeAllSessionsAction(userId: string) {
    const admin = await verifyAdmin();

    await db.delete(sessionTable).where(eq(sessionTable.userId, userId));

    await db.insert(auditLogs).values({
        id: `LOG_${Math.random().toString(36).substring(7).toUpperCase()}`,
        adminId: admin.user.id,
        action: "REVOKE_ALL_SESSIONS",
        targetUserId: userId,
        createdAt: new Date()
    });

    revalidatePath('/admin/users');
    return { success: true };
}
