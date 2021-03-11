import { SerializedStyles } from "@emotion/react"
import { Link } from "gatsby"
import { FC } from "react"
import { urlIsSameSite } from "~/lib/utl"
import { ButtonListStyle, getButtonCSS } from "../atoms/Button"

export const ButtonList: FC = ({ children }) => (
  <ButtonListStyle>{children}</ButtonListStyle>
)

type ButtonTypeProps =
  | { main?: true; sub?: never; line?: never }
  | { main?: never; sub?: true; line?: never }
  | { main?: never; sub?: never; line?: true }

type ButtonProps = ButtonTypeProps &
  (
    | {
        as: "link"
        to: string
        onClick?: never
      }
    | {
        as: "button"
        to?: never
        onClick?: () => void
      }
  )

const getCSS = (props: ButtonProps): SerializedStyles =>
  props.main
    ? getButtonCSS("main")
    : props.sub
    ? getButtonCSS("sub")
    : props.line
    ? getButtonCSS("line")
    : getButtonCSS()

export const Button: FC<ButtonProps> = (props) => {
  if (props.as === "link") {
    if (urlIsSameSite(props.to)) {
      return (
        <Link to={props.to} css={getCSS(props)}>
          {props.children}
        </Link>
      )
    }
    return (
      <a href={props.to} css={getCSS(props)} target="_brank">
        {props.children}
      </a>
    )
  }
  return (
    <button css={getCSS(props)} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
