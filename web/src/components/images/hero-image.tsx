import { css } from "@emotion/react"
import { StaticImage } from "gatsby-plugin-image"
import { breakpointDown, breakpointUp } from "../lib/Format"

export const HeroImage01 = (): JSX.Element => {
  return (
    <StaticImage
      css={css`
        height: 500px;
        width: 100%;
        position: absolute;
        z-index: -1;
        ${breakpointDown("sm")} {
          display: none;
        }
      `}
      height={500}
      src="../../images/hero-image_01.png"
      alt="hero-image"
    />
  )
}

export const HeroImage02 = (): JSX.Element => {
  return (
    <StaticImage
      css={css`
        height: 600px;
        width: 100%;
        position: absolute;
        z-index: -1;
        ${breakpointUp("sm")} {
          display: none;
        }
      `}
      height={600}
      src="../../images/hero-image_02.png"
      alt="hero-image"
    />
  )
}
