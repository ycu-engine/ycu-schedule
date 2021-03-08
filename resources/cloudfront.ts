import {
  bucketName,
  customDomain,
  customDomainAcmCertificateArn,
  region,
  service,
  stage,
  subDomains,
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
        distributionIdKey: "CloudFrontDistributionId",
        items: ["/*"],
      },
    ],
  },
  resources: {
    cloudfront: {
      Type: "AWS::CloudFront::Distribution",
      Properties: {
        DistributionConfig: {
          Comment: `${service} ${stage}`,
          Enabled: true,
          Aliases: [
            customDomain,
            ...subDomains.map((v) => `${v}.${customDomain}`),
          ],
          ViewerCertificate: {
            AcmCertificateArn: customDomainAcmCertificateArn,
            MinimumProtocolVersion: "TLSv1.2_2019",
            SslSupportMethod: "sni-only",
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
            ViewerProtocolPolicy: `redirect-to-https`,
            TargetOriginId: `custom/${bucketName}.s3-website-${region}.amazonaws.com`,
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
    route53HostedZone: {
      Type: "AWS::Route53::HostedZone",
      Properties: {
        Name: customDomain,
      },
    },
    route53RecordSetGroup: {
      Type: "AWS::Route53::RecordSetGroup",
      DependsOn: ["route53HostedZone"],
      Properties: {
        HostedZoneId: {
          Ref: "route53HostedZone",
        },
        RecordSets: [
          {
            AliasTarget: {
              DNSName: { "Fn::GetAtt": ["cloudfront", "DomainName"] },
              HostedZoneId: "Z2FDTNDATAQYW2",
            },
            Name: customDomain,
            Type: "A",
          },
          {
            AliasTarget: {
              DNSName: { "Fn::GetAtt": ["cloudfront", "DomainName"] },
              HostedZoneId: "Z2FDTNDATAQYW2",
            },
            Name: customDomain,
            Type: "AAAA",
          },
          ...subDomains.flatMap((v) => [
            {
              AliasTarget: {
                DNSName: { "Fn::GetAtt": ["cloudfront", "DomainName"] },
                HostedZoneId: "Z2FDTNDATAQYW2",
              },
              Name: `${v}.${customDomain}`,
              Type: "A",
            },
            {
              AliasTarget: {
                DNSName: { "Fn::GetAtt": ["cloudfront", "DomainName"] },
                HostedZoneId: "Z2FDTNDATAQYW2",
              },
              Name: `${v}.${customDomain}`,
              Type: "AAAA",
            },
          ]),
        ],
      },
    },
  },
  Outputs: {
    CloudFrontDistributionId: {
      Description: "CloudFront distribution id",
      Value: { Ref: "cloudfront" },
    },
  },
}

export default cloudfront
