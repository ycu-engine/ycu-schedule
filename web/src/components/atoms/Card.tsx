import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { SERVICE_COLORS } from "../lib/Color"
import { breakpointDown } from "../lib/Format"

export const CardStyle = styled.section`
  background-color: ${rgba(SERVICE_COLORS.FONT, 0.06)};
  border-radius: 8px;
  display: block;
  flex-direction: column;
  margin: 30px auto 0;
  padding: 40px;
  width: 900px;

  ${breakpointDown("lg")} {
    padding: 20px;
    width: calc(100vw - 80px);
  }
`
