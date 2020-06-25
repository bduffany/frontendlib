import HttpClient, { HttpRequestOptions } from '../../http/client';
/**
 * HTTP client for Next.js based APIs.
 */
export default class NextApiClient extends HttpClient {
    /**
     * Makes a request to the given Next.js API endpoint.
     *
     * @param url the path to the API route relative to the "/api" directory,
     *    e.g. "oauth/access_token"
     * @override
     */
    request(url: string | URL, options?: HttpRequestOptions): Promise<any>;
}
export declare const api: NextApiClient;
