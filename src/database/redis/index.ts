import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URI,
});

export default client;
