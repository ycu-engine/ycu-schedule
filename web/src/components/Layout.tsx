import { useMounted } from '@/lib/life-cycle'
import { useAuth } from '@/store/user'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import { Card } from './Card'
import { Paragraph } from './Typography'

type AuthInitializeProps = {
  notMounted?: JSX.Element
}

const AuthInitialize = ({ notMounted }: AuthInitializeProps) => {
  const { initialized } = useAuth()
  const isMounted = useMounted()

  if (!isMounted)
    return (
      notMounted || (
        <Card>
          <Paragraph>Wait...</Paragraph>
        </Card>
      )
    )
  if (!initialized)
    return (
      <Card>
        <Paragraph>初期化中...</Paragraph>
      </Card>
    )
  return true
}

type LoginRequiredProps = AuthInitializeProps & {}

export const LoginRequired = (props: LoginRequiredProps) => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const auth = AuthInitialize(props)
  if (auth !== true) return auth
  if (!isAuthenticated) {
    router.push({ pathname: '/signin', query: { next: router.asPath } })
    return (
      <Card>
        <Paragraph>遷移中...</Paragraph>
      </Card>
    )
  }
  return true
}

type LoginRequiredComponentProps = LoginRequiredProps & {}

export const LoginRequiredComponent: FC<LoginRequiredComponentProps> = ({
  children,
  ...rest
}) => {
  const loggedin = LoginRequired(rest)
  if (loggedin !== true) return loggedin
  return <>{children}</>
}

type StaffOnlyProps = LoginRequiredProps & {}

export const StaffOnly = (props: StaffOnlyProps) => {
  const { isStaff } = useAuth()
  const loggedin = LoginRequired(props)
  const router = useRouter()

  if (loggedin !== true) return loggedin
  if (!isStaff) {
    router.push({
      pathname: '/403',
      query: {
        subject: 'スタッフ専用ページ',
        from: router.asPath,
        description:
          'スタッフ以外のユーザーはスタッフ専用ページにアクセスすることができません。'
      }
    })
    return (
      <Card>
        <Paragraph>遷移中...</Paragraph>
      </Card>
    )
  }
  return true
}

type StaffOnlyComponentProps = StaffOnlyProps & {}

export const StaffOnlyComponent: FC<StaffOnlyComponentProps> = ({
  children,
  ...rest
}) => {
  const staff = StaffOnly(rest)

  if (staff !== true) return staff
  return <>{children}</>
}

type StudentOnlyProps = LoginRequiredProps & {}

export const StudentOnly = (props: StudentOnlyProps) => {
  const { isStudent } = useAuth()
  const loggedin = LoginRequired(props)
  const router = useRouter()

  if (loggedin !== true) return loggedin
  if (!isStudent) {
    router.push({
      pathname: '/403',
      query: {
        subject: '学生専用ページ',
        from: router.asPath,
        description:
          '学生以外のユーザーは学生専用ページにアクセスすることができません。'
      }
    })
    return (
      <Card>
        <Paragraph>遷移中...</Paragraph>
      </Card>
    )
  }
  return true
}

type StudentOnlyComponentProps = StudentOnlyProps & {}

export const StudentOnlyComponent: FC<StudentOnlyComponentProps> = ({
  children,
  ...rest
}) => {
  const student = StaffOnly(rest)

  if (student !== true) return student
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
