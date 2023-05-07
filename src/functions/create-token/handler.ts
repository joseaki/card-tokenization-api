import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { generateRandomString } from "@libs/stringUtility";
import { encryptWithAES } from "@libs/encrypt";
import {
  getCreditCard,
  saveCreditCard,
} from "@database/redis/repository/card.repository";
import { ITokenizeRequest } from "src/interface/tokenize.types";
import schema from "./schema";
import { IHeaders } from "src/interface/headers.types";

const getUUID = async (commercePK: string, attempts = 5) => {
  if (attempts == 0) {
    throw new Error("Error generando una UUID");
  }
  const uuid = generateRandomString(16);
  const data = await getCreditCard(commercePK, uuid);
  if (data) {
    return getUUID(commercePK, attempts - 1);
  }
  return uuid;
};

export const insertCreditCard = async (
  body: ITokenizeRequest,
  headers: IHeaders
) => {
  const cardDetails = JSON.stringify({
    ...body,
    expiration_month: body.expiration_month.toString(),
    expiration_year: body.expiration_year.toString(),
  });
  const encryptedText = encryptWithAES(cardDetails);

  const uuid = await getUUID(headers.authorization);
  await saveCreditCard(headers.authorization, uuid, encryptedText);

  return {
    token: uuid,
  };
};

const handler: ValidatedEventAPIGatewayProxyEvent<ITokenizeRequest> = async (
  event
) => {
  const { body, headers } = event;
  const data = await insertCreditCard(body, headers);
  return formatJSONResponse({
    data,
  });
};

export const main = middyfy(handler, schema);
