import { ButtonList, FormButton } from '@/components/ButtonList'
import { Card } from '@/components/Card'
import { UserCreateConfirmForm } from '@/components/forms/UserCreate/confirm'
import { Heading1 } from '@/components/Typography'
import { siteTitle } from '@/lib/site-title'
import Head from 'next/head'
import { useRouter } from 'next/router'

const UserCreateConfirmPage = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{siteTitle('ユーザー作成 | 確認')}</title>
      </Head>
      <Card>
        <Heading1>📮 Emailアドレスの確認</Heading1>
        <UserCreateConfirmForm
          formId='user-create-confirm'
          email={String(router.query.email || '')}
        />
        <ButtonList>
          <FormButton formId='user-create-confirm' main>
            認証する
          </FormButton>
        </ButtonList>
      </Card>
    </>
  )
}

export default UserCreateConfirmPage
