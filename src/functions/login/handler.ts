import bcrypt from "bcryptjs";
import { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { publicMiddyfy } from "@libs/lambda";
import { getCommerceByUsername } from "@database/mongo/repository/commerce.repository";
import { ILoginRequest } from "src/interface/commerce.types";
import schema from "./schema";
import { NotFoundError, UnauthorizedError } from "@libs/error";

export const login = async (body: ILoginRequest) => {
  const commerce = await getCommerceByUsername(body.username);

  if (!commerce) throw new NotFoundError("Comercio no encontrado");

  const isValidUser = bcrypt.compareSync(body.password, commerce.password);

  if (!isValidUser) throw new UnauthorizedError("Credenciales inválidas");

  return {
    token: commerce.pk,
  };
};

export const handler: ValidatedEventAPIGatewayProxyEvent<
  ILoginRequest
> = async (event) => {
  const { body } = event;
  const data = await login(body);

  return formatJSONResponse({
    data,
  });
};

export const main = publicMiddyfy(handler, schema);
