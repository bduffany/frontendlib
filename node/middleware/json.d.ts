/**
 * Middleware which adds developer tooling for JSON APIs.
 *
 * Specifically, it ensures that all API responses adhere to a strict schema.
 * @param req
 * @param res
 * @param next
 */
export declare function jsonApiSchemaValidationMiddleware(_: any, res: any, next: Function): void;
/**
 * Validates API responses during development to ensure they adhere to a consistent
 * format.
 */
export declare function validateJsonApiResponse(responseText: string): void;
