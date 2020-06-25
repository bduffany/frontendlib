import { NextRouter, useRouter } from 'next/router';

/**
 * @see https://github.com/vercel/next.js/pull/9370
 */
export const usePatchedRouter = (): NextRouter & {
  ready: boolean;
} => {
  const router = useRouter();
  const queryReady =
    Object.keys(router.query)
      // Server uses amp prop for some reason.
      .filter((k) => k != 'amp').length > 0;

  return { ...router, ready: queryReady };
};
