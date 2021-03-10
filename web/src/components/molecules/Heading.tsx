import { FC } from "react"
import { Heading1Style, Heading2Style, Heading3Style } from "../atoms/Heading"

export const Heading1: FC = ({ children }) => {
  return <Heading1Style>{children}</Heading1Style>
}

export const Heading2: FC = ({ children }) => {
  return <Heading2Style>{children}</Heading2Style>
}

export const Heading3: FC = ({ children }) => {
  return <Heading3Style>{children}</Heading3Style>
}
