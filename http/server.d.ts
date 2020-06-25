/**
 * Server infrastructure for handling HTTP requests.
 */
/** Function that processes an HTTP request. */
export declare type RequestProcessor<Req, Res> = (req: Req, res: Res, next?: Function) => any;
/** Builder for a request processing pipeline. */
export declare class RequestProcessingPipelineBuilder<Req, Res> {
    private readonly before;
    private readonly after;
    /** Adds processors to run before the main request processor. */
    addPreProcessors(...processors: RequestProcessor<Req, Res>[]): void;
    /** Adds processors to run after the main request processor. */
    addPostProcessors(...processors: RequestProcessor<Req, Res>[]): void;
    /**
     * Converts the pipeline to middleware compatible with connect and
     * related frameworks (express, Next.js).
     */
    toMiddleware(main: RequestProcessor<Req, Res>): RequestProcessor<Req, Res>;
}
/**
 * Runs the given processor, returning a promise that resolves when
 * the processor is finished running, and rejects if the processor
 * encounters an internal error or explicitly calls "next" with an
 * error object.
 */
export declare function runProcessor<Req, Res>(processor: RequestProcessor<Req, Res>, req: Req, res: Res): Promise<void>;
