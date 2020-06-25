import { NextRouter } from 'next/router';
/**
 * @see https://github.com/vercel/next.js/pull/9370
 */
export declare const usePatchedRouter: () => NextRouter & {
    ready: boolean;
};
