declare const HASH_FUNCTIONS: {
    "HMAC-SHA1"(base_string: string, key: string): string;
};
export declare function getOAuthFlow({ consumerKey, consumerSecret, requestTokenUrl, accessTokenUrl, authorizationUrl, refreshTokenUrl, signatureMethod, }: {
    consumerKey: string;
    consumerSecret: string;
    requestTokenUrl: string;
    accessTokenUrl: string;
    refreshTokenUrl: string;
    authorizationUrl: string;
    callback?: string;
    signatureMethod?: keyof typeof HASH_FUNCTIONS;
}): {
    requestToken({ method, callback }?: any): Promise<Response>;
    accessToken({ method, oauthToken, oauthTokenSecret, oauthVerifier, }?: any): Promise<Response>;
    refreshToken({ method, oauthAccessToken, oauthAccessTokenSecret, }?: any): Promise<Response>;
    getAuthorizationUrl({ params }: any): string;
};
export {};
