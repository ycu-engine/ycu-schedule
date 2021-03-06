import { DocumentClient } from "aws-sdk/clients/dynamodb"

export const getTableName = (): string => {
  if (typeof process.env.tableName === "undefined") {
    throw Error('enviroment variable "tableName" is not set')
  }
  return process.env.tableName
}

export const getDocClient = (): DocumentClient => {
  return new DocumentClient({})
}

const promiseFunc = <T>(
  resolve: (value: T) => void,
  reject: (reason: unknown) => void
) => (err: unknown, data: T) => {
  if (err) {
    reject(err)
  } else {
    resolve(data)
  }
}

export const query = (
  params: DocumentClient.QueryInput
): Promise<DocumentClient.QueryOutput> => {
  return new Promise((resolve, reject) => {
    getDocClient().query(params, promiseFunc(resolve, reject))
  })
}

export const get = (
  params: DocumentClient.GetItemInput
): Promise<DocumentClient.GetItemOutput> => {
  return new Promise((resolve, reject) => {
    getDocClient().get(params, promiseFunc(resolve, reject))
  })
}

export const batchGet = (
  params: DocumentClient.BatchGetItemInput
): Promise<DocumentClient.BatchGetItemOutput> => {
  return new Promise((resolve, reject) => {
    getDocClient().batchGet(params, promiseFunc(resolve, reject))
  })
}

export const put = (
  params: DocumentClient.PutItemInput
): Promise<DocumentClient.PutItemOutput> => {
  return new Promise((resolve, reject) => {
    getDocClient().put(params, promiseFunc(resolve, reject))
  })
}
