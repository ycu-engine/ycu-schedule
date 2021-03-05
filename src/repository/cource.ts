import { Course } from "src/models/course"
import { ObjectType } from "src/models/type"
import { batchGet, getTableName, query } from "~/service/db"
import { TableIndexes, TableSchema } from "~resource/db"

export const listCourse = async ({
  week,
  period,
}: {
  week: number
  period: number
}): Promise<Course[]> => {
  if (typeof week !== "number" || typeof period !== "number") {
    throw Error("week and period must be number.")
  }
  if (week < 0 || 6 < week) {
    throw Error("week must be 0~6")
  }
  if (period < 1 || 7 < week) {
    throw Error("period must be 1~7")
  }
  const res = await query({
    TableName: getTableName(),
    IndexName: TableIndexes.byWeekByPeriodByCode,
    KeyConditionExpression: `${TableSchema.typeName} = :type and begins_with(${TableSchema.weekPeriodCode}, :weekPeriod)`,
    ExpressionAttributeValues: {
      ":type": ObjectType.Course,
      ":weekPeriod": `${week}#${period}#`,
    },
    Select: "ALL_ATTRIBUTES",
  })
  return res.Items as Course[]
}

export const listCourseByCode = async ({
  code,
}: {
  code: string
}): Promise<Course[]> => {
  if (typeof code !== "string") {
    throw Error("code must be string.")
  }
  const res = await query({
    TableName: getTableName(),
    IndexName: TableIndexes.byCodeByWeekByPeriod,
    KeyConditionExpression: `${TableSchema.typeName} = :type and begins_with(${TableSchema.codeWeekPeriod}, :code)`,
    ExpressionAttributeValues: {
      ":type": ObjectType.Course,
      ":code": `${code}#`,
    },
    Select: "ALL_ATTRIBUTES",
  })
  return res.Items as Course[]
}

export const listCourseByIds = async ({
  ids,
}: {
  ids: string[]
}): Promise<Course[]> => {
  if (!Array.isArray(ids)) {
    throw Error("ids must be array")
  }
  for (const id of ids) {
    if (typeof id !== "string") {
      throw Error("id must be string")
    }
  }
  if (ids.length !== new Set(ids).size) {
    throw Error("ids must be unique each other")
  }
  const res = await batchGet({
    RequestItems: {
      [getTableName()]: {
        Keys: ids.map((id) => ({
          [TableSchema.typeName]: ObjectType.Course,
          [TableSchema.id]: id,
        })),
      },
    },
  })
  const courses = res.Responses[getTableName()] as Course[]
  return ids.map((id) => courses.find((v) => v.id === id))
}
