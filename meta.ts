export const service = "ycu-schedule"
export const region = "us-east-1"
export const stage = "${opt:stage, 'dev'}"
export const tableName = `${service}-${stage}`
export const bucketName = `${service}-web-${stage}`
export const cloudfrontCachePolicy = `${service}`
export const customDomain = "ycu-schedule.com"
export const subDomains = ["www"]
export const customDomainAcmCertificateArn =
  "arn:aws:acm:us-east-1:871572727617:certificate/cf1365b4-37fa-442f-8aeb-a7c5195008b5"

export const isProd = process.env.SERVERLESS_ENV === "prod"

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
