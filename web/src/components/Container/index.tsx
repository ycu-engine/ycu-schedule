import { FC } from 'react'
import styles from './index.module.scss'

export const Container: FC<{}> = ({ children }) => {
  return <div className={styles['container']}>{children}</div>
}
