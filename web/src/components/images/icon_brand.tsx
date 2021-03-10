import { css } from "@emotion/react"
import { StaticImage } from "gatsby-plugin-image"
import { breakpointDown } from "../lib/Format"

export const IconBrand = (): JSX.Element => {
  return (
    <StaticImage
      css={css`
        height: 36px;
        position: absolute;
        left: 2vw;
        width: 36px;
        ${breakpointDown("sm")} {
          height: 24px;
          width: 24px;
        }
        ${breakpointDown("xl")} {
          height: 30px;
          width: 30px;
        }
      `}
      height={760}
      width={760}
      src="../../images/icon_brand.png"
      alt="brand icon"
    />
  )
}
