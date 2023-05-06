import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";

type ValidatedAPIGatewayProxyEvent<S, T> = Omit<
  APIGatewayProxyEvent,
  "body" | "pathParameters"
> & {
  body: S;
  pathParameters: T;
};
export type ValidatedEventAPIGatewayProxyEvent<S, T = any> = Handler<
  ValidatedAPIGatewayProxyEvent<S, T>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const formatUnauthorizedResponse = (
  response: Record<string, unknown>
) => {
  return {
    statusCode: 401,
    body: JSON.stringify(response),
  };
};

export const formatNotFoundResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 404,
    body: JSON.stringify(response),
  };
};
