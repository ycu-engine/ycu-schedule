import { TableSchema } from "~resource/db"
import { ObjectType } from "./type"

/**
 * week:
 *   日曜日: 0
 *   月曜日: 1
 *   火曜日: 2
 *   水曜日: 3
 *   木曜日: 4
 *   金曜日: 5
 *   土曜日: 6
 * period:
 *   1時限目: 1
 *   2時限目: 2
 *   3時限目: 3
 *   4時限目: 4
 *   5時限目: 5
 *   6時限目: 6
 *   7時限目: 7
 */
export type Week = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type Course = {
  [TableSchema.id]: string
  [TableSchema.typeName]: typeof ObjectType.Course
  [TableSchema.createdAt]: number
  [TableSchema.codeWeekPeriod]: string
  [TableSchema.weekPeriodCode]: string
  updatedAt: number
  period: Period
  week: Week
  code: string
  target: string
  teacher: string
  name: string
  classRoom: string
  term: string
  isRemote: boolean
  zoomUrl?: string
}
