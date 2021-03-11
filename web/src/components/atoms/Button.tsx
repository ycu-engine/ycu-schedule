import { css, SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { SERVICE_COLORS, SNS_COLORS } from "../lib/Color"
import { breakpointDown } from "../lib/Format"

export const ButtonListStyle = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 20px auto 60px;
  width: 960px;

  ${breakpointDown("lg")} {
    width: calc(100vw - 80px);
  }

  ${breakpointDown("sm")} {
    flex-direction: column-reverse;
  }
`

const ButtonCSS = css`
  align-items: center;
  border-radius: 40px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  height: 60px;
  justify-content: center;
  margin: 0 10px;
  transition-duration: 0.3s;
  width: 220px;
  ${breakpointDown("sm")} {
    margin: 5px 0;
    width: calc(100vw - 80px);
  }
`

export const ButtonMainCSS = css`
  ${ButtonCSS}
  background-color: ${SERVICE_COLORS.BASE};
  border: 3px solid ${SERVICE_COLORS.MAIN};
  color: ${SERVICE_COLORS.MAIN};

  &:hover {
    background-color: ${rgba(SERVICE_COLORS.MAIN, 1)};
    color: ${SERVICE_COLORS.BASE};
    transition-duration: 0.3s;
  }
`

export const ButtonSubCSS = css`
  ${ButtonCSS}
  background-color: ${rgba(SERVICE_COLORS.MAIN, 0.1)};
  border: 3px solid ${rgba(SERVICE_COLORS.MAIN, 0)};
  color: ${SERVICE_COLORS.MAIN};

  &:hover {
    background-color: ${rgba(SERVICE_COLORS.MAIN, 0.2)};
    transition-duration: 0.3s;
  }
`

export const ButtonLineCSS = css`
  ${ButtonCSS}
  background-color: ${rgba(SERVICE_COLORS.BASE, 1)};
  border: 3px solid ${rgba(SNS_COLORS.line, 1)};
  color: ${SNS_COLORS.line};

  &:hover {
    color: ${SERVICE_COLORS.BASE};
    background-color: ${rgba(SNS_COLORS.line, 1)};
    transition-duration: 0.3s;
  }
`

export type ButtonType = "main" | "sub" | "line"

export const getButtonCSS = (type?: ButtonType): SerializedStyles =>
  type === "main"
    ? ButtonMainCSS
    : type === "sub"
    ? ButtonSubCSS
    : type === "line"
    ? ButtonLineCSS
    : ButtonCSS
