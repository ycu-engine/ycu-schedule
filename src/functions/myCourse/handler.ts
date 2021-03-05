import "source-map-support/register"
import { listCourseByIds } from "src/repository/cource"
import { getUser } from "src/repository/user"
import { getUserIdByToken } from "src/service/auth"
import type { ValidatedEventAPIGatewayProxyEvent } from "~libs/apiGateway"
import { formatJSONResponse } from "~libs/apiGateway"
import { middyfy } from "~libs/lambda"
import schema from "./schema"

const myCourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const userId = await getUserIdByToken(event.body.token)
  const user = await getUser({ id: userId })
  const courses = await listCourseByIds({ ids: Object.values(user.myCourse) })
  return formatJSONResponse({
    myCourse: Object.fromEntries(
      Object.keys(user.myCourse).map((key) => [
        key,
        courses.find((course) => course.id === user.myCourse[key]),
      ])
    ),
  })
}

export const main = middyfy(myCourse)
