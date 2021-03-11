import { graphql, useStaticQuery } from "gatsby"
import { Fragment } from "react"
import { Button, ButtonList } from "~/components/molecules/Button"
import { Card } from "~/components/molecules/Card"
import { renderAst } from "~/components/molecules/Markdown"
import { SEO } from "~/components/organisms/SEO"

const ReadmePage = (): JSX.Element => {
  const { file } = useStaticQuery<GatsbyTypes.ReadmeQuery>(graphql`
    query Readme {
      file(name: { eq: "readme" }) {
        childMarkdownRemark {
          frontmatter {
            title
            updatedAt
          }
          excerpt(truncate: true, pruneLength: 120, format: PLAIN)
          htmlAst
        }
      }
    }
  `)
  return (
    <Fragment>
      <SEO
        title="利用上の注意"
        description={file?.childMarkdownRemark?.excerpt}
      />
      <Card>{renderAst(file?.childMarkdownRemark?.htmlAst)}</Card>
      <ButtonList>
        <Button as="link" to="/" sub>
          トップページに戻る
        </Button>
      </ButtonList>
    </Fragment>
  )
}

export default ReadmePage
