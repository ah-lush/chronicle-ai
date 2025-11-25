import { appRouter } from '@/server/api/root';

export const createCaller = async () => {
  return appRouter.createCaller({
    auth: null,
  });
};
