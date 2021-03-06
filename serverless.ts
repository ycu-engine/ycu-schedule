import type { AWS } from "@serverless/typescript"
import * as functions from "~/functions/api"
import { region, service, stage, tableName, variables } from "~/meta"
import db from "~/resources/dynamodb"
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
  iam: {
    role: {
      statements: [
        {
          Effect: "Allow",
          Action: [
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:BatchGetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: `arn:aws:dynamodb:${region}:*:table/${tableName}*`,
        },
      ],
    },
  },
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
    ...(db.custom || {}),
    ...(s3.custom || {}),
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    "serverless-offline": {
      httpPort: 4000,
    },
    output: {
      handler: "output-handler.handler",
      file: "web/src/info.json",
      hooks: ["after:info:info"],
    },
  },
  functions,
  resources: {
    Resources: {
      db: db.resource,
      s3: s3.resource,
    },
  },
  plugins: [
    ...(db.plugins || []),
    ...(s3.plugins || []),
    "serverless-webpack",
    "serverless-offline",
    "@ycu-engine/serverless-stack-output",
  ],
}

module.exports = serverlessConfiguration
