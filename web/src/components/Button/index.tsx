import { getMultiClasss } from '@/lib/styles'
import { FC } from 'react'
import styles from './index.module.scss'

type SimpleButtonProps = {
  onClick?: () => void
  rounded?: boolean
}
export const SimpleButton: FC<SimpleButtonProps> = ({
  children,
  onClick,
  rounded
}) => {
  return (
    <button
      className={getMultiClasss(styles, 'button', rounded && 'rounded')}
      onClick={onClick}>
      {children}
    </button>
  )
}
