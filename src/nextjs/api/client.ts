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
  async request(url: string | URL, options: HttpRequestOptions = {}) {
    const options_ = { ...options };
    if (!options_.baseUrl) {
      options_.baseUrl = `${window.location.origin}/api/`;
    }
    return super.request(url, options_);
  }
}

export const api = new NextApiClient();
