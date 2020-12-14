import { getMultiClasss } from '@/lib/styles'
import { useReadOnlyAuth } from '@/store/user'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import styles from './index.module.scss'

type NavigationButtonProps = {
  open: 'closed' | 'open'
  setOpen: Dispatch<SetStateAction<'closed' | 'open'>>
}

const NavigationButton = ({ open, setOpen }: NavigationButtonProps) => {
  const toggle = () => setOpen(open === 'closed' ? 'open' : 'closed')

  return (
    <div
      className={styles[`header__mobile__navigation-button--${open}`]}
      onClick={toggle}
    />
  )
}

type NavigationItemProps = {
  href: string
  label: string
  onClick: () => void
  member?: boolean
}

const NavigationItem = ({
  href,
  label,
  member,
  onClick
}: NavigationItemProps) => {
  const router = useRouter()
  const isActive = useMemo(() => router.route == href, [router.route, href])

  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className={getMultiClasss(
          styles,
          'header__mobile__navigation__item',
          isActive && 'is-displayed',
          member === false && 'non-member'
        )}>
        {label}
      </a>
    </Link>
  )
}

export const Mobile = () => {
  const { isAuthenticated, isStaff, isStudent } = useReadOnlyAuth()
  const [open, setOpen] = useState<'closed' | 'open'>('closed')

  return (
    <nav className={styles['header__mobile']}>
      {isAuthenticated ? (
        <>
          <NavigationButton setOpen={setOpen} open={open} />
          {open === 'open' ? (
            <div className={styles['header__mobile__navigation--member']}>
              {isStudent ? (
                <NavigationItem
                  href='/schedule'
                  label='🗓 時間割'
                  onClick={() => setOpen('closed')}
                />
              ) : null}
              <NavigationItem
                href='/event'
                label='🗓 イベント'
                onClick={() => setOpen('closed')}
              />
              <NavigationItem
                href='/profile'
                label='😊 ユーザー情報'
                onClick={() => setOpen('closed')}
              />
              <NavigationItem
                href='/notify'
                label='💬 通知設定'
                onClick={() => setOpen('closed')}
              />
              <NavigationItem
                href='/password_change'
                label='🔓 パスワード変更'
                onClick={() => setOpen('closed')}
              />
              <NavigationItem
                href='/readme'
                label='🙏️ 利用上の注意'
                onClick={() => setOpen('closed')}
              />
              {isStaff ? (
                <NavigationItem
                  href='/staff'
                  label='🛠 管理画面'
                  onClick={() => setOpen('closed')}
                />
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <div className={styles['header__mobile__navigation--non-member']}>
          <NavigationItem
            href='/signin'
            label='🔑 ログイン'
            member={false}
            onClick={() => setOpen('closed')}
          />
        </div>
      )}
    </nav>
  )
}
