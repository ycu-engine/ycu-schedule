import { generateToken as _generateToken } from 'node-2fa'

export const generateToken = (): string => {
  return _generateToken(process.env.MICROSOFT_USER_2FA_SECRET).token
}
