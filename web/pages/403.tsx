import { Card } from '@/components/Card'
import { Heading1, Heading2, Link, Paragraph } from '@/components/Typography'
import styles from '@/components/Typography/index.module.scss'
import { siteTitle } from '@/lib/site-title'
import { useAuth } from '@/store/user'
import Head from 'next/head'
import { useRouter } from 'next/router'

const _403Page = () => {
  const router = useRouter()
  const { signOut } = useAuth()
  const subject = String(router.query.subject || '詳細がありません。')
  const description = String(router.query.description || '詳細がありません。')
  const from = String(router.query.from || '')

  return (
    <>
      <Head>
        <title>{siteTitle('403 Permission denied')}</title>
      </Head>
      <Card>
        <Heading1>🙅 ページにアクセスすることを許可されていません。</Heading1>
        <Paragraph>
          理由：<span style={{ display: 'inline-block' }}>{subject}</span>
          <br />
          みようとしたURL：
          <span style={{ display: 'inline-block' }}>
            {from || '詳細がありません。'}
          </span>
          <br />
          詳細：<span style={{ display: 'inline-block' }}>{description}</span>
        </Paragraph>
        <Paragraph>いくつか解決策を提示します。</Paragraph>
        <Heading2>{'1. 一度サインアウトしてログインしなおす。'}</Heading2>
        <Paragraph>
          <span
            onClick={async () => {
              await signOut()
              router.push({ pathname: '/signin', query: { next: from || '/' } })
            }}
            className={styles['link']}
            style={{ cursor: 'pointer' }}>
            こちら
          </span>
          を押して再度ログインしてみてください。
        </Paragraph>
        <Heading2>{'2. 上記の方法では解決しない場合'}</Heading2>
        <Paragraph>
          解決しない場合は
          <Link href='https://docs.google.com/forms/d/e/1FAIpQLSdzcqpam9HGKsNilspsf2wSi43ZPJqxUajBsfhm0pZbx-MZDQ/viewform'>
            お問い合わせ
          </Link>
          よりご相談ください。
        </Paragraph>
      </Card>
    </>
  )
}

export default _403Page
