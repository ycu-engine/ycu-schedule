import { FC } from "react"
import { CardStyle } from "../atoms/Card"

export const Card: FC = ({ children }) => {
  return <CardStyle>{children}</CardStyle>
}
