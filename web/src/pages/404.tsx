/* eslint-disable no-undef */
import { Link } from "gatsby"
import { Heading1Style } from "~/components/atoms/Heading"
import { MainPageStyle } from "~/components/atoms/MainPage"
import { CodeStyle, ParagraphStyle } from "~/components/atoms/Typography"

const NotFoundPage = (): JSX.Element => {
  return (
    <MainPageStyle>
      <title>Not found</title>
      <Heading1Style>Page not found</Heading1Style>
      <ParagraphStyle>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <CodeStyle>src/pages/</CodeStyle>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </ParagraphStyle>
    </MainPageStyle>
  )
}

export default NotFoundPage
