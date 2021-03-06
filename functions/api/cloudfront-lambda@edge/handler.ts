import type { Handler } from "aws-lambda"
import "source-map-support/register"

const cloudfrontLambdaAtEdge: Handler = (event, _, callback) => {
  const response = event.Records[0].cf.response
  const headers = response.headers

  headers["x-serverless-time"] = [
    { key: "x-serverless-time", value: Date.now().toString() },
  ]
  console.log("Hey")

  return callback(null, response)
}

export const main = cloudfrontLambdaAtEdge
