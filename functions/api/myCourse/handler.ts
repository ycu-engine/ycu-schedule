import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/functions/libs/apiGateway"
import { formatJSONResponse } from "~/functions/libs/apiGateway"
import { middyfy } from "~/functions/libs/lambda"
import { listCourseByIds } from "~/functions/repository/cource"
import { getUser } from "~/functions/repository/user"
import { getUserIdByToken } from "~/functions/service/auth"
import schema from "./schema"

const myCourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const userId = await getUserIdByToken(event.body.token)
  const user = await getUser({ id: userId })
  const courses = await listCourseByIds({ ids: Object.values(user.myCourse) })
  return formatJSONResponse(
    Object.fromEntries(
      Object.keys(user.myCourse).map((key) => [
        key,
        courses.find((course) => course.id === user.myCourse[key]),
      ])
    )
  )
}

export const main = middyfy(myCourse)
