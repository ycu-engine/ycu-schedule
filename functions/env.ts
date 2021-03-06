import { AWS_Function } from "~/functions/libs/apiGateway"
import { stageRef, tableNameRef } from "~/meta"

export const environment: AWS_Function["environment"] = {
  tableName: tableNameRef,
  stage: stageRef,
}
