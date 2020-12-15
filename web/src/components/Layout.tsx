import { useMounted } from '@/lib/life-cycle'
import { useAuth } from '@/store/user'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import { Card } from './Card'
import { Paragraph } from './Typography'

export const StaffOnly: FC = ({ children }) => {
  const { isLoading, isStaff, initialized } = useAuth()
  const router = useRouter()
  const isMounted = useMounted()

  if (!isMounted) {
    return (
      <Card>
        <Paragraph>Wait...</Paragraph>
      </Card>
    )
  }
  if (!initialized) {
    return (
      <Card>
        <Paragraph>初期化中...</Paragraph>
      </Card>
    )
  }
  if (isLoading) {
    return (
      <Card>
        <Paragraph>読み込み中...</Paragraph>
      </Card>
    )
  }
  if (!isStaff) {
    router.push({ pathname: '/signin', query: { next: router.asPath } })
    return null
  }
  return <>{children}</>
}

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'YCUスケジュール ' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'>
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href='/about'>
          <a>About</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
