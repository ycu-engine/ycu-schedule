import type { AWS } from "@serverless/typescript"
import type { NonUndefined } from "type-util"

export type Serverless = {
  resource: NonUndefined<NonUndefined<AWS["resources"]>["Resources"]>[string]
  plugins?: string[]
  custom?: AWS["custom"]
}
