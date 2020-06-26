import { ErrorHandler } from '.';
import { CLEAR_BODY_SCRIPT } from '../response/scripts';

const DEFAULT_MESSAGES = {
  400: 'Invalid request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
} as Record<number, string>;

/**
 * An error that should result in the given HTTP status code
 * being sent back to the client.
 */
export class HttpStatusError extends Error {
  public readonly responseContentType: string;

  constructor(
    public code: number,
    message: string = '',
    { responseContentType = 'application/json' } = {}
  ) {
    super(`${message || DEFAULT_MESSAGES[code] || 'Unknown error'}`);
    this.responseContentType = responseContentType;
  }
}

/**
 * Framework-level error handler.
 */
export const baseErrorHandler: ErrorHandler = (_, res, e) => {
  console.error(e);

  const responseContentType =
    (typeof e === 'object' && e?.responseContentType) ||
    (res.get && res.get('content-type')) ||
    null;
  if (!res.headersSent) {
    if (e instanceof HttpStatusError) {
      res.status(e.code);
    } else {
      res.status(500);
    }
  }
  if (responseContentType === 'application/json') {
    res.json({
      error: {
        message: e?.message || e?.toString() || 'Internal server error',
      },
    });
    return;
  }
  // Clear the existing page content to show the error instead.
  if (responseContentType === 'text/html') {
    res.write(CLEAR_BODY_SCRIPT);
  }
  const message = e?.message || e?.toString() || 'Internal server error';
  res.send(message);
};
