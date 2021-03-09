import { ObjectType } from "~/functions/models/type"
import { User } from "~/functions/models/user"
import { get, getTableName, put } from "~/functions/service/db"
import { TableSchema } from "~/resources/dynamodb"

export const getUser = async ({ id }: { id: string }): Promise<User> => {
  if (typeof id !== "string") {
    throw Error("id must be string.")
  }
  const res = await get({
    TableName: getTableName(),
    Key: {
      [TableSchema.typeName]: ObjectType.User,
      [TableSchema.id]: id,
    },
  })
  if (res.Item) {
    return res.Item as User
  }
  return await createUser({ id })
}

export const createUser = async ({ id }: { id: string }): Promise<User> => {
  if (typeof id !== "string") {
    throw Error("id must be string")
  }
  const now = new Date().getTime()
  const user: User = {
    typeName: "User",
    id,
    createdAt: now,
    updatedAt: now,
    myCourse: {},
  }
  await put({
    TableName: getTableName(),
    Item: user,
  })
  return user
}
