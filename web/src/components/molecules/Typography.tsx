import isPropValid from "@emotion/is-prop-valid"
import { PropsOf } from "@emotion/react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { FC } from "react"
import {
  EmphasisStyle,
  LinkCSS,
  ParagraphStyle,
  ShortLinkCSS,
  StrongStyle,
} from "../atoms/Typography"

export const Paragraph: FC = ({ children }) => (
  <ParagraphStyle>{children}</ParagraphStyle>
)

export const Emphasis: FC = ({ children }) => (
  <EmphasisStyle>{children}</EmphasisStyle>
)

export const Strong: FC = ({ children }) => (
  <StrongStyle>{children}</StrongStyle>
)

export const InnerLink = styled(Link, { shouldForwardProp: isPropValid })<{
  short?: true
}>((props) => [LinkCSS, props.short && ShortLinkCSS])

export const OuterLink = styled(
  (props: PropsOf<"a">) => <a target="_blank" {...props} />,
  {
    shouldForwardProp: isPropValid,
  }
)<{
  short?: true
}>((props) => [LinkCSS, props.short && ShortLinkCSS])
