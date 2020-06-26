import { RequestProcessor } from '../pipeline';
declare const HASH_FUNCTIONS: {
    "HMAC-SHA1"(base_string: string, key: string): string;
};
/**
 * Returns middleware that adds oauth flow support to the request.
 * @param providerConfigs
 */
export declare function oauthFlowMiddleware(providerConfigs: any): RequestProcessor;
export declare type OAuthProviderConfig = {
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
export declare class OAuthFlow {
    private readonly config;
    private readonly oauth;
    constructor(config: OAuthProviderConfig);
    requestToken({ callback }?: any): Promise<Response>;
    accessToken({ oauthToken, oauthTokenSecret, oauthVerifier }: any): Promise<Response>;
    refreshAccessToken({ oauthAccessToken, oauthAccessTokenSecret }: any): Promise<Response>;
    revokeAccessToken({ oauthAccessToken, oauthAccessTokenSecret }: any): Promise<Response>;
    getAuthorizationUrl({ params }: any): string;
    private signedFetch;
}
/** Request mixin with OAuth utilities. */
export declare type OAuthMixin = {
    oauth: OAuthFlow;
};
export {};
