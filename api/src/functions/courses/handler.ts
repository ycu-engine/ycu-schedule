import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/api/libs/apiGateway"
import { formatJSONResponse } from "~/api/libs/apiGateway"
import { middyfy } from "~/api/libs/lambda"
import { listCourse } from "~/api/repository/cource"
import { isAuthenticated } from "~/api/service/auth"
import schema from "./schema"

const courses: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  isAuthenticated(event.body.token)
  const courses = await listCourse(event.body)
  return formatJSONResponse(courses)
}

export const main = middyfy(courses)
