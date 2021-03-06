import { TableSchema } from "~/functions/resource/db"
import { Course, Period, Week } from "./course"
import { ObjectType } from "./type"

export type MyCourseKey = `${Week}#${Period}`
export type MyCourse = Partial<Record<MyCourseKey, Course["id"]>>

export type User = {
  [TableSchema.id]: string
  [TableSchema.typeName]: typeof ObjectType.User
  [TableSchema.createdAt]: number
  updatedAt: number
  myCourse: MyCourse
}
