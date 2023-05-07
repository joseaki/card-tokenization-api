import { getCommerceByPk } from "@database/mongo/repository/commerce.repository";

export const validateauthorization = () => {
  const customMiddlewareBefore = async ({ event }) => {
    if (!event.headers.authorization) {
      throw new Error("No autorizado");
    } else {
      const commerce = await getCommerceByPk(event.headers.authorization);
      if (!commerce) {
        throw new Error("No autorizado");
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
