import { NextResponse } from "next/server";

const redirectFrom = ["/", "/user"];
const redirectTo = {
  ["/"]: "/home",
  ["/user"]: "/user/profile",
};

export function middleware(request) {
  const pathName = request.nextUrl.pathname;

  if (redirectFrom.includes(pathName)) {
    return NextResponse.redirect(new URL(redirectTo[pathName], request.url));
  }
}

export const config = {
  matcher: ["/", "/user/:path*"],
};
