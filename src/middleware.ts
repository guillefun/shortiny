import authConfig from "shortiny/server/auth.config"
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig)

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT as DEFAULT_LOGGED_REDIRECT,
  ONLY_PUBLIC_URL
} from "./routes"

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isShortinyUrl = new RegExp("^\/[A-Za-z0-9_-]{6}$").test(nextUrl.pathname)
  const isOnlyPublicUrl = nextUrl.pathname === ONLY_PUBLIC_URL
  
  if(isApiAuthRoute) {
    return;
  }

  if(isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGGED_REDIRECT, nextUrl))
    }
    return;
  }

  if(isOnlyPublicUrl) {
    if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGGED_REDIRECT, nextUrl))
    }
  }
 
  if(!isLoggedIn && !isPublicRoute) {
    if(isShortinyUrl) { //TODO: Check logic, may cause some match with undesired routes like /logout
      return;
    }

    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encondedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/login?callbackUrl=${encondedCallbackUrl}`,nextUrl))
  }

  if(isShortinyUrl) {
    return;
  }

  return;
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], 
}