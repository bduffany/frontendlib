/**
 * Client for JSON-based Next.js APIs.
 */
/**
 * Generic HTTP client that provides a simpler interface on top of
 * fetch.
 */
export default class HttpClient {
    request(url: string | URL, { baseUrl, method, body, headers, query }?: HttpRequestOptions): Promise<any>;
}
/**
 * HTTP request options.
 */
export declare type HttpRequestOptions = {
    baseUrl?: string;
    query?: URLSearchParams | Record<string, any>;
    method?: 'GET' | 'POST' | 'HEAD';
    body?: Record<string, any>;
    headers?: Record<string, any>;
};
/**
 * Encapsulates an error that occurred during an HTTP request.
 *
 * It holds the request info as well as the response to the fetch, which can
 * be used to get more details about the nature of the error.
 */
export declare class HttpStatusError extends Error {
    /** The URL string or the Request object. */
    readonly requestInfo: RequestInfo;
    readonly requestInit: RequestInit;
    readonly response: Response;
    constructor(
    /** The URL string or the Request object. */
    requestInfo: RequestInfo, requestInit: RequestInit, response: Response);
}
