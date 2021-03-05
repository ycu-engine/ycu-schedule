import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/api/libs/apiGateway"
import { formatJSONResponse } from "~/api/libs/apiGateway"
import { middyfy } from "~/api/libs/lambda"
import { listCourseByIds } from "~/api/repository/cource"
import { getUser } from "~/api/repository/user"
import { getUserIdByToken } from "~/api/service/auth"
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
