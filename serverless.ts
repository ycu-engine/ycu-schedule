import hello from '@functions/hello'
import type { AWS } from '@serverless/typescript'

const service = 'ycu-schedule'
const region = 'ap-northeast-1'
const stage = process.env.AWS_STAGE || 'dev'
const tableName = `${service}-${stage}`

const TableSchema = {
  typeName: 'typeName',
  id: 'id',
  createdAt: 'createdAt',
  weekPeriodCode: 'weekPeriodCode',
  codeWeekPeriod: 'codeWeekPeriod'
} as const

const TableIndexes = {
  byCreatedAt: 'byCreatedAt',
  byWeekByPeriodByCode: 'byWeekByPeriodByCode',
  byCodeByWeekByPeriod: 'byCodeByWeekByPeriod'
} as const

const AttributeTypes = {
  S: 'S',
  N: 'N'
} as const

const KeyType = {
  HASH: 'HASH',
  RANGE: 'RANGE'
} as const

const ProjectionType = {
  KEYS_ONLY: 'KEYS_ONLY'
} as const

const serverlessConfiguration: AWS = {
  service,
  frameworkVersion: '2',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region,
    stage,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    lambdaHashingVersion: '20201221'
  },
  custom: {
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true
      },
      seed: {
        sample: {
          sources: [
            {
              table: tableName,
              sources: [
                './seed/sample-user.json',
                './seed/sample-news.json',
                './seed/sample-course.json'
              ]
            }
          ]
        }
      }
    },
    capacities: [
      {
        tableName: tableName,
        index: [
          TableIndexes.byCreatedAt,
          TableIndexes.byWeekByPeriodByCode,
          TableIndexes.byCodeByWeekByPeriod
        ],
        read: {
          minimum: 5, // Minimum read capacity
          maximum: 1000, // Maximum read capacity
          usage: 0.75 // Targeted usage percentage
        },
        write: {
          minimum: 40, // Minimum write capacity
          maximum: 200, // Maximum write capacity
          usage: 0.5 // Targeted usage percentage
        }
      }
    ],
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  functions: { hello },
  resources: {
    Resources: {
      YcuSchedule: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: tableName,
          AttributeDefinitions: [
            {
              AttributeName: TableSchema.typeName,
              AttributeType: AttributeTypes.S
            },
            {
              AttributeName: TableSchema.id,
              AttributeType: AttributeTypes.S
            },
            {
              AttributeName: TableSchema.createdAt,
              AttributeType: AttributeTypes.N
            },
            {
              AttributeName: TableSchema.weekPeriodCode,
              AttributeType: AttributeTypes.S
            },
            {
              AttributeName: TableSchema.codeWeekPeriod,
              AttributeType: AttributeTypes.S
            }
          ],
          KeySchema: [
            {
              AttributeName: TableSchema.typeName,
              KeyType: KeyType.HASH
            },
            {
              AttributeName: TableSchema.id,
              KeyType: KeyType.RANGE
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          },
          LocalSecondaryIndexes: [
            {
              IndexName: TableIndexes.byCreatedAt,
              KeySchema: [
                { AttributeName: TableSchema.typeName, KeyType: KeyType.HASH },
                { AttributeName: TableSchema.createdAt, KeyType: KeyType.RANGE }
              ],
              Projection: { ProjectionType: ProjectionType.KEYS_ONLY }
            },
            {
              IndexName: TableIndexes.byWeekByPeriodByCode,
              KeySchema: [
                { AttributeName: TableSchema.typeName, KeyType: KeyType.HASH },
                {
                  AttributeName: TableSchema.weekPeriodCode,
                  KeyType: KeyType.RANGE
                }
              ],
              Projection: { ProjectionType: ProjectionType.KEYS_ONLY }
            },
            {
              IndexName: TableIndexes.byCodeByWeekByPeriod,
              KeySchema: [
                { AttributeName: TableSchema.typeName, KeyType: KeyType.HASH },
                {
                  AttributeName: TableSchema.codeWeekPeriod,
                  KeyType: KeyType.RANGE
                }
              ],
              Projection: { ProjectionType: ProjectionType.KEYS_ONLY }
            }
          ]
        }
      }
    }
  },
  plugins: [
    'serverless-dynamodb-local',
    'serverless-dynamodb-autoscaling',
    'serverless-webpack'
  ]
}

module.exports = serverlessConfiguration
