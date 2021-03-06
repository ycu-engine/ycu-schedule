import { environment } from "~/functions/env"
import { AWS_Function } from "~/functions/libs/apiGateway"
import { handlerPath } from "~/functions/libs/handlerResolver"
import { bucketName, cloudfrontCachePolicy, region } from "~/meta"

export const cloudfrontLambdaAtEdge: AWS_Function = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment,
  events: [
    {
      cloudFront: {
        eventType: "viewer-response",
        origin: {
          DomainName: `${bucketName}.s3-website-${region}.amazonaws.com`,
          CustomOriginConfig: {
            OriginProtocolPolicy: "match-viewer",
          },
        },
        behavior: {
          ViewerProtocolPolicy: "redirect-to-https",
          AllowedMethods: [
            "GET",
            "HEAD",
            "OPTIONS",
            "PUT",
            "PATCH",
            "POST",
            "DELETE",
          ],
          CachedMethods: ["GET", "HEAD", "OPTIONS"],
        },
        cachePolicy: {
          name: cloudfrontCachePolicy,
        },
      },
    },
  ],
}
