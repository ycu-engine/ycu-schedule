import { AWS_Function } from "~/api/libs/apiGateway"
import { tableNameRef } from "~/api/meta"

export const environment: AWS_Function["environment"] = {
  tableName: tableNameRef,
}
