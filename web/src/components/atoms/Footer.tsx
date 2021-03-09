import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { SERVICE_COLORS } from "../lib/Color"
import { breakpointDown } from "../lib/Format"

export const FooterStyle = styled.footer`
  align-items: center;
  background-color: ${rgba(SERVICE_COLORS.FONT, 0.06)};
  color: #9eaab9;
  display: flex;
  font-size: 13px;
  height: 50px;
  justify-content: center;
  letter-spacing: 1px;
  margin: 40px 0 0;
  width: 100vw;

  ${breakpointDown("sm")} {
    font-size: 12px;
  }
`
