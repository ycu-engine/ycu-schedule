import { AWS_Function } from "~/functions/libs/apiGateway"
import { tableNameRef } from "~/meta"

export const environment: AWS_Function["environment"] = {
  tableName: tableNameRef,
}
