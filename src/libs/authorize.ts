import { getCommerceByPk } from "@database/mongo/repository/commerce.repository";

export const validateAuthorization = () => {
  const customMiddlewareBefore = async ({ event }) => {
    if (!event.headers.Authorization) {
      throw new Error("Unauthorized");
    } else {
      const commerce = await getCommerceByPk(event.headers.Authorization);
      if (!commerce) {
        throw new Error("Unauthorized");
      }
    }
  };

  const customMiddlewareAfter = async (request) => {
    const { response } = request;
    request.response = response;
  };

  const customMiddlewareOnError = async (request) => {
    if (request.error) {
      request.response = {
        statusCode: 401,
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
