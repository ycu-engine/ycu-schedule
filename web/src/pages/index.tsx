import { graphql, useStaticQuery } from "gatsby"
import { Fragment, useMemo } from "react"
import { Callout } from "~/components/molecules/Callout"
import { Card } from "~/components/molecules/Card"
import { Heading1, Heading2, Heading3 } from "~/components/molecules/Heading"
import { renderAst } from "~/components/molecules/Markdown"
import {
  Emphasis,
  InnerLink,
  OuterLink,
  Paragraph,
} from "~/components/molecules/Typography"
import { HeroImage } from "~/components/organisms/HeroImage"
import { SEO } from "~/components/organisms/SEO"
import { apiBasePath } from "~/lib/api/base"

const IndexPage = (): JSX.Element => {
  console.log(apiBasePath)
  const {
    site,
    allMarkdownRemark,
  } = useStaticQuery<GatsbyTypes.IndexPageQuery>(graphql`
    query IndexPage {
      site {
        siteMetadata {
          description
        }
      }
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        limit: 1
      ) {
        nodes {
          id
          htmlAst
          frontmatter {
            date
            title
          }
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  `)

  const latestNews = useMemo(() => allMarkdownRemark.nodes[0], [
    allMarkdownRemark.nodes,
  ])

  return (
    <Fragment>
      <SEO title="トップ" description={site?.siteMetadata?.description} />
      <HeroImage />
      <Callout>
        利用いただきありがとうございます！ おかげさまで現在サービス開始6日にして
        <br />
        ユーザー数が200人となりました！🎉🎉🎉
        本当にありがとうごございます！😍😍😍
      </Callout>
      <Card>
        <Paragraph>
          YCUスケジュールは<Emphasis>横浜市立大学の非公式のアプリ</Emphasis>
          となっています。
        </Paragraph>
        <Paragraph>
          必ず
          <InnerLink to="/readme">利用上の注意</InnerLink>
          を確認してからご利用ください。
        </Paragraph>
        <Paragraph>
          団体機能については
          <InnerLink to="#">こちら</InnerLink>
          をご確認ください。
        </Paragraph>
      </Card>

      <Card>
        <Heading1>📗 お知らせ</Heading1>
        <Heading2>{latestNews.frontmatter?.title}</Heading2>
        <Heading3>{latestNews.frontmatter?.date}</Heading3>
        {renderAst(latestNews.htmlAst)}
        <Paragraph>
          <InnerLink to="/news">以前のお知らせ</InnerLink>
        </Paragraph>
      </Card>

      <Card>
        <Heading1>🗓 今後の機能追加予定</Heading1>
        <Paragraph>
          <OuterLink href="https://docs.google.com/forms/d/e/1FAIpQLSdzcqpam9HGKsNilspsf2wSi43ZPJqxUajBsfhm0pZbx-MZDQ/viewform">
            機能追加要望
          </OuterLink>
          募集中💬
          <br />
          ユーザーが増えれば実装していきます😇
        </Paragraph>
      </Card>
    </Fragment>
  )
}

export default IndexPage
