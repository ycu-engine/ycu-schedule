import { bucketName } from "~/meta"
import { Serverless } from "./type"

const s3: Serverless = {
  plugins: ["serverless-s3-sync"],
  custom: {
    s3Sync: [
      {
        bucketName,
        localDir: "web/public",
        acl: "public-read",
        defaultContentType: "text/html",
        params: process.env.FIRST_DEPLOY
          ? undefined
          : "${file(web/.cache/s3.params.json)}",
      },
    ],
  },
  resource: {
    Type: "AWS::S3::Bucket",
    Properties: {
      BucketName: bucketName,
      AccessControl: "PublicRead",
      WebsiteConfiguration: {
        IndexDocument: "index.html",
        ErrorDocument: "404.html",
        RoutingRules: process.env.FIRST_DEPLOY
          ? undefined
          : "${file(web/.cache/s3.sls.routingRules.json)}",
      },
    },
  },
}

export default s3
