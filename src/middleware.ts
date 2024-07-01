import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieValue = req.cookies.get("auth_session")?.value;

  if (!cookieValue) {
    // Allow access to sign-in and sign-up pages
    if (
      req.nextUrl.pathname === "/sign-in" ||
      req.nextUrl.pathname === "/sign-up"
    ) {
      return NextResponse.next();
    }
    // Redirect to sign-in if no cookie and not on sign-in or sign-up page
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const userId = cookieValue?.split("?userId=")[1];
  const isAdmin = userId === "16aafx78kvkvgt2";

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"], // Define the routes you want to protect
};

// "/((?!_next).*)" for all routes starting with
// /((?!_next|sign-in|sign-up).*) same but it is not protectiong sign-in and sign-up
