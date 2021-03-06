import {
  bucketName,
  customDomain,
  customDomainAcmCertificateArn,
  region,
  service,
  stage,
} from "~/meta"
import { Serverless } from "./type"

const cloudfront: Serverless = {
  plugins: [
    "serverless-cloudfront-invalidate",
    "serverless-cloudfront-lambdaedge-plugin",
  ],
  custom: {
    cloudfrontInvalidate: [
      {
        distributionId: `\${cf:${service}-${stage}.CloudFrontDistribution}`,
        items: ["/*"],
      },
    ],
  },
  resource: {
    Type: "AWS::CloudFront::Distribution",
    Properties: {
      DistributionConfig: {
        Comment: `${service} ${stage}`,
        Enabled: true,
        Aliases: [customDomain],
        ViewerCertificate: {
          CloudFrontDefaultCertificate: false,
          AcmCertificateArn: customDomainAcmCertificateArn,
        },
        DefaultCacheBehavior: {
          AllowedMethods: [
            "GET",
            "HEAD",
            "OPTIONS",
            "PUT",
            "PATCH",
            "POST",
            "DELETE",
          ],
          CachedMethods: ["GET", "HEAD"],
          CachePolicyId: {
            Ref:
              "CloudFrontCachePolicyYcuDashscheduleDashdevDashcacheDashpolicy",
          },
          LambdaFunctionAssociations: [
            {
              EventType: "viewer-response",
              LambdaFunctionARN: "cloudfrontLambdaAtEdgeTemp1",
            },
          ],
        },
        Origins: [
          {
            Id: `custom/${bucketName}.s3-website-${region}.amazonaws.com`,
            DomainName: `${bucketName}.s3-website-${region}.amazonaws.com`,
            CustomOriginConfig: {
              OriginProtocolPolicy: "match-viewer",
            },
          },
        ],
      },
    },
  },
}

export default cloudfront
