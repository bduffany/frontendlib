/**
 * Hook that supports making GET requests to a Next.js API endpoint.
 *
 * @param route
 * @param options \{
 *  query: query params.
 *  throwErrors: whether to throw errors. If true, then
 *      errors will bubble up to the ErrorContext, where they can
 *      be handled by a default handler.
 *
 * @see {ErrorContext}
 * }
 */
export declare function useApiRequest(route: string, { query }?: {
    query?: Record<string, any>;
    throwErrors?: boolean;
}): {
    loading: boolean;
    data: any;
};
