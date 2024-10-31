import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { getToken } from "./actions/cookieActions";
import { toKababCase } from "./lib/utils";

const redirectFrom = ["/", "/user", "/super-admin"];
const redirectTo = {
  ["/"]: "/home",
  ["/user"]: "/user/profile",
  ["/super-admin"]: "/super-admin/users",
};

const privateRoutes = ["/user", "/super-admin"];

export async function middleware(request) {
  const pathName = request.nextUrl.pathname;
  const token = await getToken();

  // Redirect from not existing pages
  if (redirectFrom.includes(pathName)) {
    return NextResponse.redirect(new URL(redirectTo[pathName], request.url));
  }

  // Protect Private Routes
  const isPrivateRoute = !!privateRoutes.find((route) =>
    pathName.startsWith(route)
  );
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check Authorization
  if (token) {
    const { userRole: role } = jwtDecode(token);

    const isAuthorized = pathName.startsWith(`/${toKababCase(role)}`);

    if (isAuthorized) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/logout", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/user/:path*", "/super-admin/:path*"],
};
