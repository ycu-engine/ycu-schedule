import { getMultiClasss } from '@/lib/styles'
import { FC } from 'react'
import styles from './index.module.scss'

export const AlertMessageItem: FC<{ error?: boolean }> = ({
  children,
  error
}) => {
  return (
    <li
      className={getMultiClasss(
        styles,
        'alert-message__item',
        error && 'error'
      )}>
      {children}
    </li>
  )
}

export const AlertMessages: FC = ({ children }) => {
  return <ul className={styles['alert-message']}>{children}</ul>
}
