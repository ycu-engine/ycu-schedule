import 'next-auth/providers'

declare module 'next-auth/providers' {
  export interface Providers {
    AzureADB2C: (options: {
      clientId: string
      clientSecret: string
      scope: string
      tenantId?: string
      protection?: 'pkce' | 'state' | 'none'
    }) => {
      [key: string]: any
    }
  }
}
