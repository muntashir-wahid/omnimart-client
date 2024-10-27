import { NextResponse } from "next/server";

export function middleware(request) {
  const pathName = request.nextUrl.pathname;

  if (pathName === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
