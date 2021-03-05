import { ObjectType } from "~/api/models/type"
import { User } from "~/api/models/user"
import { TableSchema } from "~/api/resource/db"
import { get, getTableName, put } from "~/api/service/db"

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
