/* eslint-disable no-undef */

const stage = process.env.AWS_STAGE || "dev"
const bucketName = `ycu-scheudle-${stage}`

module.exports = {
  siteMetadata: {
    title: "YCU スケジュール",
    titleTemplate: `%s | YCU スケジュール`,
    author: "ycu-engine",
    siteUrl: "https://www.ycu-schedule.com",
    description: `YCUスケジュールは横浜市立大学の非公式の時間割アプリです。`,
    url: `https://www.ycu-schedule.com`,
    image: `/icons/icon-96x96.png`,
    twitterUsername: `@ycu_engine`,
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "md",
        path: "./src/md/",
      },
      __key: "md",
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
