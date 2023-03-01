import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// import type { user } from "./server/models/userModel";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const secret = process.env["JWT_TOKEN_SECRET"];
  const c = req.cookies.get("loginToken");

  const daCookie = c && c!.value;

  // const dynamicPath = productsList.find(
  //   ({ id }) => `/paid/product/${id}/` == req.nextUrl.pathname
  // );

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (daCookie) {
      try {
        const { payload } = await jwtVerify(
          daCookie,
          new TextEncoder().encode(secret)
        );
        console.log("has valid cookie and tried login");
        return NextResponse.redirect(new URL("/checkout", req.url));
      } catch (error) {
        console.log("has invalid cookie");
        return NextResponse.next();
      }
    } else {
      console.log("doesnt have cookie");
      return NextResponse.next();
    }
  } else {
    if (!daCookie) {
      console.log("doesnt have cookie and tried protected page");
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      try {
        const { payload } = await jwtVerify(
          daCookie,
          new TextEncoder().encode(secret)
        );
        // console.log(payload);
        console.log("has valid cookie and access");
        return NextResponse.next();
      } catch (error) {
        console.log("has invalid cookie and tried protected page");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }
}

export const config = {
  matcher: ["/login/:path*", "/checkout/:path*", "/dashboard/:path*"],
};
