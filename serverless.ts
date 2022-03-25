import type { AWS } from "@serverless/typescript"
import { region, service, stage, variables } from "~/meta"
import cloudfront from "~/resources/cloudfront"
import s3 from "~/resources/s3"

const provider: AWS["provider"] = {
  name: "aws",
  runtime: "nodejs12.x",
  region,
  stage,
  apiGateway: {
    minimumCompressionSize: 1024,
    shouldStartNameWithService: true,
  },
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
  },
  lambdaHashingVersion: "20201221",
}

const serverlessConfiguration: AWS = {
  service,
  frameworkVersion: "2",
  provider,
  package: {
    individually: true,
  },
  custom: {
    variables,
    ...(s3.custom || {}),
    ...(cloudfront.custom || {}),
    webpack: {
      webpackConfig: "./webpack.config.js",
      // includeModules: true,
    },
    "serverless-offline": {
      httpPort: 4000,
    },
    output: {
      file: "web/src/info.json",
      hooks: ["after:info:info"],
    },
  },
  resources: {
    Resources: {
      ...(s3.resources || {}),
      ...(cloudfront.resources || {}),
    },
    Outputs: {
      ...(s3.Outputs || {}),
      ...(cloudfront.Outputs || {}),
    },
  },
  plugins: [
    ...(s3.plugins || []),
    ...(cloudfront.plugins || []),
    "serverless-webpack",
    "serverless-offline",
    "@ycu-engine/serverless-stack-output",
  ],
}

module.exports = serverlessConfiguration
