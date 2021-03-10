import {
  bucketName,
  customDomain,
  customDomainAcmCertificateArn,
  isProd,
  region,
  service,
  stage,
  subDomains,
} from "~/meta"
import { Serverless } from "./type"

/**
 * ケバブケースをタイトルケースに変換
 * キャッシュポリシー名にハイフンを使うことができないので、この関数で変換してあげる
 * @param kebab kebab case string ex. hey-foo
 * @returns title cased strint ex. HeyFoo
 */
const kebabCase2TitleCase = (kebab: string): string => {
  return kebab
    .split(/-+/)
    .filter((word) => word.length > 0)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

const cloudfront: Serverless = {
  plugins: [
    "serverless-cloudfront-invalidate",
    // "serverless-cloudfront-lambdaedge-plugin",
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
          Aliases: isProd
            ? [customDomain, ...subDomains.map((v) => `${v}.${customDomain}`)]
            : undefined,
          ViewerCertificate: isProd
            ? {
                AcmCertificateArn: customDomainAcmCertificateArn,
                MinimumProtocolVersion: "TLSv1.2_2019",
                SslSupportMethod: "sni-only",
              }
            : undefined,
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
              Ref: "cloudfrontCachePolicy",
            },
            OriginRequestPolicyId: {
              Ref: "cloudfrontOriginRequestPolicy",
            },
            ViewerProtocolPolicy: isProd ? `redirect-to-https` : "allow-all",
            TargetOriginId: `custom/${bucketName}.s3-website-${region}.amazonaws.com`,
          },
          Origins: [
            {
              Id: `custom/${bucketName}.s3-website-${region}.amazonaws.com`,
              DomainName: `${bucketName}.s3-website-${region}.amazonaws.com`,
              CustomOriginConfig: {
                OriginProtocolPolicy: "http-only",
              },
            },
          ],
        },
      },
    },
    cloudfrontOriginRequestPolicy: {
      Type: "AWS::CloudFront::OriginRequestPolicy",
      Properties: {
        OriginRequestPolicyConfig: {
          CookiesConfig: {
            CookieBehavior: "none",
          },
          HeadersConfig: {
            HeaderBehavior: "allViewer",
          },
          Name: kebabCase2TitleCase(`${service}-${stage}`),
          QueryStringsConfig: {
            QueryStringBehavior: "all",
          },
        },
      },
    },
    cloudfrontCachePolicy: {
      Type: "AWS::CloudFront::CachePolicy",
      Properties: {
        CachePolicyConfig: {
          Comment: `${service}-${stage}`,
          DefaultTTL: 31536000,
          MaxTTL: 31536000,
          MinTTL: 31536000,
          Name: kebabCase2TitleCase(`${service}-${stage}`),
          ParametersInCacheKeyAndForwardedToOrigin: {
            CookiesConfig: {
              CookieBehavior: "none",
            },
            EnableAcceptEncodingGzip: true,
            EnableAcceptEncodingBrotli: true,
            HeadersConfig: {
              HeaderBehavior: "none",
            },
            QueryStringsConfig: {
              QueryStringBehavior: "none",
            },
          },
        },
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

if (isProd) {
  cloudfront.resources.route53HostedZone = {
    Type: "AWS::Route53::HostedZone",
    Properties: {
      Name: customDomain,
    },
  }
  cloudfront.resources.route53RecordSetGroup = {
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
  }
}

export default cloudfront
