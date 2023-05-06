import redisClient from "@database/redis";
import { MOCK_CARD } from "../../../../tests/mockData";

redisClient.connect();

export const saveCreditCard = jest.fn();

export const getCreditCard = jest
  .fn()
  .mockResolvedValue(JSON.stringify(MOCK_CARD));
