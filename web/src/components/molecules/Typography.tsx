import isPropValid from "@emotion/is-prop-valid"
import { PropsOf } from "@emotion/react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { FC } from "react"
import {
  EmphasisStyle,
  LinkStyleCSS,
  ParagraphStyle,
  ShortLinkStyleCSS,
} from "../atoms/Typography"

export const Paragraph: FC = ({ children }) => {
  return <ParagraphStyle>{children}</ParagraphStyle>
}

export const Emphasis: FC = ({ children }) => {
  return <EmphasisStyle>{children}</EmphasisStyle>
}

export const InnerLink = styled(Link, { shouldForwardProp: isPropValid })<{
  short?: true
}>((props) => [LinkStyleCSS, props.short && ShortLinkStyleCSS])

export const OuterLink = styled(
  (props: PropsOf<"a">) => <a target="_blank" {...props} />,
  {
    shouldForwardProp: isPropValid,
  }
)<{
  short?: true
}>((props) => [LinkStyleCSS, props.short && ShortLinkStyleCSS])
