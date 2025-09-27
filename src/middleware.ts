import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  const isLoginRoute = pathname.startsWith("/login");
  const isProtectedRoute =
    pathname === "/" || pathname.startsWith("/employees"); // ✅ add more as needed

  // If logged in, prevent going back to /login
  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If not logged in, block protected routes
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/employees/:path*", "/login"],
};
