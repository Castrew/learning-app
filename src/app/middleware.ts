import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateRequest } from "../../lib/auth"; // Adjust the path to your setup

export async function middleware(req: NextRequest) {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const isAdmin = user?.id === "16aafx78kvkvgt2";
  if (!isAdmin) {
    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected-page", "/another-protected-page"], // Define the routes you want to protect
};
