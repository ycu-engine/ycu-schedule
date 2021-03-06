import "source-map-support/register"
import type { ValidatedEventAPIGatewayProxyEvent } from "~/functions/libs/apiGateway"
import { formatJSONResponse } from "~/functions/libs/apiGateway"
import { notUndefined } from "~/functions/libs/filter"
import { middyfy } from "~/functions/libs/lambda"
import type { MyCourseKey } from "~/functions/models/user"
import { listCourseByIds } from "~/functions/repository/cource"
import { getUser } from "~/functions/repository/user"
import { getUserIdByToken } from "~/functions/service/auth"
import schema from "./schema"

const myCourse: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const userId = await getUserIdByToken(event.body.token)
  const user = await getUser({ id: userId })
  const courses = await listCourseByIds({
    ids: Object.values(user.myCourse).filter(notUndefined),
  })
  return formatJSONResponse(
    Object.fromEntries(
      (Object.keys(user.myCourse) as MyCourseKey[]).map((key) => [
        key,
        courses.find((course) => course.id === user.myCourse[key]),
      ])
    )
  )
}

export const main = middyfy(myCourse)
