import { getMultiClasss } from '@/lib/styles'
import { FC } from 'react'
import styles from './index.module.scss'

type CardProps = {
  alpha?: boolean
}

export const Card: FC<CardProps> = ({ children, alpha }) => {
  return (
    <section className={getMultiClasss(styles, 'card', alpha && 'alpha')}>
      {children}
    </section>
  )
}
