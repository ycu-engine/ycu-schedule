export const service = "ycu-schedule"
export const region = "ap-northeast-1"
export const stage = process.env.AWS_STAGE || "dev"
export const tableName = `${service}-${stage}`

export const tableNameRef = "${self:custom.variables.tableName}"
