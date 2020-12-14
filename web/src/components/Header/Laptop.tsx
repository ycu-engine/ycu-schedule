import { getMultiClasss } from '@/lib/styles'
import { useReadOnlyAuth } from '@/store/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styles from './index.module.scss'

type NavigationItemProps = {
  href: string
  label: string
  member?: boolean
}

const NavigationItem = ({ href, label, member }: NavigationItemProps) => {
  const router = useRouter()
  const isActive = useMemo(() => router.route == href, [router.route, href])

  return (
    <Link href={href}>
      <a
        className={getMultiClasss(
          styles,
          'header__laptop__navigation__item',
          isActive && 'is-displayed',
          member === false && styles['non-member']
        )}>
        {label}
      </a>
    </Link>
  )
}

export const Laptop = () => {
  const { isAuthenticated, isStaff, isStudent } = useReadOnlyAuth()

  return (
    <nav className={styles['header__laptop']}>
      {isAuthenticated ? (
        <div className={styles['header__laptop__navigation--member']}>
          {isStudent ? (
            <NavigationItem href='/schedule' label='🗓 時間割' />
          ) : null}
          <NavigationItem href='/event' label='🗓 イベント' />
          <NavigationItem href='/profile' label='😊 ユーザー情報' />
          <NavigationItem href='/notify' label='💬 通知設定' />
          <NavigationItem href='/password_change' label='🔓 パスワード変更' />
          <NavigationItem href='/readme' label='🙏️ 利用上の注意' />
          {isStaff ? <NavigationItem href='/staff' label='🛠 管理画面' /> : null}
        </div>
      ) : (
        <div className={styles['header__laptop__navigation--non-member']}>
          <NavigationItem href='/signin' label='🔑 ログイン' member={false} />
        </div>
      )}
    </nav>
  )
}
