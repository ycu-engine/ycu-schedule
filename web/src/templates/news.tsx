import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { graphql } from "gatsby"
import { Fragment } from "react"
import { SERVICE_COLORS } from "~/components/lib/Color"
import { breakpointUp } from "~/components/lib/Format"
import { Card } from "~/components/molecules/Card"
import { Heading1, Heading2 } from "~/components/molecules/Heading"
import { renderAst } from "~/components/molecules/Markdown"
import { InnerLink } from "~/components/molecules/Typography"
import { SEO } from "~/components/organisms/SEO"

export const pageQuery = graphql`
  query NewsTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date
        title
      }
      excerpt(truncate: true, pruneLength: 120, format: PLAIN)
      htmlAst
    }
  }
`

type NewsTemplateProps = {
  data: GatsbyTypes.NewsTemplateQuery
  pageContext: {
    id: string
    next?: string
    prev?: string
  }
}

const LinkNavigationStyle = styled.div`
  display: flex;
  padding: 0.5rem 0;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-evenly;
`

const LinkWidthCSS = css`
  min-width: 1rem;
  min-height: 1px;
  display: inline-block;
  text-align: center;

  ${breakpointUp("sm")} {
    min-width: 5rem;
  }
`

const LinkNavigationButtonCSS = css`
  ${LinkWidthCSS}
  border: 1px solid ${SERVICE_COLORS.MAIN};
  border-radius: 5px;
  padding: 0.5rem 1rem;
  :hover {
    background-color: ${rgba(SERVICE_COLORS.MAIN, 0.3)};
    text-decoration: none;
  }
  ${breakpointUp("md")} {
    padding: 0.5rem 1.75rem;
  }
`

const NewsTemplatePage = ({
  data,
  pageContext,
}: NewsTemplateProps): JSX.Element => {
  return (
    <Fragment>
      <SEO
        title={`${data.markdownRemark?.frontmatter?.title} | お知らせ`}
        description={data.markdownRemark?.excerpt}
      />
      <Card>
        <Heading1>{data.markdownRemark?.frontmatter?.title}</Heading1>
        <Heading2>{data.markdownRemark?.frontmatter?.date}</Heading2>
        {renderAst(data.markdownRemark?.htmlAst)}
        <LinkNavigationStyle>
          {pageContext.prev ? (
            <InnerLink to={pageContext.prev} css={LinkNavigationButtonCSS}>
              前
            </InnerLink>
          ) : (
            <div css={LinkWidthCSS} />
          )}

          <InnerLink to="/news" css={LinkWidthCSS}>
            お知らせ一覧
          </InnerLink>

          {pageContext.next ? (
            <InnerLink to={pageContext.next} css={LinkNavigationButtonCSS}>
              次
            </InnerLink>
          ) : (
            <div css={LinkWidthCSS} />
          )}
        </LinkNavigationStyle>
      </Card>
    </Fragment>
  )
}

export default NewsTemplatePage
