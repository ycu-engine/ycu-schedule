import { tableName } from "~/meta"
import { Serverless } from "./type"

export const TableSchema = {
  typeName: "typeName",
  id: "id",
  createdAt: "createdAt",
  weekPeriodCode: "weekPeriodCode",
  codeWeekPeriod: "codeWeekPeriod",
} as const

export const TableIndexes = {
  byCreatedAt: "byCreatedAt",
  byWeekByPeriodByCode: "byWeekByPeriodByCode",
  byCodeByWeekByPeriod: "byCodeByWeekByPeriod",
} as const

const AttributeTypes = {
  S: "S",
  N: "N",
} as const

const KeyType = {
  HASH: "HASH",
  RANGE: "RANGE",
} as const

const ProjectionType = {
  KEYS_ONLY: "KEYS_ONLY",
} as const

const serverless: Serverless = {
  plugins: ["serverless-dynamodb-local", "serverless-dynamodb-autoscaling"],
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 7000,
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
                "./resources/seed/sample-user.json",
                "./resources/seed/sample-news.json",
                "./resources/seed/sample-course.json",
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
  },
  resource: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: tableName,
      AttributeDefinitions: [
        {
          AttributeName: TableSchema.typeName,
          AttributeType: AttributeTypes.S,
        },
        {
          AttributeName: TableSchema.id,
          AttributeType: AttributeTypes.S,
        },
        {
          AttributeName: TableSchema.createdAt,
          AttributeType: AttributeTypes.N,
        },
        {
          AttributeName: TableSchema.weekPeriodCode,
          AttributeType: AttributeTypes.S,
        },
        {
          AttributeName: TableSchema.codeWeekPeriod,
          AttributeType: AttributeTypes.S,
        },
      ],
      KeySchema: [
        {
          AttributeName: TableSchema.typeName,
          KeyType: KeyType.HASH,
        },
        {
          AttributeName: TableSchema.id,
          KeyType: KeyType.RANGE,
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      LocalSecondaryIndexes: [
        {
          IndexName: TableIndexes.byCreatedAt,
          KeySchema: [
            { AttributeName: TableSchema.typeName, KeyType: KeyType.HASH },
            { AttributeName: TableSchema.createdAt, KeyType: KeyType.RANGE },
          ],
          Projection: { ProjectionType: ProjectionType.KEYS_ONLY },
        },
        {
          IndexName: TableIndexes.byWeekByPeriodByCode,
          KeySchema: [
            { AttributeName: TableSchema.typeName, KeyType: KeyType.HASH },
            {
              AttributeName: TableSchema.weekPeriodCode,
              KeyType: KeyType.RANGE,
            },
          ],
          Projection: { ProjectionType: ProjectionType.KEYS_ONLY },
        },
        {
          IndexName: TableIndexes.byCodeByWeekByPeriod,
          KeySchema: [
            { AttributeName: TableSchema.typeName, KeyType: KeyType.HASH },
            {
              AttributeName: TableSchema.codeWeekPeriod,
              KeyType: KeyType.RANGE,
            },
          ],
          Projection: { ProjectionType: ProjectionType.KEYS_ONLY },
        },
      ],
    },
  },
}

export default serverless
