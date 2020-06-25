import HttpClient, { HttpRequestOptions } from '../../http/client';
/**
 * HTTP client for Next.js based APIs.
 */
export default class NextApiClient extends HttpClient {
    /**
     * Makes a request to the given Next.js API endpoint.
     *
     * The "/api" prefix is automatically prepended, so it should be
     * left out of the provided URL.
     *
     * @override
     */
    request(url: string | URL, options?: HttpRequestOptions): Promise<any>;
}
export declare const api: NextApiClient;
