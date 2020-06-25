/**
 * Server infrastructure for handling HTTP requests.
 */

/** Function that processes a request. */
type RequestProcessor<Req, Res> = (req: Req, res: Res, next?: Function) => any;

export class RequestProcessingPipelineBuilder<Req, Res> {
  private readonly before: RequestProcessor<Req, Res>[] = [];
  private readonly after: RequestProcessor<Req, Res>[] = [];

  /** Adds processors to run before the main request processor. */
  addPreProcessors(...processors: RequestProcessor<Req, Res>[]) {
    for (const processor of processors) {
      this.before.push(processor);
    }
  }

  /** Adds processors to run after the main request processor. */
  addPostProcessors(...processors: RequestProcessor<Req, Res>[]) {
    for (const processor of processors) {
      this.after.push(processor);
    }
  }

  /**
   * Converts the pipeline to middleware compatible with connect and
   * related frameworks (express, Next.js).
   */
  toMiddleware(main: RequestProcessor<Req, Res>): RequestProcessor<Req, Res> {
    return async (req: Req, res: Res, next?: Function) => {
      const processors = [...this.before, main, ...this.after];
      for (const processor of processors) {
        try {
          await runProcessor(processor, req, res);
        } catch (e) {
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

export async function runProcessor<Req, Res>(
  processor: RequestProcessor<Req, Res>,
  req: Req,
  res: Res
): Promise<void> {
  await new Promise((resolve, reject) => {
    processor(req, res, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
