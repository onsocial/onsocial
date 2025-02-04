import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const accountId = url.pathname.substring(1); // Remove leading "/"

  if (accountId.length > 0) {
    console.log("Middleware redirecting:", accountId); // Debugging log
    return NextResponse.redirect(`https://onsocial.id/#/${accountId}/widget/MyPage?accountId=${accountId}`);
  }

  return NextResponse.next();
}
