declare module "*.png"
declare module "*.svg"

declare module "~/info" {
  export const CloudFrontDistributionId: string
  export const MyCourseLambdaFunctionQualifiedArn: string
  export const ServiceEndpoint: string
  export const ServerlessDeploymentBucketName: string
  export const CoursesLambdaFunctionQualifiedArn: string
  export const CoursesByCodeLambdaFunctionQualifiedArn: string
  export const CloudFrontDistributionDomainName: string
}
