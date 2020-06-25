/**
 * Client for JSON-based Next.js APIs.
 */

import fetch from 'isomorphic-unfetch';

/**
 * Generic HTTP client that provides a simpler interface on top of
 * fetch.
 */
export default class HttpClient {
  async request(
    url: string | URL,
    { baseUrl, method, body, headers, query }: HttpRequestOptions = {}
  ) {
    const headers_ = {} as Record<string, any>;
    for (const key of Object.keys(headers || {})) {
      headers_[key.toLowerCase()] = headers![key];
    }
    if (method === undefined && body) {
      method = 'POST';
    }
    if (method === 'POST' && !(headers && !headers['content-type'])) {
      headers_['content-type'] = 'application/json';
    }
    const effectiveUrl = url instanceof URL ? url : new URL(url, baseUrl);
    if (query instanceof URLSearchParams) {
      query.forEach((value, key) => {
        effectiveUrl.searchParams.append(key, value);
      });
    }
    const optionalBody = body ? { body: JSON.stringify(body) } : { body: '' };

    const requestInfo = effectiveUrl.toString();
    const requestInit = { method, ...optionalBody, headers: headers_ };
    const response = await fetch(requestInfo, requestInit);

    if (response.status >= 400) {
      throw new HttpStatusError(requestInfo, requestInit, response);
    }

    const responseContentType = response.headers.get('content-type') || '';
    if (
      responseContentType === 'application/json' ||
      responseContentType.startsWith('application/json;')
    ) {
      return response.json();
    }
    return response.text();
  }
}

/**
 * HTTP request options.
 */
export type HttpRequestOptions = {
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
export class HttpStatusError extends Error {
  constructor(
    /** The URL string or the Request object. */
    public readonly requestInfo: RequestInfo,
    public readonly requestInit: RequestInit,
    public readonly response: Response
  ) {
    super(
      `HttpStatusError: ${response.status} response from ${
        requestInit?.method || 'GET'
      } ${response.url}`
    );
  }
}
