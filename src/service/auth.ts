import { encrypt } from "~libs/encrypt"
import { getMicrosoftId } from "~libs/microsoftGraph"

export const isAuthenticated = async (token: string): Promise<string> => {
  return await getMicrosoftId(token)
}
export const getUserIdByToken = async (token: string): Promise<string> => {
  const microsoftUserId = await isAuthenticated(token)
  const userId = encrypt(microsoftUserId)
  return userId
}
