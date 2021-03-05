import "source-map-support/register"
import { listCourseByCode } from "src/repository/cource"
import { isAuthenticated } from "src/service/auth"
import type { ValidatedEventAPIGatewayProxyEvent } from "~libs/apiGateway"
import { formatJSONResponse } from "~libs/apiGateway"
import { middyfy } from "~libs/lambda"
import schema from "./schema"

const coursesByCode: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  isAuthenticated(event.body.token)
  const courses = await listCourseByCode(event.body)
  return formatJSONResponse({
    courses,
  })
}

export const main = middyfy(coursesByCode)
