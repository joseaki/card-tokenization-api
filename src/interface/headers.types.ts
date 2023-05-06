import { APIGatewayProxyEventHeaders } from "aws-lambda";

export interface IHeaders extends APIGatewayProxyEventHeaders {
  Authorization?: string;
}
