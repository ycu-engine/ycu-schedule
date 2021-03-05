import { TableSchema } from "~/api/resource/db"
import { ObjectType } from "./type"

export type News = {
  [TableSchema.id]: string
  [TableSchema.typeName]: typeof ObjectType.News
  [TableSchema.createdAt]: number
  updatedAt: number
  title: string
  body: string
}
