import { createElement, FC, useState } from 'react'
import { Card } from '../Card'
import styles from './index.module.scss'

type SimpleModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
}

export const SimpleModal: FC<SimpleModalProps> = ({
  open,
  setOpen,
  children
}) => {
  if (!open) return null
  return (
    <div className={styles['modal_wrapper']}>
      <Card alpha>
        <button
          className={styles['close_button']}
          onClick={() => setOpen(false)}>
          &times;
        </button>
        <div className={styles['modal_content']}>{children}</div>
      </Card>
    </div>
  )
}

type ModalProps = {
  activator: FC<{ onClick: () => void }>
}

export const Modal: FC<ModalProps> = ({ children, activator }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      {createElement(activator, { onClick: () => setOpen(true) })}
      <SimpleModal open={open} setOpen={setOpen}>
        {children}
      </SimpleModal>
    </>
  )
}
