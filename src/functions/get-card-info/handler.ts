import { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { ValidateFrom } from "@libs/schemaValidator";
import { decryptWithAES } from "@libs/encrypt";
import { middyfy } from "@libs/lambda";
import { getCreditCard } from "@database/redis/repository/card.repository";
import schema from "./schema";
import { ICardParams, ITokenizeRequest } from "src/interface/tokenize.types";
import { IHeaders } from "src/interface/headers.types";
import { NotFoundError } from "@libs/error";

export const getCardInfo = async (
  pathParameters: ICardParams,
  headers: IHeaders
): Promise<Omit<ITokenizeRequest, "cvv" | "email">> => {
  const { cardToken } = pathParameters;
  const tokenizedCard = await getCreditCard(headers.authorization, cardToken);

  if (!tokenizedCard) {
    throw new NotFoundError("Invalid or expired card token");
  }

  const cardText = decryptWithAES(tokenizedCard);
  const { cvv, email, commercePK, ...rest } = JSON.parse(cardText);

  return rest;
};

const handler: ValidatedEventAPIGatewayProxyEvent<{}, ICardParams> = async (
  event
) => {
  const { pathParameters, headers } = event;
  const data = await getCardInfo(pathParameters, headers);

  return formatJSONResponse({ data });
};

export const main = middyfy(handler, schema, ValidateFrom.PARAMS);
