import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/snippets/create(.*)',
    '/snippets/edit(.*)',
]);

// Public routes that logged-in users should be redirected away from
const isPublicOnlyRoute = createRouteMatcher([
    '/',
    '/login(.*)',
    '/signup(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const url = req.nextUrl;

    // If user is logged in and tries to access landing page or auth routes, redirect to dashboard
    if (userId && isPublicOnlyRoute(req)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // If user is not logged in and tries to access protected routes, redirect to login
    if (!userId && isProtectedRoute(req)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
