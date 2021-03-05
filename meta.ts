export const service = "ycu-schedule"
export const region = "ap-northeast-1"
export const stage = process.env.AWS_STAGE || "dev"
export const tableName = `${service}-${stage}`
export const bucketName = `${service}-${stage}`

export const tableNameRef = "${self:custom.variables.tableName}"
export const bucketNameRef = "${self:custom.variables.bucketName}"

export const variables = {
  service,
  region,
  stage,
  tableName,
  bucketName,
}
