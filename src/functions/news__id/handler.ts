import "source-map-support/register"
import { getNews } from "src/repository/news"
import type { ValidatedEventAPIGatewayProxyEvent } from "~libs/apiGateway"
import { formatJSONResponse } from "~libs/apiGateway"
import { middyfy } from "~libs/lambda"
import schema from "./schema"

const news: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const news = await getNews({ id: event.pathParameters.id })
  return formatJSONResponse({
    news,
  })
}

export const main = middyfy(news)
