import type { AWS } from "@serverless/typescript"
import { region, service, stage, tableName } from "~/meta"
import * as functions from "~functions/index"
import { TableIndexes, YcuSchedule } from "~resource/db"

const serverlessConfiguration: AWS = {
  service,
  frameworkVersion: "2",
  provider: {
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
  },
  custom: {
    variables: {
      region,
      service,
      stage,
      tableName,
    },
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: "200m",
        heapMax: "1g",
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
      seed: {
        sample: {
          sources: [
            {
              table: tableName,
              sources: [
                "./seed/sample-user.json",
                "./seed/sample-news.json",
                "./seed/sample-course.json",
              ],
            },
          ],
        },
      },
    },
    capacities: [
      {
        tableName: tableName,
        index: [
          TableIndexes.byCreatedAt,
          TableIndexes.byWeekByPeriodByCode,
          TableIndexes.byCodeByWeekByPeriod,
        ],
        read: {
          minimum: 5, // Minimum read capacity
          maximum: 1000, // Maximum read capacity
          usage: 0.75, // Targeted usage percentage
        },
        write: {
          minimum: 40, // Minimum write capacity
          maximum: 200, // Maximum write capacity
          usage: 0.5, // Targeted usage percentage
        },
      },
    ],
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
      YcuSchedule,
    },
  },
  plugins: [
    "serverless-dynamodb-local",
    "serverless-dynamodb-autoscaling",
    "serverless-webpack",
    "serverless-offline",
  ],
}

module.exports = serverlessConfiguration
