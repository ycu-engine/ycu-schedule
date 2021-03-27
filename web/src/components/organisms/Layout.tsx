import { css, Global } from "@emotion/react"
import emotionReset from "emotion-reset"
import { FC, Fragment } from "react"
import { ContainerStyle } from "../atoms/Container"
import { Footer } from "../molecules/Footer"
import { Header } from "./Header"
import { ToastList } from "./Toast"

export const Layout: FC = ({ children }) => {
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
