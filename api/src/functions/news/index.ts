import { environment } from "~/api/functions/env"
import { AWS_Function } from "~/api/libs/apiGateway"
import { handlerPath } from "~/api/libs/handlerResolver"

export const news: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment,
  events: [
    {
      http: {
        method: "get",
        path: "news",
      },
    },
  ],
}
