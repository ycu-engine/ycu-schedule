import { AlertType } from '@/interfaces/alert'
import { useDeleteAlert, useShowAlert } from '@/store/alert'
import { useEffect } from 'react'
import styles from './index.module.scss'

type AlertProps = {
  alert: AlertType
  idx: number
}

const Alert = ({ idx, alert }: AlertProps) => {
  const { deleteAlert } = useDeleteAlert()

  const close = () => deleteAlert(idx)

  useEffect(() => {
    const id =
      alert.duration && alert.duration > 0
        ? setTimeout(close, alert.duration * 1000)
        : null
    return () => {
      if (id) {
        clearTimeout(id)
      }
    }
  })

  return (
    <div className={styles['flash-message']} role='alert'>
      <p>{alert.label}</p>
      {alert.close === true ? (
        <button type='button' className='close' onClick={close}>
          <span>&times;</span>
        </button>
      ) : null}
    </div>
  )
}

export const Alerts = () => {
  const { alerts } = useShowAlert()

  return (
    <>
      {alerts.map((alert, idx) => (
        <Alert alert={alert} idx={idx} key={alert.id} />
      ))}
    </>
  )
}
