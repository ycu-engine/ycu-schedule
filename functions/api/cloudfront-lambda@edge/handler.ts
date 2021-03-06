import type { Handler } from "aws-lambda"
import "source-map-support/register"
import { middyfy } from "~/functions/libs/lambda"

const cloudfrontLambdaAtEdge: Handler = (event, _, callback) => {
  const response = event.Records[0].cf.response
  const headers = response.headers

  headers["x-serverless-time"] = [
    { key: "x-serverless-time", value: Date.now().toString() },
  ]

  return callback(null, response)
}

export const main = middyfy(cloudfrontLambdaAtEdge)
