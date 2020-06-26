import { BaseRequest } from '../pipeline';
export declare function requireQueryParams<T extends BaseRequest>(params: string[], req: T): void;
