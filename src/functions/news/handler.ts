import "source-map-support/register"
import { listNews } from "src/repository/news"
import type { ValidatedEventAPIGatewayProxyEvent } from "~libs/apiGateway"
import { formatJSONResponse } from "~libs/apiGateway"
import { middyfy } from "~libs/lambda"
import schema from "./schema"

const news: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const news = await listNews()
  return formatJSONResponse(news)
}

export const main = middyfy(news)
