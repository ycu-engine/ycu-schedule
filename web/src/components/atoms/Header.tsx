import isPropValid from "@emotion/is-prop-valid"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import { Link } from "gatsby"
import { FC } from "react"
import IconBrand from "~/images/icon_brand.png"
import IconMenuClosed from "~/images/icon_menu-closed.svg"
import IconMenuOpen from "~/images/icon_menu-open.svg"
import { SERVICE_COLORS } from "../lib/Color"
import { breakpointDown } from "../lib/Format"

export const HeaderStyle = styled.header`
  align-items: center;
  background-color: ${SERVICE_COLORS.BASE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  height: 70px;
  justify-content: space-between;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;

  ${breakpointDown("sm")} {
    height: 50px;
  }
`

export const HeaderBrandNameStyle = styled(Link)`
  align-items: center;
  color: ${SERVICE_COLORS.BASE};
  background-color: ${SERVICE_COLORS.MAIN};
  display: flex;
  height: 70px;
  justify-content: center;
  letter-spacing: 1px;
  max-width: 400px;
  position: relative;
  width: 20vw;
  ${breakpointDown("sm")} {
    width: 220px;
    height: 50px;
  }
  ${breakpointDown("xl")} {
    width: 240px;
  }
  &::before {
    background-image: url(${IconBrand});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
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
  }

  &::after {
    border-color: transparent transparent #fff transparent;
    border-style: solid;
    border-width: 0 0 140px 100px;
    bottom: 0;
    content: "";
    height: 0;
    position: absolute;
    right: -50px;
    width: 0;
    ${breakpointDown("sm")} {
      right: -60px;
    }
  }
`

export const HeaderBrandNameTextStyle = styled.p`
  font-size: 18px;
  font-weight: bold;
  left: 5vw;
  position: absolute;
  ${breakpointDown("sm")} {
    font-size: 16px;
    left: 46px;
  }
  ${breakpointDown("lg")} {
    font-size: 16px;
    left: 56px;
  }
`

export const HeaderLaptopStyle = styled.nav`
  display: block;
  z-index: 100;
  ${breakpointDown("lg")} {
    display: none;
  }
`

const HeaderLaptopNavigationStyle = styled.div`
  align-items: center;
  display: flex;
  max-width: 1280px;
  overflow: scroll;
  width: 70vw;
  ${breakpointDown("xl")} {
    margin: 0 20px 0 0;
    width: calc(100vw - 310px);
  }
`

export const HeaderLaptopNavigationMemberStyle = styled(
  HeaderLaptopNavigationStyle
)`
  margin: 0 40px 0 0;
  justify-content: space-around;
`

export const HeaderLaptopNavigationNonMemberStyle = styled(
  HeaderLaptopNavigationStyle
)`
  margin: 0 40px 0 0;
  justify-content: flex-end;
`

const HeaderLaptopNavigationItemStyle_ = styled(Link)`
  align-items: center;
  border: 1px solid ${rgba(SERVICE_COLORS.MAIN, 0)};
  border-radius: 4px;
  color: ${SERVICE_COLORS.FONT};
  display: flex;
  font-size: 15px;
  font-weight: bold;
  height: 40px;
  justify-content: center;
  padding: 0 14px;
  transition-duration: 0.5s;
  white-space: nowrap;
  ${breakpointDown("xl")} {
    font-size: 14px;
    padding: 0 10px;
  }
  &:hover {
    background-color: ${rgba(SERVICE_COLORS.MAIN, 0.1)};
    color: ${SERVICE_COLORS.MAIN};
    cursor: pointer;
    transition-duration: 0.3s;
  }
`

const headerLaptopNavigationItemIsActiveStyle = css`
  background-color: ${rgba(SERVICE_COLORS.MAIN, 0.1)};
  color: ${SERVICE_COLORS.MAIN};
  cursor: pointer;
  transition-duration: 0.3s;

  &:hover {
    border: 1px solid ${rgba(SERVICE_COLORS.MAIN, 0.4)};
    color: ${SERVICE_COLORS.MAIN};
    transition-duration: 0.3s;
  }
`

export const HeaderLaptopNavigationItemStyle: FC<
  Parameters<typeof HeaderLaptopNavigationItemStyle_>["0"]
> = ({ ...props }) => {
  return (
    <HeaderLaptopNavigationItemStyle_
      //   getProps={({ isPartiallyCurrent }) => {
      //     console.log(isPartiallyCurrent, className)
      //     return {
      //       className: isPartiallyCurrent
      //         ? `${className} ${headerLaptopNavigationItemIsActive}`
      //         : className || "",
      //     }
      //   }}
      activeStyle={headerLaptopNavigationItemIsActiveStyle}
      partiallyActive
      {...props}
    />
  )
}

export const HeaderMobileStyle = styled.div`
  display: none;
  z-index: 100;
  ${breakpointDown("lg")} {
    display: block;
  }
`

const HeaderMobileNavigationButtonStyle = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: none;
  height: 50px;
  margin: 0 10px 0 0;
  width: 50px;

  ${breakpointDown("sm")} {
    height: 40px;
    width: 40px;
  }
`

export const HeaderMobileNavigationButtonClosedStyle = styled(
  HeaderMobileNavigationButtonStyle
)<{
  visible: boolean
}>`
  background-image: url(${IconMenuClosed});
  ${(props) =>
    props.visible &&
    css`
      display: block;
    `}
`

export const HeaderMobileNavigationButtonOpenStyle = styled(
  HeaderMobileNavigationButtonStyle
)<{
  visible: boolean
}>`
  background-image: url(${IconMenuOpen});
  ${(props) =>
    props.visible &&
    css`
      display: block;
    `}
`

const HeaderMobileNavigationStyle = styled.div`
  background-color: ${SERVICE_COLORS.BASE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  display: none;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 0;
  width: 100vw;

  ${breakpointDown("sm")} {
    top: 50px;
  }
`

export const HeaderMobileNavigationMemberStyle = styled(
  HeaderMobileNavigationStyle,
  { shouldForwardProp: isPropValid }
)<{ visible: boolean }>`
  ${(props) =>
    props.visible &&
    css`
      display: block;
    `}
`

export const HeaderMobileNavigationNonMemberStyle = styled(
  HeaderMobileNavigationStyle
)`
  box-shadow: none;
  display: flex;
  margin: 0 20px 0 0;
  position: inherit;
  width: 180px;

  ${breakpointDown("sm")} {
    width: 120px;
  }
`

export const HeaderMobileNavigationItemStyle = styled(Link, {
  shouldForwardProp: isPropValid,
})<{
  nonMember?: true
}>`
  align-items: center;
  background-color: ${rgba(SERVICE_COLORS.BASE, 1)};
  border-bottom: 1px solid ${rgba(SERVICE_COLORS.MAIN, 0.1)};
  border-radius: 4px;
  color: ${SERVICE_COLORS.FONT};
  display: flex;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  padding: 40px 0;
  transition-duration: 0.3s;
  white-space: nowrap;

  ${breakpointDown("sm")} {
    border: none;
    padding: 30px 0;
  }
  ${(props) =>
    props.nonMember &&
    css`
      font-size: 16px;
      padding: 10px 0;
    `}
`
