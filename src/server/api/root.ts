import { createTRPCRouter } from "./trpc";
import { highSegmentScoringRouter } from "./routers/highSegmentScoring";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  highSegmentScoringRouter: highSegmentScoringRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
