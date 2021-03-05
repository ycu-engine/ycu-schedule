import { createHash } from "crypto"

/**
 * パスワードを暗号化するのには使わないでください。
 * ユーザーIDを暗号化するのに利用しています。
 */
export const encrypt = (value: string): string => {
  return createHash("sha256").update(value).digest("hex")
}
