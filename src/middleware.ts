import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Get the domain from environment or default
  const rootDomain = process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000";

  // Check if it's a subdomain request
  const isSubdomain =
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}` &&
    !hostname.startsWith("localhost") &&
    !hostname.startsWith("127.0.0.1");

  // Handle subdomain routing
  if (isSubdomain) {
    // Extract username from subdomain
    const subdomain = hostname.split(".")[0];

    // Skip if it's www or the root domain
    if (subdomain === "www" || !subdomain) {
      return NextResponse.next();
    }

    // Rewrite to the portfolio page
    url.pathname = `/portfolio/${subdomain}${
      url.pathname === "/" ? "" : url.pathname
    }`;
    return NextResponse.rewrite(url);
  }

  // For local development subdomain testing
  if (hostname.includes(".localhost") || hostname.includes(".127.0.0.1")) {
    const subdomain = hostname.split(".")[0];
    if (subdomain && subdomain !== "www") {
      url.pathname = `/portfolio/${subdomain}${
        url.pathname === "/" ? "" : url.pathname
      }`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images).*)",
  ],
};
