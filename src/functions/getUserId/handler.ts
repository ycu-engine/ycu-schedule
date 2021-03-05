import "source-map-support/register"
import { getUserIdByToken } from "src/service/auth"
import type { ValidatedEventAPIGatewayProxyEvent } from "~libs/apiGateway"
import { formatJSONResponse } from "~libs/apiGateway"
import { middyfy } from "~libs/lambda"
import schema from "./schema"

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const tableName = process.env.tableName
  const userId = await getUserIdByToken(event.body.token)
  return formatJSONResponse({
    message: {
      tableName,
      userId,
    },
  })
}

export const main = middyfy(hello)
