import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const authHandler: NextApiHandler = async (req, res) => {
  return NextAuth(req, res, {
    debug: process.env.NODE_ENV === 'development',
    providers: [
      Providers.AzureADB2C({
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        scope: 'User.Read',
        tenantId: process.env.AZURE_TENANT_ID,
      }),
    ],
  })
}

export default authHandler
