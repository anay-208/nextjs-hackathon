import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';
import { headers } from 'next/headers';

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const authRoutes = ['/sign-in', '/sign-up']; // Routes that require redirection if authenticated
    const protectedRoutes = ['/dashboard', '/journal', '/goals', '/finance']; // Routes that require authentication

    const currentPath = request.nextUrl.pathname;

    // Redirect authenticated users away from auth routes
    if (session && authRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }


    // Redirect unauthenticated users to sign-in for protected routes
    if (!session && protectedRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/journal', '/goals', '/finance', '/sign-in', '/sign-up'],
    runtime: 'nodejs',
};