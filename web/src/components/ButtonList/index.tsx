import { getMultiClasss } from '@/lib/styles'
import { FC } from 'react'
import styles from './index.module.scss'

export const ButtonList: FC = ({ children }) => {
  return <section className={styles['button-list']}>{children}</section>
}

type SimpleButtnoProps = { main?: boolean; sub?: boolean }

export const SimpleButton: FC<SimpleButtnoProps> = ({
  children,
  main,
  sub
}) => {
  return (
    <button
      className={getMultiClasss(
        styles,
        main && 'button--main',
        sub && 'button--sub'
      )}>
      {children}
    </button>
  )
}

type FormButtonProps = SimpleButtnoProps & {
  formId?: string
}

export const FormButton: FC<FormButtonProps> = ({
  children,
  main,
  sub,
  formId
}) => {
  return (
    <button
      form={formId}
      type='submit'
      className={getMultiClasss(
        styles,
        main && 'button--main',
        sub && 'button--sub'
      )}>
      {children}
    </button>
  )
}
