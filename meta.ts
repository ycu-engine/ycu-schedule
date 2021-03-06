export const service = "ycu-schedule"
export const region = "us-east-1"
export const stage = process.env.AWS_STAGE || "dev"
export const tableName = `${service}-${stage}`
export const bucketName = `${service}-web-${stage}`

export const stageRef = "${self:custom.variables.stage}"
export const tableNameRef = "${self:custom.variables.tableName}"
export const bucketNameRef = "${self:custom.variables.bucketName}"

export const variables = {
  service,
  region,
  stage,
  tableName,
  bucketName,
}
