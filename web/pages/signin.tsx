import { ButtonList, FormButton } from '@/components/ButtonList'
import { Card } from '@/components/Card'
import { SigninForm } from '@/components/forms/SigninForm'
import { Heading1, Link, Paragraph } from '@/components/Typography'
import { siteTitle } from '@/lib/site-title'
import Head from 'next/head'

const SigninPage = () => {
  return (
    <>
      <Head>
        <title>{siteTitle('ログイン')}</title>
      </Head>
      <Card>
        <Heading1>🔑 ログインする</Heading1>
        <SigninForm id='signin' />
        <Paragraph>
          パスワードを忘れてしまった方は
          <Link href='/password_reset'>こちらからパスワードリセット</Link>
          を行ってください。
        </Paragraph>
      </Card>
      <ButtonList>
        <FormButton formId='signin' main>
          ログイン
        </FormButton>
      </ButtonList>
      <Card>
        <Heading1>🎉 新規アカウント作成</Heading1>
        <Paragraph>
          はじめて YCU スケジュールを利用する場合は、
          <Link href='/user/create'>こちらから新規アカウントを作成</Link>
          してください。
        </Paragraph>
        <Paragraph>
          団体登録をする場合は、
          <Link href='/group/create'>こちらから新規団体アカウントを作成</Link>
          してください。
        </Paragraph>
      </Card>
    </>
  )
}

export default SigninPage
