import type { AWS } from "@serverless/typescript"
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts"

export type AWS_Function = Exclude<AWS["functions"], undefined>[string]

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>
}
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>

export const formatJSONResponse = (
  response: Record<string, unknown>
): {
  statusCode: number
  body: string
} => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
