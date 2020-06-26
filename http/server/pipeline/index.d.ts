/** Base class for HTTP requests. */
export interface BaseRequest {
    query: Record<string, string | string[]>;
}
/** Base class for HTTP responses. */
export interface BaseResponse {
    headersSent: boolean;
    status: (statusCode: number) => void;
    /**
     * Sends a JSON response.
     *
     * May require middleware for some frameworks.
     */
    json: (value: any) => void;
    write: (value: any) => void;
    send: (value: any) => void;
    get?: (headerName: string) => string | null;
}
/**
 * Server infrastructure for handling HTTP requests.
 */
/** Function that processes an HTTP request. */
export declare type RequestProcessor<Req extends BaseRequest = BaseRequest, Res extends BaseResponse = BaseResponse> = (req: Req, res: Res, next?: Function) => void | any;
export declare type ErrorHandler<Req extends BaseRequest = BaseRequest, Res extends BaseResponse = BaseResponse> = (req: Req, res: Res, exception: any) => void | any;
/** Builder for a request processing pipeline. */
export declare class RequestProcessingPipelineBuilder<Req extends BaseRequest = BaseRequest, Res extends BaseResponse = BaseResponse> {
    private readonly before;
    private readonly after;
    private readonly errorHandlers;
    /** Adds processors to run before the main request processor. */
    addPreProcessors(...processors: RequestProcessor<Req, Res>[]): this;
    /** Adds processors to run after the main request processor. */
    addPostProcessors(...processors: RequestProcessor<Req, Res>[]): this;
    /**
     * Adds error handlers to the pipeline.
     *
     * Error handlers are run if any middleware throws an error.
     */
    addErrorHandlers(...handlers: ErrorHandler<Req, Res>[]): this;
    /**
     * Converts the pipeline to middleware compatible with connect and
     * related frameworks (express, Next.js).
     */
    build(main: RequestProcessor<Req, Res>): RequestProcessor<Req, Res>;
}
/**
 * Runs the given processor, returning a promise that resolves when
 * the processor is finished running, and rejects if the processor
 * encounters an internal error or explicitly calls "next" with an
 * error object.
 */
export declare function runProcessor<Req extends BaseRequest, Res extends BaseResponse>(processor: RequestProcessor<Req, Res>, req: Req, res: Res): Promise<void>;
