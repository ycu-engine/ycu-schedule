import { encrypt } from "~libs/encrypt"
import { getMicrosoftId } from "~libs/microsoftGraph"

export const getUserIdByToken = async (token: string): Promise<string> => {
  const microsoftUserId = await getMicrosoftId(token)
  const userId = encrypt(microsoftUserId)
  return userId
}
