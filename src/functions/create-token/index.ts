import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 256,
  timeout: 5,
  events: [
    {
      httpApi: {
        method: "post",
        path: "/create-token",
      },
    },
  ],
};
