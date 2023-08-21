import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@app/auth/jwt";
import { redirect } from "next/dist/server/api-utils";

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: String;
  };
}

const unauthenticatedRoutes = [
  "/_next/", // next.js assets
  "/api/auth/login",
  "/auth/login",
];

function redirectToLogin(req: NextRequest, prev: string | null = null) {
  return NextResponse.redirect(
    new URL(
      `/auth/login?${new URLSearchParams({
        prev: prev || req.nextUrl.pathname,
      })}`,
      req.url,
    ),
  );
}

export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  const isUnauthenticatedRoute = unauthenticatedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  if (isUnauthenticatedRoute) {
    return;
  }

  if (!token) {
    let path = new URL(req.url).pathname;
    return redirectToLogin(req, path);
  }
  const response = NextResponse.next();
  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      (req as AuthenticatedRequest).user = { id: sub };
    }
  } catch (error) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    return redirectToLogin(req, "/");
  }
}
