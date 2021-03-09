import { FC } from "react"
import { CalloutInnerStyle, CalloutStyle } from "../atoms/Callout"

export const Callout: FC = ({ children }) => {
  return (
    <CalloutStyle>
      <CalloutInnerStyle>{children}</CalloutInnerStyle>
    </CalloutStyle>
  )
}
