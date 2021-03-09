import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { graphql } from "gatsby"
import { Fragment } from "react"
import { Helmet } from "react-helmet"
import { SERVICE_COLORS } from "~/components/lib/Color"
import { Card } from "~/components/molecules/Card"
import { Heading1, Heading2 } from "~/components/molecules/Heading"
import { renderAst } from "~/components/molecules/Markdown"
import { InnerLink } from "~/components/molecules/Typography"

export const pageQuery = graphql`
  query NewsTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date
        title
      }
      rawMarkdownBody
      htmlAst
      html
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
  padding: 0.5rem 2rem;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-evenly;
`

const LinkWidthStyleCSS = css`
  min-width: 7rem;
  min-height: 1px;
  display: inline-block;
  text-align: center;
`

const LinkNavigationButtonStyleCSS = css`
  ${LinkWidthStyleCSS}
  border: 1px solid ${SERVICE_COLORS.MAIN};
  border-radius: 5px;
  padding: 0.5rem 1.75rem;
  :hover {
    background-color: ${rgba(SERVICE_COLORS.MAIN, 0.3)};
    text-decoration: none;
  }
`

const NewsTemplatePage = ({
  data,
  pageContext,
}: NewsTemplateProps): JSX.Element => {
  return (
    <Fragment>
      <Helmet>
        <title>
          {data.markdownRemark?.frontmatter?.title} | お知らせ | YCUスケジュール
        </title>
      </Helmet>
      <Card>
        <Heading1>{data.markdownRemark?.frontmatter?.title}</Heading1>
        <Heading2>{data.markdownRemark?.frontmatter?.date}</Heading2>
        {renderAst(data.markdownRemark?.htmlAst)}
        <LinkNavigationStyle>
          {pageContext.prev ? (
            <InnerLink to={pageContext.prev} css={LinkNavigationButtonStyleCSS}>
              前
            </InnerLink>
          ) : (
            <div css={LinkWidthStyleCSS} />
          )}

          <InnerLink to="/news" css={LinkWidthStyleCSS}>
            お知らせ一覧
          </InnerLink>

          {pageContext.next ? (
            <InnerLink to={pageContext.next} css={LinkNavigationButtonStyleCSS}>
              次
            </InnerLink>
          ) : (
            <div css={LinkWidthStyleCSS} />
          )}
        </LinkNavigationStyle>
      </Card>
    </Fragment>
  )
}

export default NewsTemplatePage
