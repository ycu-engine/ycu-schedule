import isPropValid from "@emotion/is-prop-valid"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import { MainOrSub } from "~/lib/types"
import { SERVICE_COLORS } from "../lib/Color"
import { breakpointDown, breakpointUp } from "../lib/Format"

export const HeroImageStyle = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 600px;
  justify-content: center;
  width: 100vw;
  /* position: relative; */
  ${breakpointUp("sm")} {
    height: 500px;
  }
`

export const HeroImageMainStyle = styled.h1`
  color: #fff;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
  width: calc(100vw - 80px);
  font-size: 30px;
  ${breakpointUp("sm")} {
    width: calc(100vw - 100px);
    font-size: 34px;
  }
  ${breakpointUp("lg")} {
    width: 600px;
  }
`

export const HeroImageBodyStyle = styled.p`
  color: #fff;
  font-size: 16px;
  line-height: 1.7;
  margin: 30px 0 0;
  width: calc(100vw - 80px);
  ${breakpointUp("sm")} {
    width: calc(100vw - 120px);
  }
  ${breakpointUp("lg")} {
    width: 600px;
  }
`

export const HeroImageButtonListStyle = styled.div`
  display: flex;
  margin: 40px 0 0;
  ${breakpointDown("md")} {
    flex-direction: column;
  }
`

export const HeroImageButtonListItemStyle = styled(Link, {
  shouldForwardProp: isPropValid,
})<MainOrSub>`
  align-items: center;
  border: 1px solid #fff;
  border-radius: 100px;
  display: flex;
  font-size: 16px;
  height: 60px;
  justify-content: center;
  margin: 0 10px;
  text-align: center;
  transition-duration: 0.3s;
  width: 220px;

  ${breakpointDown("md")} {
    margin: 10px 0;
    width: calc(100vw - 80px);
  }

  ${(props) =>
    props.main &&
    css`
      background-color: rgba(255, 255, 255, 1);
      color: #000;
      &:hover {
        border: 1px solid ${SERVICE_COLORS.MAIN};
        color: ${SERVICE_COLORS.MAIN};
        transition-duration: 0.3s;
      }
    `}
  ${(props) =>
    props.sub &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.6);
        transition-duration: 0.3s;
      }
    `}
`
