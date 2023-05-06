import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { validatorErrorHandler } from "./validatorErrorHandler";
import httpErrorHandler from "@middy/http-error-handler";
import { ValidateFrom, validateSchema } from "./schemaValidator";
import * as Joi from "joi";
import { ValidatedEventAPIGatewayProxyEvent } from "./apiGateway";
import { validateAuthorization } from "./authorize";

export const publicMiddyfy = (
  handler: ValidatedEventAPIGatewayProxyEvent<any>,
  schemaToValidate: Joi.ObjectSchema<any> | undefined,
  validationFrom?: ValidateFrom
) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(validateSchema(schemaToValidate, validationFrom))
    .use(validatorErrorHandler())
    .use(httpErrorHandler());
};

export const middyfy = (
  handler: ValidatedEventAPIGatewayProxyEvent<any>,
  schemaToValidate: Joi.ObjectSchema<any> | undefined,
  validationFrom?: ValidateFrom
) => {
  return middy(handler)
    .use(validateAuthorization())
    .use(middyJsonBodyParser())
    .use(validatorErrorHandler())
    .use(validateSchema(schemaToValidate, validationFrom))
    .use(httpErrorHandler());
};
