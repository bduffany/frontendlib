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
  async request(url: string | URL, options: HttpRequestOptions = {}) {
    const options_ = { ...options };
    if (!options_.baseUrl) {
      options_.baseUrl = `${window.location.origin}/api`;
    }
    return super.request(url, options_);
  }
}

export const api = new NextApiClient();
