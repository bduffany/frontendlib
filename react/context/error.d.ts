import React, { Component } from 'react';
/** Represents an unhandled error. */
export interface UnhandledError {
    error: any;
    /** Imperatively clears the error field. */
    clearError: () => void;
}
export declare const ErrorContext: React.Context<UnhandledError | null>;
/**
 * Error boundary that catches synchronously thrown exceptions as well as unhandled promise
 * rejections.
 */
export default class ErrorContextProvider extends Component<{
    children: any;
}> {
    state: {
        caughtException: any;
    };
    onComponentDidCatch(e: any): void;
    render(): JSX.Element;
}
export declare const UnhandledRejectionContext: React.Context<any>;
/**
 * Allows accessing the last unhandled promise rejection via
 * UnhandledRejectionContext.
 *
 * This enables the capability of providing generic error handlers at the
 * top level of the app.
 */
export declare function UnhandledRejectionContextProvider({ children }: any): JSX.Element;
