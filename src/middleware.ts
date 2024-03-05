import authConfig from "shortiny/server/auth.config"
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig)

import {
  publicRoutes,
  authRoutes,
  protectedRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT
} from "./routes"

export default auth((req) => {
  // req.auth
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log("Route: ", req.nextUrl.pathname," Logged in? ", isLoggedIn)

  if(isApiAuthRoute) {
    return;
  }

  if(isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }

  if(!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encondedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/login?callbackUrl=${encondedCallbackUrl}`,nextUrl))
  }

  return;
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], 
}