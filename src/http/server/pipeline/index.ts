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
export type RequestProcessor<
  Req extends BaseRequest = BaseRequest,
  Res extends BaseResponse = BaseResponse
> = (req: Req, res: Res, next?: Function) => void | any;

export type ErrorHandler<
  Req extends BaseRequest = BaseRequest,
  Res extends BaseResponse = BaseResponse
> = (req: Req, res: Res, exception: any) => void | any;

/** Builder for a request processing pipeline. */
export class RequestProcessingPipelineBuilder<
  Req extends BaseRequest = BaseRequest,
  Res extends BaseResponse = BaseResponse
> {
  private readonly before: RequestProcessor<Req, Res>[] = [];
  private readonly after: RequestProcessor<Req, Res>[] = [];
  private readonly errorHandlers: ErrorHandler<Req, Res>[] = [];

  /** Adds processors to run before the main request processor. */
  addPreProcessors(...processors: RequestProcessor<Req, Res>[]) {
    for (const processor of processors) {
      this.before.push(processor);
    }
    return this;
  }

  /** Adds processors to run after the main request processor. */
  addPostProcessors(...processors: RequestProcessor<Req, Res>[]) {
    for (const processor of processors) {
      this.after.push(processor);
    }
    return this;
  }

  /**
   * Adds error handlers to the pipeline.
   *
   * Error handlers are run if any middleware throws an error.
   */
  addErrorHandlers(...handlers: ErrorHandler<Req, Res>[]) {
    for (const handler of handlers) {
      this.errorHandlers.push(handler);
    }
    return this;
  }

  /**
   * Converts the pipeline to middleware compatible with connect and
   * related frameworks (express, Next.js).
   */
  build(main: RequestProcessor<Req, Res>): RequestProcessor<Req, Res> {
    return async (req: Req, res: Res, next?: Function) => {
      const processors = [...this.before, main, ...this.after];
      for (const processor of processors) {
        try {
          const result = await runProcessor(processor, req, res);
        } catch (e) {
          let handled = false;
          for (const handler of this.errorHandlers) {
            try {
              handler(req, res, e);
              handled = true;
              break;
            } catch (e) {
              continue;
            }
          }
          if (handled) return;
          if (next) {
            next(e);
          } else {
            throw e;
          }
        }
      }
      if (next) next();
    };
  }
}

/**
 * Runs the given processor, returning a promise that resolves when
 * the processor is finished running, and rejects if the processor
 * encounters an internal error or explicitly calls "next" with an
 * error object.
 */
export async function runProcessor<
  Req extends BaseRequest,
  Res extends BaseResponse
>(processor: RequestProcessor<Req, Res>, req: Req, res: Res): Promise<void> {
  await new Promise((resolve, reject) => {
    let resolved = false;
    let rejected = false;
    const returnValue = processor(req, res, (error: any) => {
      if (error) {
        if (!rejected) {
          rejected = true;
          reject(error);
        }
      } else if (!resolved) {
        resolved = true;
        resolve();
      }
    });
    if (returnValue instanceof Promise) {
      returnValue
        .then((value) => {
          if (!resolved) resolve(value);
        })
        .catch((e) => {
          if (!rejected) reject(e);
        });
    }
  });
}
