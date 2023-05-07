export const validatorErrorHandler = () => {
  const customMiddlewareAfter = async (request) => {
    const { response } = request;
    request.response = response;
  };

  const customMiddlewareOnError = async (request) => {
    if (request.error) {
      request.response = JSON.stringify({
        statusCode: 412,
        body: JSON.stringify({
          message: request.error.message,
        }),
      });
    }
    if (request.response === undefined) return;
    return customMiddlewareAfter(request);
  };

  return {
    after: customMiddlewareAfter,
    onError: customMiddlewareOnError,
  };
};
