import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/functions/libs/apiGateway"
import { formatJSONResponse } from "~/functions/libs/apiGateway"
import { middyfy } from "~/functions/libs/lambda"
import { listCourseByCode } from "~/functions/repository/cource"
import { isAuthenticated } from "~/functions/service/auth"
import schema from "./schema"

const coursesByCode: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  isAuthenticated(event.body.token)
  const courses = await listCourseByCode(event.body)
  return formatJSONResponse(courses)
}

export const main = middyfy(coursesByCode)
