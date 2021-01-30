import { generateToken } from 'functions/lib/token'

/**
 * _event: APIGatewayEvent,
 * _context: Context,
 */

export const handler = async (): Promise<{ token: string }> => {
  return {
    token: generateToken(),
  }
}
