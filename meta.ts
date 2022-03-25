export const service = "ycu-schedule"
export const region = "us-east-1"
export const stage = "${opt:stage, 'dev'}"
export const bucketName = `${service}-web-${stage}`
export const cloudfrontCachePolicy = `${service}`
export const customDomain = "ycu-schedule.com"
export const subDomains = ["www"]
export const customDomainAcmCertificateArn =
  "arn:aws:acm:us-east-1:956140091326:certificate/bb11714f-e9de-485d-a932-8b7503f2aa52"

export const isProd = process.env.SERVERLESS_ENV === "prod"

export const stageRef = "${self:custom.variables.stage}"
export const tableNameRef = "${self:custom.variables.tableName}"
export const bucketNameRef = "${self:custom.variables.bucketName}"

export const variables = {
  service,
  region,
  stage,
  bucketName,
}
