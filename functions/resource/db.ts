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
