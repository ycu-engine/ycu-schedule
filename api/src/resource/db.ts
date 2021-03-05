import type { AWS } from "@serverless/typescript"
import { tableName } from "~/api/meta"

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

export const YcuSchedule: AWS["resources"]["Resources"][string] = {
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
}
