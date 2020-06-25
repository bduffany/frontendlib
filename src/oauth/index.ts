import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

const HASH_FUNCTIONS = {
  ['HMAC-SHA1'](base_string: string, key: string) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
};

export function getOAuthFlow({
  consumerKey,
  consumerSecret,
  requestTokenUrl,
  accessTokenUrl,
  authorizationUrl,
  refreshTokenUrl,
  signatureMethod = 'HMAC-SHA1',
}: {
  consumerKey: string;
  consumerSecret: string;
  requestTokenUrl: string;
  accessTokenUrl: string;
  refreshTokenUrl: string;
  authorizationUrl: string;
  callback?: string;
  signatureMethod?: keyof typeof HASH_FUNCTIONS;
}) {
  const oauth = new OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret,
    },
    signature_method: signatureMethod,
    hash_function: HASH_FUNCTIONS[signatureMethod],
  });

  return {
    requestToken({ method = 'GET', callback = 'oob' }: any = {}) {
      const authorization = oauth.authorize({
        url: requestTokenUrl,
        method,
        data: {
          oauth_callback: callback,
        },
      });
      const url = requestTokenUrl;
      const headers = {
        Authorization: oauth.toHeader(authorization).Authorization,
      };
      return fetch(url, { headers, method });
    },

    accessToken({
      method = 'GET',
      oauthToken,
      oauthTokenSecret,
      oauthVerifier,
    }: any = {}) {
      const authorization = oauth.authorize(
        {
          url: accessTokenUrl,
          method,
          data: {
            oauth_token: oauthToken,
            oauth_verifier: oauthVerifier,
          },
        },
        {
          key: oauthToken,
          secret: oauthTokenSecret,
        }
      );
      const headers = {
        Authorization: oauth.toHeader(authorization).Authorization,
      };
      const url = accessTokenUrl;
      return fetch(url, { headers, method });
    },

    refreshToken({
      method = 'GET',
      oauthAccessToken,
      oauthAccessTokenSecret,
    }: any = {}) {
      const authorization = oauth.authorize(
        {
          url: refreshTokenUrl,
          method,
        },
        {
          key: oauthAccessToken,
          secret: oauthAccessTokenSecret,
        }
      );
      return fetch(refreshTokenUrl, {
        method,
        ...oauth.toHeader(authorization),
      });
    },

    getAuthorizationUrl({ params = {} }: any) {
      return `${authorizationUrl}?${new URLSearchParams(params)}`;
    },
  };
}
