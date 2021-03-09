import isPropValid from "@emotion/is-prop-valid"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { SERVICE_COLORS } from "../lib/Color"
import { breakpointDown } from "../lib/Format"

export const Heading1Style = styled.h1`
  color: ${rgba(SERVICE_COLORS.FONT, 1)};
  font-size: 26px;
  font-weight: bold;
  line-height: 1.7;
  margin: 36px 0 28px 0;
  &:first-of-type {
    margin: 0 0 28px 0;
  }

  ${breakpointDown("sm")} {
    font-size: 20px;
    line-height: 1.5;
    margin: 32px 0 24px 0;
    &:first-of-type {
      font-size: 20px;
      margin: 0 0 24px 0;
    }
  }
`

export const Heading2Style = styled("h2", { shouldForwardProp: isPropValid })<{
  required?: true
}>`
  color: ${rgba(SERVICE_COLORS.FONT, 0.4)};
  font-size: 22px;
  font-weight: bold;
  line-height: 1.7;
  margin: 36px 0 14px 0;
  &:first-of-type {
    margin: 10px 0 14px 0;
  }
  ${breakpointDown("sm")} {
    font-size: 18px;
    line-height: 1.6;
    margin: 30px 0 10px 0;
    &:first-of-type {
      margin: 18px 0 10px 0;
    }
  }

  ${(props) =>
    props.required &&
    css`
      position: relative;

      &:after {
        background-color: ${SERVICE_COLORS.MAIN};
        border-radius: 40px;
        color: ${SERVICE_COLORS.BASE};
        content: "必須";
        font-size: 10px;
        font-weight: normal;
        margin: 7px 0 0 10px;
        padding: 4px 10px;
        position: absolute;
        text-align: center;
        width: 25px;

        ${breakpointDown("sm")} {
          margin: 2px 0 0 10px;
        }
      }
    `}
`

export const Heading3Style = styled.h3`
  color: ${rgba(SERVICE_COLORS.FONT, 0.4)};
  font-size: 18px;
  line-height: 1.7;
  margin: 30px 0 0;

  ${breakpointDown("sm")} {
    &:first-of-type {
    }
  }
`
