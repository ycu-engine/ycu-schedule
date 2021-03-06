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
  plugins: ["serverless-cloudfront-invalidate"],
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
        Origins: [
          {
            id: `custom/${bucketName}.s3-website-${region}.amazonaws.com`,
          },
        ],
      },
    },
  },
}

export default cloudfront
