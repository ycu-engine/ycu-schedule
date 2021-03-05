import { environment } from "~functions/env"
import { AWS_Function } from "~libs/apiGateway"
import { handlerPath } from "~libs/handlerResolver"
import schema from "./schema"

export const myCourse: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment,
  events: [
    {
      http: {
        method: "get",
        path: "myCourse",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
