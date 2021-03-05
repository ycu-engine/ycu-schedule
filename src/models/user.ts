import { TableSchema } from "~resource/db"
import { Course, Period, Week } from "./course"
import { ObjectType } from "./type"

type MyCourseKey<T extends Week, K extends Period> = `${T}#${K}`
type MyCourse = Partial<Record<MyCourseKey<Week, Period>, Course["id"]>>

export type User = {
  [TableSchema.id]: string
  [TableSchema.typeName]: typeof ObjectType.User
  [TableSchema.createdAt]: number
  updatedAt: number
  myCourse: MyCourse
}
