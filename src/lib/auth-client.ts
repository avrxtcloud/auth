import { createAuthClient } from "better-auth/react";
import { adminClient, twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "https://auth.avrxt.in",
  plugins: [
    adminClient(),
    twoFactorClient(),
  ],
});

export const { 
    signIn, 
    signOut, 
    useSession, 
    twoFactor, 
    admin: authAdmin 
} = authClient;
