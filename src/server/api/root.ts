import { urlRouter } from "shortiny/server/api/routers/url-router";
import { createTRPCRouter } from "shortiny/server/api/trpc";
import { userRouter } from "./routers/user-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  url: urlRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
