import { environment } from "~/api/functions/env"
import { AWS_Function } from "~/api/libs/apiGateway"
import { handlerPath } from "~/api/libs/handlerResolver"
import schema from "./schema"

export const coursesByCode: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment,
  events: [
    {
      http: {
        method: "get",
        path: "coursesByCode",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
