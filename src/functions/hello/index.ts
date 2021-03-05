import { AWS_Function } from "~libs/apiGateway"
import { handlerPath } from "~libs/handlerResolver"
import schema from "./schema"

export const hello: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "hello",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
