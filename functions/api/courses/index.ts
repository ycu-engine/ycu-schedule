import { environment } from "~/functions/env"
import { AWS_Function } from "~/functions/libs/apiGateway"
import { handlerPath } from "~/functions/libs/handlerResolver"
import schema from "./schema"

export const courses: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment,
  events: [
    {
      http: {
        method: "get",
        path: "courses",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
