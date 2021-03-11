import { graphql, useStaticQuery } from "gatsby"
import { Fragment } from "react"
import { Card } from "~/components/molecules/Card"
import { Heading2, Heading3 } from "~/components/molecules/Heading"
import { renderAst } from "~/components/molecules/Markdown"
import { InnerLink } from "~/components/molecules/Typography"
import { SEO } from "~/components/organisms/SEO"

type NewsCardProps = {
  news: GatsbyTypes.NewsPageQuery["allMarkdownRemark"]["nodes"][number]
}

const NewsCard = ({ news }: NewsCardProps): JSX.Element => {
  return (
    <Card>
      <Heading2>
        <InnerLink to={`/news/${news.parent?.name}`}>
          {news.frontmatter?.title}
        </InnerLink>
      </Heading2>
      <Heading3>{news.frontmatter?.date}</Heading3>
      {renderAst(news.excerptAst)}
    </Card>
  )
}

const NewsPage = (): JSX.Element => {
  const data = useStaticQuery<GatsbyTypes.NewsPageQuery>(graphql`
    query NewsPage {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          id
          parent {
            ... on File {
              name
            }
          }
          excerptAst(pruneLength: 50, truncate: true)
          frontmatter {
            date
            title
          }
        }
      }
    }
  `)

  return (
    <Fragment>
      <SEO title="お知らせ" description="YCUスケジュールからのお知らせです" />
      {data.allMarkdownRemark.nodes.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </Fragment>
  )
}

export default NewsPage
