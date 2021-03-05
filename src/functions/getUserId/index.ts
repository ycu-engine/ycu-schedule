import { tableNameRef } from "~/meta"
import { AWS_Function } from "~libs/apiGateway"
import { handlerPath } from "~libs/handlerResolver"
import schema from "./schema"

export const userId: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    tableName: tableNameRef,
  },
  events: [
    {
      http: {
        method: "post",
        path: "userId",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
}
