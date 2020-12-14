import Link from 'next/link'
import styles from './index.module.scss'

const Text = () => {
  return <p className={styles['header__brand-name__text']}>YCU Schedule</p>
}

export const BrandName = () => {
  return (
    <Link href='/'>
      <a className={styles['header__brand-name']}>
        <Text />
      </a>
    </Link>
  )
}
