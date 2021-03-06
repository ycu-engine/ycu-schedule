import { NonUndefined } from "type-util"

export const notUndefined = <T>(value: T): value is NonUndefined<T> => {
  return typeof value !== "undefined"
}
