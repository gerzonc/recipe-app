import { initTRPC } from "@trpc/server";

/**
 * Unique instance of tRPC for our app
 */
export const t = initTRPC.create();
