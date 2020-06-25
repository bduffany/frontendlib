/**
 * Performs a fetch call if the input is non-null and returns
 * an object with the state of the promise returned by the
 * fetch call.
 *
 * @param input
 * @param init
 */
export default function useFetch(input: RequestInfo, init?: RequestInit | undefined): {
    loading: boolean;
    data: any;
    error: any;
};
