import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { SERVICE_COLORS } from "../lib/Color"
import { breakpointDown } from "../lib/Format"

export const CodeStyle = styled.code({
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
})

export const ParagraphStyle = styled.p`
  color: ${rgba(SERVICE_COLORS.FONT, 0.8)};
  font-size: 16px;
  line-height: 1.7;
  margin: 8px 0 0;

  &:first-of-type {
    margin: 0;
  }

  ${breakpointDown("sm")} {
    font-size: 14px;
    &:first-of-type {
    }
  }

  & + input {
    margin: 20px 0 0;
  }

  & + a {
    margin: 20px 0 0;
  }
`
export const EmphasisStyle = styled.span`
  color: ${rgba(SERVICE_COLORS.FONT, 0.9)};
  font-weight: bold;
`

export const LinkStyleCSS = css`
  color: ${rgba(SERVICE_COLORS.MAIN, 1)};
  transition-duration: 0.3s;

  &:hover {
    color: ${rgba(SERVICE_COLORS.MAIN, 0.7)};
    text-decoration: underline;
    transition-duration: 0.3s;
  }
`

export const ShortLinkStyleCSS = css`
  display: inline-block;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
`
