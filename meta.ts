export const service = "ycu-schedule"
export const region = "us-east-1"
export const stage = process.env.AWS_STAGE || "dev"
export const tableName = `${service}-${stage}`
export const bucketName = `${service}-web-${stage}`
export const cloudfrontCachePolicy = `${service}-${stage}-cache-policy`
export const customDomain = "ycu-schedule.ycu-engine.dev"
export const customDomainAcmCertificateArn =
  "arn:aws:acm:us-east-1:871572727617:certificate/bfc397bd-d26a-471b-a394-553089daf969"

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
