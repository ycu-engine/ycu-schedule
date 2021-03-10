import type { AWS } from "@serverless/typescript"
import * as functions from "~/functions/api"
import { region, service, stage, tableName, variables } from "~/meta"
import cloudfront from "~/resources/cloudfront"
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
  // cloudFront: {
  //   cachePolicies: {
  //     [cloudfrontCachePolicy]: {
  //       MinTTL: 1,
  //       MaxTTL: 86400,
  //       DefaultTTL: 31536000,
  //       ParametersInCacheKeyAndForwardedToOrigin: {
  //         CookiesConfig: {
  //           CookieBehavior: "none",
  //         },
  //         EnableAcceptEncodingGzip: true,
  //         EnableAcceptEncodingBrotli: true,
  //         HeadersConfig: {
  //           HeaderBehavior: "none",
  //         },
  //         QueryStringsConfig: {
  //           QueryStringBehavior: "none",
  //         },
  //       },
  //     },
  //   },
  // },
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
    ...(cloudfront.custom || {}),
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    "serverless-offline": {
      httpPort: 4000,
    },
    output: {
      file: "web/src/info.json",
      hooks: ["after:info:info"],
    },
  },
  functions,
  resources: {
    Resources: {
      ...(db.resources || {}),
      ...(s3.resources || {}),
      ...(cloudfront.resources || {}),
    },
    Outputs: {
      ...(db.Outputs || {}),
      ...(s3.Outputs || {}),
      ...(cloudfront.Outputs || {}),
    },
  },
  plugins: [
    ...(db.plugins || []),
    ...(s3.plugins || []),
    ...(cloudfront.plugins || []),
    "serverless-webpack",
    "serverless-offline",
    "@ycu-engine/serverless-stack-output",
  ],
}

module.exports = serverlessConfiguration
