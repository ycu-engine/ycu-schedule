import { useReadOnlyAuth } from '@/store/user'
import Link from 'next/link'
import styles from './index.module.scss'

type ButtonListItemProps = {
  main?: boolean
  sub?: boolean
  href: string
  label: string
}

const ButtonListItem = ({ href, main, label, sub }: ButtonListItemProps) => {
  return (
    <Link href={href}>
      <a
        className={`${styles['hero-image__button-list__item']} ${
          main === true && 'main'
        } ${sub === true && 'sub'}`}>
        {label}
      </a>
    </Link>
  )
}

export const HeroImage = () => {
  const { isAuthenticated, isStudent, memberOfClubs } = useReadOnlyAuth()
  return (
    <section className={styles['hero-image']}>
      <h1 className={styles['hero-image__main-copy']}>
        横浜市大生のための
        <br />
        授業管理ツール
      </h1>
      <p className={styles['hero-image__body-copy']}>
        YCUスケジュールは横浜市立大学の非公式のアプリです。
        履修しているZoomのID一元管理、もうZoomのIDを覚える必要はありません。
        LINE友達登録をすれば講義の直前にURLを通知してもらえるから、時間割の概念が変わります。
      </p>
      <div className={styles['hero-image__button-list']}>
        {isAuthenticated && isStudent ? (
          <ButtonListItem href='/schedule' label='時間割を確認する' main />
        ) : isAuthenticated && memberOfClubs.length > 0 ? (
          <ButtonListItem
            href='/event/create'
            label='イベントを作成する'
            main
          />
        ) : (
          <ButtonListItem href='/user/create' label='新規アカウント作成' main />
        )}

        <ButtonListItem href='/readme' label='利用上の注意' sub />
      </div>
    </section>
  )
}
