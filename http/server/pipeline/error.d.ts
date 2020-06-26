import { ErrorHandler } from '.';
/**
 * An error that should result in the given HTTP status code
 * being sent back to the client.
 */
export declare class HttpStatusError extends Error {
    code: number;
    readonly responseContentType: string;
    constructor(code: number, message?: string, { responseContentType }?: {
        responseContentType?: string | undefined;
    });
}
/**
 * Framework-level error handler.
 */
export declare const baseErrorHandler: ErrorHandler;
