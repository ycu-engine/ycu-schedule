import { AWS_Function } from "~/api/libs/apiGateway"
import { tableNameRef } from "~/meta"

export const environment: AWS_Function["environment"] = {
  tableName: tableNameRef,
}
