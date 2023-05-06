import * as Joi from "joi";
import { NotFoundError, UnauthorizedError } from "./error";

export enum ValidateFrom {
  BODY = "BODY",
  PARAMS = "PARAMS",
  QUERY = "QUERY",
}

export const validateSchema = (
  schemaToValidate: Joi.ObjectSchema<any>,
  validate = ValidateFrom.BODY
) => {
  const customMiddlewareBefore = async ({ event }) => {
    let resp: Joi.ValidationResult;
    if (validate === ValidateFrom.BODY) {
      resp = schemaToValidate.validate(event.body);
    } else if (validate === ValidateFrom.PARAMS) {
      resp = schemaToValidate.validate(event.pathParameters);
    } else if (validate === ValidateFrom.QUERY) {
      resp = schemaToValidate.validate(event.queryStringParameters);
    }
    if (!resp) throw new Error("Invalid parameters");
    if (resp.error) throw new Error(resp.error.message);
  };

  const customMiddlewareAfter = async (request) => {
    const { response } = request;
    request.response = response;
  };

  const customMiddlewareOnError = async (request) => {
    let statusCode = 412;

    if (request.error instanceof NotFoundError) {
      statusCode = 404;
    } else if (request.error instanceof UnauthorizedError) {
      statusCode = 403;
    }

    if (request.error) {
      request.response = {
        statusCode,
        body: JSON.stringify({
          message: request.error.message,
        }),
      };
    }
    if (request.response === undefined) return;
    return customMiddlewareAfter(request);
  };

  return {
    before: customMiddlewareBefore,
    after: customMiddlewareAfter,
    onError: customMiddlewareOnError,
  };
};
