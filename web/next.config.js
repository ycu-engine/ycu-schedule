module.exports = {
  target: 'serverless',
  env: {
    AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
    AZURE_TENANT_ID: process.env.AZURE_TENANT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
}
