import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const path = url.pathname;

  // Get the domain from environment or default
  const rootDomain = process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000";

  // Check if it's a subdomain request
  const isSubdomain =
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}` &&
    !hostname.startsWith("localhost") &&
    !hostname.startsWith("127.0.0.1") &&
    !hostname.startsWith("profiled") && // Safety check for root domain
    hostname.split(".").length > 2; // Basic check: subdomain.domain.com > 2 parts

  // Handle subdomain routing (Public Portfolios)
  if (isSubdomain) {
    const subdomain = hostname.split(".")[0];
    if (subdomain === "www" || !subdomain) {
      return NextResponse.next();
    }
    url.pathname = `/portfolio/${subdomain}${path === "/" ? "" : path}`;
    return NextResponse.rewrite(url);
  }

  // Handle Localhost Subdomain Testing
  if (hostname.includes(".localhost") || hostname.includes(".127.0.0.1")) {
    const subdomain = hostname.split(".")[0];
    if (subdomain && subdomain !== "www") {
      url.pathname = `/portfolio/${subdomain}${path === "/" ? "" : path}`;
      return NextResponse.rewrite(url);
    }
  }

  // --- Auth & Routing Logic for Root Domain ---

  // Check for session cookie (better-auth default)
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");
  const isLoggedIn = !!sessionToken;

  // Define allowed paths
  const isDashboard = path.startsWith("/dashboard");
  const isPreview = path.startsWith("/preview");
  const isRoot = path === "/";

  // Allow API routes/static assets handled by matcher
  // (Matcher already handles exclusion of api/static)

  if (isLoggedIn) {
    // User is logged in

    // 1. If accessing Root -> Redirect to Dashboard
    if (isRoot) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 2. If accessing Dashboard or Preview -> Allow
    if (isDashboard || isPreview) {
      return NextResponse.next();
    }

    // 3. Any other route (unknown) -> Redirect to Dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    // User is NOT logged in

    // 1. If accessing Dashboard -> Redirect to Root
    if (isDashboard) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. If accessing Root or Preview -> Allow
    if (isRoot || isPreview) {
      return NextResponse.next();
    }

    // 3. Any other route (unknown) -> Redirect to Root
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Note: We've optimized the matcher to skip static files more aggressively
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|eot|ico)$).*)",
  ],
};
