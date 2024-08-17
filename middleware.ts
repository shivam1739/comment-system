import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from "jose";
import { createRemoteJWKSet } from 'jose';

// Firebase public keys URL
const JWKS_URL = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

// Create a JWKSet from the Firebase public keys URL
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        // No token found, redirect to login
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
        // Verify the token with the public keys from Firebase
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
            audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });

        if (request.nextUrl.pathname.startsWith('/auth/login')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        // Token is valid, continue to the requested page
        console.log("Token is valid:", payload);
        return NextResponse.next();
    } catch (error) {
        // Token is invalid or expired, redirect to login
        console.error("Token validation failed:", error);
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

// Configure the paths where the middleware should run
export const config = {
    matcher: ['/dgjsdjbgfaljb',], // Apply middleware to /home route
};
