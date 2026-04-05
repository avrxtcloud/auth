import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Redirect root of auth subdomain to the main application
    if (pathname === '/') {
        return NextResponse.redirect(new URL('https://www.avrxt.in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};
