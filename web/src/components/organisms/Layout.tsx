import { css, Global } from "@emotion/react"
import emotionReset from "emotion-reset"
import { FC, Fragment, useEffect } from "react"
import { ContainerStyle } from "../atoms/Container"
import { Footer } from "../molecules/Footer"
import { Header } from "./Header"
import { ToastList } from "./Toast"

export const Layout: FC = ({ children }) => {
  useEffect(() => {
    const location = (window as any).location
    if (location.hostname === "ycu-schedule.com") {
      location.replace(`https://www.ycu-schedule.com${location.pathname}`)
    }
  }, [])
  return (
    <Fragment>
      <Global
        styles={css`
          ${emotionReset}
          a {
            text-decoration: none;
          }
        `}
      />
      <Header />
      <ToastList />
      <ContainerStyle>{children}</ContainerStyle>
      <Footer />
    </Fragment>
  )
}
