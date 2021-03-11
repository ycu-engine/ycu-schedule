import type { GatsbyLinkProps } from "gatsby"

type CustomGatsbyLinkProps = Omit<
  GatsbyLinkProps<Record<string, unknown>>,
  "ref"
>

declare module "gatsby" {
  export type { CustomGatsbyLinkProps }
}
