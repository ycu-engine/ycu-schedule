import { FC } from 'react'
import styles from './index.module.scss'

export const Callout: FC = ({ children }) => {
  return (
    <section className={styles['callout']}>
      <p className={styles['callout__inner']}>{children}</p>
    </section>
  )
}
