/**
 * Middleware which adds developer tooling for JSON APIs.
 *
 * Specifically, it ensures that all API responses adhere to a strict schema.
 * @param req
 * @param res
 * @param next
 */
export function jsonApiSchemaValidationMiddleware(
  _: any,
  res: any,
  next: Function
) {
  if (process.env.NODE_ENV !== 'development') {
    next();
    return;
  }
  const originalJson = res.json;
  if (!originalJson) {
    next();
    return;
  }

  res.json = (value: any) => {
    return originalJson(value);
  };

  next();
}

/**
 * Validates API responses during development to ensure they adhere to a consistent
 * format.
 */
export function validateJsonApiResponse(responseText: string) {
  let json: any;
  try {
    json = JSON.parse(responseText);
  } catch (e) {
    throw new Error('Response is not valid JSON.');
  }
  const { error, data } = json;
  if (!error && !data) {
    throw new Error(
      'JSON response must have either an "error" field or "data" field.'
    );
  }
  if (error) {
    requireFields(error, {
      message:
        'A descriptive error message targeted at developers to help them understand exactly why they are getting this error.',
      code:
        'An unambiguous error code that a user can check in their code to see whether they are getting this exact error.',
    });
    if (!error.code.includes('/')) {
      throw new Error(
        'Error codes should be of the format $category/[$...subcategories/]$specific-error-code, e.g. "auth/credentials-expired"'
      );
    }
  }
}

function requireFields(
  object: Record<string, any>,
  fields: Record<string, string>
) {
  const missing = [];
  for (const field of Object.keys(fields)) {
    if (!object[field]) {
      missing.push(field);
    }
  }
  if (missing.length) {
    console.error(`API responses should have the following fields:`);
    throw new Error(`Response is missing fields: [${missing.join(', ')}]`);
  }
}
