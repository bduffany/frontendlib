import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import { RequestProcessor, BaseRequest } from '../pipeline';
import { requireQueryParams } from '../request/validation';
import { HttpStatusError } from '../pipeline/error';

const HASH_FUNCTIONS = {
  ['HMAC-SHA1'](base_string: string, key: string) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
};

/**
 * Returns middleware that adds oauth flow support to the request.
 * @param providerConfigs
 */
export function oauthFlowMiddleware(
  // TODO: type
  providerConfigs: any
): RequestProcessor {
  const middleware: RequestProcessor = (req, res, next = () => {}) => {
    requireQueryParams(['consumer_key', 'provider'], req);
    const { consumer_key, provider } = req.query;
    const config = providerConfigs[provider as string];
    if (!config || config.consumer_key !== consumer_key) {
      throw new HttpStatusError(
        401,
        'Request has invalid or missing consumer_key'
      );
    }
    (req as BaseRequest & OAuthMixin).oauth = new OAuthFlow(config);
    next();
  };
  return middleware;
}

export type OAuthProviderConfig = {
  consumer_key: string;
  consumer_secret: string;
  request_token_url: string;
  access_token_url: string;
  refresh_access_token_url: string;
  revoke_access_token_url: string;
  authorize_url: string;
  callback_url?: string;
  signature_method?: keyof typeof HASH_FUNCTIONS;
};

/**
 * Utilities for dealing with OAuth.
 */
export class OAuthFlow {
  private readonly oauth: OAuth;

  constructor(private readonly config: OAuthProviderConfig) {
    const {
      consumer_key,
      consumer_secret,
      signature_method = 'HMAC-SHA1',
    } = this.config;
    this.oauth = new OAuth({
      consumer: {
        key: consumer_key,
        secret: consumer_secret,
      },
      signature_method,
      hash_function: HASH_FUNCTIONS[signature_method],
    });
  }

  requestToken({ callback = 'oob' }: any = {}) {
    return this.signedFetch(
      this.config.request_token_url,
      this.config.consumer_key,
      this.config.consumer_secret,
      { data: { oauth_callback: callback } }
    );
  }

  accessToken({ oauthToken, oauthTokenSecret, oauthVerifier }: any) {
    return this.signedFetch(
      this.config.access_token_url,
      oauthToken,
      oauthTokenSecret,
      { data: { oauth_token: oauthToken, oauth_verifier: oauthVerifier } }
    );
  }

  refreshAccessToken({ oauthAccessToken, oauthAccessTokenSecret }: any) {
    return this.signedFetch(
      this.config.refresh_access_token_url,
      oauthAccessToken,
      oauthAccessTokenSecret
    );
  }

  revokeAccessToken({ oauthAccessToken, oauthAccessTokenSecret }: any) {
    return this.signedFetch(
      this.config.revoke_access_token_url,
      oauthAccessToken,
      oauthAccessTokenSecret
    );
  }

  getAuthorizationUrl({ params = {} }: any) {
    return `${this.config.authorize_url}?${new URLSearchParams(params)}`;
  }

  private signedFetch(
    url: string,
    key: string,
    secret: string,
    { data = {} }: { method?: string; data?: Record<string, any> } = {}
  ) {
    const credentials =
      key === this.config.consumer_key ? undefined : { key, secret };
    const authorization = this.oauth.authorize(
      { url, method: 'GET', data },
      credentials
    );
    return fetch(url, {
      method: 'GET',
      headers: { ...this.oauth.toHeader(authorization) },
    });
  }
}

/** Request mixin with OAuth utilities. */
export type OAuthMixin = {
  oauth: OAuthFlow;
};
