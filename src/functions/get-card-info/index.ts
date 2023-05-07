import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 256,
  timeout: 5,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/get-card-info/{cardToken}",
      },
    },
  ],
};
