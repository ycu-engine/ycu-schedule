/* eslint-disable no-undef */

const stage = process.env.AWS_STAGE || "dev"
const bucketName = `ycu-scheudle-${stage}`

module.exports = {
  siteMetadata: {
    title: "YCU スケジュール",
    siteUrl: "https://www.ycu-schedule.com",
  },
  plugins: [
    "gatsby-plugin-emotion",
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-3XXQ2Q0MPG",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "news",
        path: "./src/news/",
      },
      __key: "news",
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: bucketName,
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: { "~": "src" },
        extensions: [],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        emitSchema: {
          "src/__generated__/gatsby-schema.graphql": true,
          "src/__generated__/gatsby-introspection.json": true,
        },
        emitPluginDocuments: {
          "src/__generated__/gatsby-plugin-documents.graphql": true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-brotli",
      options: {
        extensions: ["css", "html", "js", "svg"],
      },
    },
  ],
}
