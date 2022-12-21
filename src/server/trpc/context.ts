import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { createClient, type ContentfulClientApi } from "contentful";
import { type Session } from "next-auth";
import { env } from "../../env/server.mjs";

import { getServerAuthSession } from "../common/get-server-auth-session";

// CreateContextOptions is the options that createContextInner takes
// should have a session and a contentful client
type CreateContextOptions = {
  session: Session | null;
  client: ContentfulClientApi | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    client: opts.client,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  // Create the contentful client
  const client = createClient({
    space: env.CONTENTFUL_SPACE_ID,
    accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  });

  return await createContextInner({
    session,
    client,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
