import { environment } from "~functions/env"
import { AWS_Function } from "~libs/apiGateway"
import { handlerPath } from "~libs/handlerResolver"

export const news__id: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment,
  events: [
    {
      http: {
        method: "get",
        path: "news/{id}",
      },
    },
  ],
}
