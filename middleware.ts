import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@app/auth/jwt";

export interface AuthenticatedRequest extends NextRequest {
    user: {
        id: String;
    };
}

const unauthenticatedRoutes = [
    "/api/auth/login",
    "/auth/login"
]

export async function middleware(req: NextRequest) {
    let token: string | undefined;

    if (req.cookies.has("token")) {
        token = req.cookies.get("token")?.value;
    } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
        token = req.headers.get("Authorization")?.substring(7);
    }

    if (unauthenticatedRoutes.includes(req.nextUrl.pathname)) {
        return;
    }

    if (!token) {
        let path = new URL(req.url).pathname
        return NextResponse.redirect(new URL(`/auth/login?${new URLSearchParams({ prev: path })}`, req.url))
    }
    const response = NextResponse.next();
    try {
        if (token) {
            const { sub } = await verifyJWT<{ sub: string }>(token);
            response.headers.set("X-USER-ID", sub);
            (req as AuthenticatedRequest).user = { id: sub };
        }
    } catch (error) {
        if (req.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.json({
                "error": "Unauthorized"
            }, { status: 401 })
        }

        return NextResponse.redirect(new URL(`/auth/login?${new URLSearchParams({ prev: "/" })}`, req.url))
    }
}