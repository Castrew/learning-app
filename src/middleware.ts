import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // const cookieValue = req.cookies.get("auth_session")?.value;

  // if (!cookieValue) {
  //   // Allow access to sign-in and sign-up pages
  //   if (
  //     req.nextUrl.pathname === "/sign-in" ||
  //     req.nextUrl.pathname === "/sign-up"
  //   ) {
  //     return NextResponse.next();
  //   }
  //   // Redirect to sign-in if no cookie and not on sign-in or sign-up page
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }

  // const userId = cookieValue.split("?userId=")[1];
  // const isAdmin = userId === "yvli5wewb2blxy5";

  // // Check if the requested URL is "/admin"
  // if (req.nextUrl.pathname.startsWith("/admin")) {
  //   if (!isAdmin) {
  //     return NextResponse.redirect(new URL("/not-authorized", req.url));
  //   }
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!_next|sign-in|sign-up).*)"], // Protect "/", "/admin", and other routes, excluding "/_next", "/sign-in", and "/sign-up"
// };
