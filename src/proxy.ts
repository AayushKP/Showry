import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = (request.headers.get("host") || "").split(":")[0];
  const path = url.pathname;

  const rootDomain =
    process.env.NEXT_PUBLIC_DOMAIN?.replace(/^www\./, "") || "localhost";

  if (
    hostname.endsWith(`.${rootDomain}`) &&
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}`
  ) {
    const subdomain = hostname.replace(`.${rootDomain}`, "");

    url.pathname =
      path === "/"
        ? `/portfolio/${subdomain}`
        : `/portfolio/${subdomain}${path}`;

    return NextResponse.rewrite(url);
  }

  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const isLoggedIn = Boolean(sessionToken);

  const isDashboard = path.startsWith("/dashboard");
  const isPreview = path.startsWith("/preview");
  const isRoot = path === "/";

  if (isLoggedIn) {
    if (isRoot) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (isDashboard || isPreview) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else {
    if (isDashboard) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isRoot || isPreview) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|eot)$).*)",
  ],
};
