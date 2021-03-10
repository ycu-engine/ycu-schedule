import styled from "@emotion/styled"
import { breakpointDown } from "../lib/Format"

export const ContainerStyle = styled.div`
  padding: 70px 0 0;
  min-height: calc(100vh - 70px - 90px);
  width: 100vw;

  ${breakpointDown("sm")} {
    padding: 50px 0 0;
    min-height: calc(100vh - 50px - 90px);
  }
`
