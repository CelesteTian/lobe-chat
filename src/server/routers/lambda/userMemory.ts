import { UserMemoryModel } from '@/database/models/userMemory';
import { authedProcedure, router } from '@/libs/trpc/lambda';
import { serverDatabase } from '@/libs/trpc/lambda/middleware';

const userMemoryProcedure = authedProcedure.use(serverDatabase).use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      userMemoryModel: new UserMemoryModel(ctx.serverDB, ctx.userId),
    },
  });
});

export const userMemoryRouter = router({
  countMemories: userMemoryProcedure.query(async ({ ctx }) => {
    return ctx.userMemoryModel.countMemories();
  }),

  getContexts: userMemoryProcedure.query(async ({ ctx }) => {
    return ctx.userMemoryModel.queryContexts();
  }),

  getExperiences: userMemoryProcedure.query(async ({ ctx }) => {
    return ctx.userMemoryModel.queryExperiences();
  }),

  getIdentities: userMemoryProcedure.query(async ({ ctx }) => {
    return ctx.userMemoryModel.queryIdentities();
  }),

  getMemories: userMemoryProcedure.query(async ({ ctx }) => {
    return ctx.userMemoryModel.queryMemories();
  }),

  getPreferences: userMemoryProcedure.query(async ({ ctx }) => {
    return ctx.userMemoryModel.queryPreferences();
  }),
});

export type UserMemoryRouter = typeof userMemoryRouter;
