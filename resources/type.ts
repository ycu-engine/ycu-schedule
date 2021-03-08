import type { AWS } from "@serverless/typescript"
import type { NonUndefined } from "type-util"

export type Serverless = {
  resources: NonUndefined<NonUndefined<AWS["resources"]>["Resources"]>
  plugins?: string[]
  custom?: NonUndefined<AWS["custom"]>
  Outputs?: NonUndefined<NonUndefined<AWS["resources"]>["Outputs"]>
}
