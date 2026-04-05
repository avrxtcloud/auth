import { getDynamicAuthConfig } from "@/lib/auth";
import { betterAuth } from "better-auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const config = await getDynamicAuthConfig();
    const authInstance = betterAuth(config);
    return toNextJsHandler(authInstance).POST(req);
};

export const GET = async (req: NextRequest) => {
    const config = await getDynamicAuthConfig();
    const authInstance = betterAuth(config);
    return toNextJsHandler(authInstance).GET(req);
};
