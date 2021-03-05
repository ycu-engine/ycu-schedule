import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/functions/libs/apiGateway"
import { formatJSONResponse } from "~/functions/libs/apiGateway"
import { middyfy } from "~/functions/libs/lambda"
import { getNews } from "~/functions/repository/news"
import schema from "./schema"

const news: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const news = await getNews({ id: event.pathParameters.id })
  return formatJSONResponse(news)
}

export const main = middyfy(news)
