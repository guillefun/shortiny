/**
 * An array of public routes
 * No auth required
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/[url]"
]

/**
 * An array used for auth
 * No auth required
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register"
]

/**
 * An array or protected routes
 * Auth required
 * @type {string[]}
 */
export const protectedRoutes = [
  "/board",
  "/settings"
]

/**
 * The prefix for API authentication
 * Routes taht start with this prefix are used for API auth
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"


export const DEFAULT_LOGIN_REDIRECT = "/board"