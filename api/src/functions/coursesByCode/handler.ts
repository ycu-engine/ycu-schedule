import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/api/libs/apiGateway"
import { formatJSONResponse } from "~/api/libs/apiGateway"
import { middyfy } from "~/api/libs/lambda"
import { listCourseByCode } from "~/api/repository/cource"
import { isAuthenticated } from "~/api/service/auth"
import schema from "./schema"

const coursesByCode: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  isAuthenticated(event.body.token)
  const courses = await listCourseByCode(event.body)
  return formatJSONResponse(courses)
}

export const main = middyfy(coursesByCode)
