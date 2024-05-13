import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./libs/getSession";
import { NextURL } from "next/dist/server/web/next-url";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)",
  ],
};

interface Routes {
  [url: string]: boolean;
}

const publicUrls: Routes = {
  "/": true,
  "/create-account": true,
  "/sms": true,
  "/login": true,
  "/git": true,
};

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const isPublicReq = publicUrls[req.nextUrl.pathname];
  if (!session.id) {
    if (!isPublicReq) return NextResponse.redirect(new URL("/", req.url));
  } else {
    if (isPublicReq)
      return NextResponse.redirect(new URL("/products", req.url));
  }
}
