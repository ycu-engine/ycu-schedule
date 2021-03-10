import styled from "@emotion/styled"
import { SERVICE_COLORS } from "../lib/Color"
import { breakpointDown } from "../lib/Format"

export const CalloutStyle = styled.section`
  align-items: center;
  background-color: ${SERVICE_COLORS.MAIN};
  display: flex;
  padding: 20px 0;
  justify-content: center;
  width: 100vw;
`

export const CalloutInnerStyle = styled.p`
  color: ${SERVICE_COLORS.BASE};
  font-size: 16px;
  font-weight: bold;
  line-height: 1.7;
  text-align: center;
  width: 980px;
  ${breakpointDown("sm")} {
    font-size: 14px;
    padding: 0;
    text-align: left;
    width: calc(100vw - 60px);
  }

  ${breakpointDown("lg")} {
    width: calc(100vw - 80px);
  }
`
