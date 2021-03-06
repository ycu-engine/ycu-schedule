import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import type { Context, Handler } from "aws-lambda"

export const middyfy = (
  handler: Handler
): middy.Middy<unknown, unknown, Context> => {
  return middy(handler).use(middyJsonBodyParser())
}
