import { tableNameRef } from "~/meta"
import { AWS_Function } from "~libs/apiGateway"

export const environment: AWS_Function["environment"] = {
  tableName: tableNameRef,
}
