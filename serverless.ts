import type { AWS } from "@serverless/typescript"
import * as functions from "~/functions/api"
import { region, service, stage, tableName } from "~/meta"
import db from "~/resources/dynamodb"

const provider: AWS["provider"] = {
  name: "aws",
  runtime: "nodejs14.x",
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
  custom: {
    variables: {
      region,
      service,
      stage,
      tableName,
    },
    ...(db.custom || {}),
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    "serverless-offline": {
      httpPort: 4000,
    },
  },
  functions,
  resources: {
    Resources: {
      db: db.resource,
    },
  },
  plugins: [...(db.plugins || []), "serverless-webpack", "serverless-offline"],
}

module.exports = serverlessConfiguration
