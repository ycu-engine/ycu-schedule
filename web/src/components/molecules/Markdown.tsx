import { css } from "@emotion/react"
import { createElement, FC } from "react"
import rehypeReact, { ComponentPropsWithoutNode } from "rehype-react"
import unified from "unified"
import type { Node } from "unist"
import { urlIsSameSite } from "~/lib/utl"
import { Heading1, Heading2, Heading3 } from "./Heading"
import { InnerLink, OuterLink, Paragraph, Strong } from "./Typography"

const A: FC<ComponentPropsWithoutNode> = ({ href, children }) => {
  if (typeof href !== "string") {
    throw Error("href is not string")
  }
  if (urlIsSameSite(href)) {
    return <InnerLink to={href} children={children} />
  }
  return <OuterLink href={href} children={children} />
}

const Li: FC<ComponentPropsWithoutNode> = (props) => (
  <li
    {...props}
    css={css`
      margin-bottom: 0.5rem;
      > *:not(:first-of-type) {
        padding: 0 1.2rem;
      }
    `}
  />
)

const processor = unified().use(rehypeReact, {
  createElement,
  components: {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    p: Paragraph,
    strong: Strong,
    a: A,
    li: Li,
  },
})

export const renderAst = (ast: Node | undefined): JSX.Element => {
  if (!ast) {
    return <></>
  }
  return (processor.stringify(ast) as unknown) as JSX.Element
}
