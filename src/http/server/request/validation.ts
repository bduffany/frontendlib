import { BaseRequest } from '../pipeline';
import { HttpStatusError } from '../pipeline/error';

export function requireQueryParams<T extends BaseRequest>(
  params: string[],
  req: T
) {
  for (const param of params) {
    if (!req.query[param]) {
      throw new HttpStatusError(400, `Missing required query param: ${param}`);
    }
  }
}
