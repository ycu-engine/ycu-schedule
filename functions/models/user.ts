import { TableSchema } from "~/resources/dynamodb"
import { Course, Period, Week } from "./course"
import { ObjectType } from "./type"

export type MyCourseKey = `${Week}#${Period}`
export type MyCourse = Partial<Record<MyCourseKey, Course["id"]>>

export type User = {
  [TableSchema.id]: string
  [TableSchema.typeName]: typeof ObjectType.User
  createdAt: number
  updatedAt: number
  myCourse: MyCourse
}
