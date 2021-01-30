import { generateToken } from 'functions/lib/token'

/**
 * _event: APIGatewayEvent,
 * _context: Context,
 */

export const handler = async (): Promise<{ token: string; secret: string }> => {
  return {
    token: generateToken(),
    secret: process.env.MICROSOFT_USER_2FA_SECRET,
  }
}
