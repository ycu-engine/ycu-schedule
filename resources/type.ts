import type { AWS } from "@serverless/typescript"

export type Serverless = {
  resource: AWS["resources"]["Resources"][string]
  plugins?: string[]
  custom?: AWS["custom"]
}
