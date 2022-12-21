import { router } from "../trpc";
import { authRouter as auth } from "./auth";
import { imagesRouter as images } from "./images";
import { exampleRouter as example } from "./example";

export const appRouter = router({
  auth,
  images,
  example,
});

// export type definition of API
export type AppRouter = typeof appRouter;
