# AVRXT AUTH SYSTEM

Dedicated Authentication Gateway for `auth.avrxt.in`.

## Features
- **Better Auth Integration**: Production-ready auth server.
- **Discord OAuth**: Social sign-in optimized for administrators.
- **2FA Support**: Built-in two-factor authentication.
- **Admin Dashboard**: Isolated administrative control for user roles.
- **Cross-Subdomain**: Specifically configured to share sessions with `www.avrxt.in` via `.avrxt.in` domain cookies.

## Deployment (Vercel)

1. **New Project**: Connect this repository to your Vercel dashboard.
2. **Environment Variables**:
   - `DATABASE_URL`: Your Neon DB connection string.
   - `BETTER_AUTH_SECRET`: A secure 32-character string.
   - `DISCORD_CLIENT_ID`: From Discord Dev Portal.
   - `DISCORD_CLIENT_SECRET`: From Discord Dev Portal.
   - `DISCORD_GUILD_ID`: Target Server ID.
   - `DISCORD_ADMIN_ROLE_ID`: Required Role ID.
   - `NEXT_PUBLIC_AUTH_URL`: `https://auth.avrxt.in`
   - `BETTER_AUTH_URL`: `https://auth.avrxt.in`
   - `NEXT_PUBLIC_APP_URL`: `https://www.avrxt.in`
3. **Custom Domains**:
   - Add `auth.avrxt.in` to the project domains in Vercel.
   - Ensure the CNAME/A record points to Vercel's Edge network.

## Technical Notes

### Cross-Subdomain Session Sharing
The system is configured in `src/lib/auth.ts` to enable session sharing across the `.avrxt.in` infrastructure.
This allows users to login at `auth.avrxt.in` and remain logged in when they navigate to `www.avrxt.in`.

### Isolated Architecture
This project is deliberately decoupled from the main website code (`avrxt-in`) to ensure maximum security and high availability for the authentication layer.

## Commands
```bash
npm install
npm run dev     # Local development
npm run build   # Production build
npm run start   # Run production server
npx drizzle-kit push # Sync schema with Neon DB
```
