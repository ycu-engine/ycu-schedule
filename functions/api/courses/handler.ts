import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/functions/libs/apiGateway"
import { formatJSONResponse } from "~/functions/libs/apiGateway"
import { middyfy } from "~/functions/libs/lambda"
import { listCourse } from "~/functions/repository/cource"
import { isAuthenticated } from "~/functions/service/auth"
import schema from "./schema"

const courses: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  isAuthenticated(event.body.token)
  const courses = await listCourse(event.body)
  return formatJSONResponse(courses)
}

export const main = middyfy(courses)
