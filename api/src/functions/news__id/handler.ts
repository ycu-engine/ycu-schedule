import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/api/libs/apiGateway"
import { formatJSONResponse } from "~/api/libs/apiGateway"
import { middyfy } from "~/api/libs/lambda"
import { getNews } from "~/api/repository/news"
import schema from "./schema"

const news: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const news = await getNews({ id: event.pathParameters.id })
  return formatJSONResponse(news)
}

export const main = middyfy(news)
