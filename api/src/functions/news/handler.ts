import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/api/libs/apiGateway"
import { formatJSONResponse } from "~/api/libs/apiGateway"
import { middyfy } from "~/api/libs/lambda"
import { listNews } from "~/api/repository/news"
import schema from "./schema"

const news: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const news = await listNews()
  return formatJSONResponse(news)
}

export const main = middyfy(news)
