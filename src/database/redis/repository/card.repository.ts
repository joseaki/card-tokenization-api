import redisClient from "@database/redis";

redisClient.connect();

export const saveCreditCard = async (
  commercePK: string,
  uuid: string,
  creditCard: string
): Promise<void> => {
  await redisClient.set(`${commercePK}-${uuid}`, creditCard, {
    EX: 15 * 60,
  });
};

export const getCreditCard = async (
  commercePK: string,
  uuid: string
): Promise<string> => {
  return redisClient.get(`${commercePK}-${uuid}`);
};
