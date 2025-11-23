import { protectedProcedure, router } from "../trpc";

export const usersRouter = router({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.users.findMany();
  }),
});

export type UsersRouter = typeof usersRouter;