import { News } from "~/api/models/news"
import { ObjectType } from "~/api/models/type"
import { TableIndexes, TableSchema } from "~/api/resource/db"
import { get, getTableName, query } from "~/api/service/db"

export const listNews = async (): Promise<News[]> => {
  const res = await query({
    TableName: getTableName(),
    IndexName: TableIndexes.byCreatedAt,
    KeyConditionExpression: `${TableSchema.typeName} = :type`,
    ExpressionAttributeValues: {
      ":type": ObjectType.News,
    },
    Select: "ALL_ATTRIBUTES",
  })
  return res.Items as News[]
}

export const getNews = async ({
  id,
}: {
  id: string
}): Promise<News | undefined> => {
  if (typeof id !== "string") {
    throw Error("id must be string.")
  }
  const res = await get({
    TableName: getTableName(),
    Key: {
      [TableSchema.typeName]: ObjectType.News,
      [TableSchema.id]: id,
    },
  })
  return res?.Item as News | undefined
}
