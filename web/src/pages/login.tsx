import { Fragment } from "react"
import { Card } from "~/components/molecules/Card"
import { Heading1 } from "~/components/molecules/Heading"
import { InnerLink, Paragraph } from "~/components/molecules/Typography"
import { SEO } from "~/components/organisms/SEO"

const LoginPage = (): JSX.Element => {
  return (
    <Fragment>
      <SEO title="ログイン" />
      <Card>
        <Heading1>🔑 ログイン</Heading1>
        <Paragraph>
          YCUスケジュールは横浜市立大学の学生だということを確認するためにMicrosoftでのログインが必要です。
          <br />
          また、 yokohama-cu.ac.jp 以外のアカウントでは利用できません。
        </Paragraph>
        <Paragraph>
          YCUスケジュールは現在サービスを停止しています。
          <br />
          詳しくは、
          <InnerLink to="/news/2021-03-24_shutdown">
            サービス停止について
          </InnerLink>
          をご覧ください。
        </Paragraph>
      </Card>
      {/* <LoginPageBody /> */}
    </Fragment>
  )
}

export default LoginPage
