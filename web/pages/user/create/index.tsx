import { ButtonList, FormButton } from '@/components/ButtonList'
import { Card } from '@/components/Card'
import { UserCreateForm } from '@/components/forms/UserCreate'
import { Heading1, Link, Paragraph } from '@/components/Typography'
import { siteTitle } from '@/lib/site-title'
import Head from 'next/head'

const UserCreatePage = () => {
  return (
    <>
      <Head>
        <title>{siteTitle('ユーザー作成')}</title>
      </Head>
      <Card>
        <Heading1>🎉 新規アカウント作成</Heading1>
        <UserCreateForm formId='user-create' />
        <ButtonList>
          <Paragraph>
            <Link href='/readme'>利用上の注意</Link>を確認した上で
          </Paragraph>
          <FormButton formId='user-create' main>
            アカウントを作成する
          </FormButton>
        </ButtonList>
        <ButtonList>
          <ul>
            <li>
              <Paragraph>
                確認コードの入力は
                <Link href='/user/create/confirm'>こちら</Link>
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                団体アカウント作成は
                <Link href='/group/create'>こちら</Link>
              </Paragraph>
            </li>
          </ul>
        </ButtonList>
      </Card>
    </>
  )
}

export default UserCreatePage
