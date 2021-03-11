import { useMsal } from "@azure/msal-react"
import { Fragment, memo } from "react"
import { Button, ButtonList } from "~/components/molecules/Button"
import { Card } from "~/components/molecules/Card"
import { Heading1 } from "~/components/molecules/Heading"
import { InnerLink, Paragraph } from "~/components/molecules/Typography"
import { SEO } from "~/components/organisms/SEO"
import { loginRequest } from "~/lib/msal"
import { useToast } from "~/store/toast"

const LoginPageBody = memo(() => {
  const { createToast } = useToast()
  const { instance, accounts, inProgress } = useMsal()

  if (accounts.length > 0) {
    const account = accounts[0]
    return (
      <Fragment>
        <Card>
          <Paragraph>
            {account.username}
            でログインしています！
            <br />
            アカウントが違う場合やログアウトする場合は下のボタンをクリックしてください。
          </Paragraph>
        </Card>
        <ButtonList>
          <Button as="button" main onClick={() => instance.logout()}>
            ログアウト
          </Button>
        </ButtonList>
      </Fragment>
    )
  } else if (inProgress === "login") {
    return (
      <Card>
        <Paragraph>ただいまログイン処理中です...</Paragraph>
      </Card>
    )
  } else {
    return (
      <Fragment>
        <Card>
          <Paragraph>
            会員登録は不要でMicrosoftのアカウントでログインするだけで、すぐに利用を開始することができます。
            <br />
            <InnerLink to="/readme">利用上の注意</InnerLink>
            を確認した上でYCUスケジュールの利用を開始しましょう。
          </Paragraph>
        </Card>
        <ButtonList>
          <Button
            as="button"
            onClick={async () => {
              try {
                await instance.loginPopup(loginRequest)
                createToast({
                  level: "success",
                  text: "ログインに成功しました",
                })
              } catch (e) {
                if (e.errorCode === "user_cancelled") {
                  createToast({
                    level: "info",
                    text: "ログインがキャンセルされました",
                  })
                } else {
                  console.dir(e)
                  createToast({
                    level: "error",
                    text: "ログインに失敗しました",
                  })
                }
              }
            }}
            main
          >
            ログイン
          </Button>
        </ButtonList>
      </Fragment>
    )
  }
})

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
      </Card>
      <LoginPageBody />
    </Fragment>
  )
}

export default LoginPage
