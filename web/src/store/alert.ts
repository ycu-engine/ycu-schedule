import { AlertType } from '@/interfaces/alert'
import { atom, useRecoilState } from 'recoil'

const AlertAtom = atom<AlertType[]>({
  key: 'AlertAtom',
  default: []
})

let id = 0

const _useAlert = () => {
  const [alerts, setAlerts] = useRecoilState(AlertAtom)

  const addAlert = (alert: Omit<AlertType, 'id'>) => {
    setAlerts([...alerts, { ...alert, id }])
    id++
  }
  const deleteAlert = (idx: number) => {
    alerts.splice(idx, 1)
    setAlerts(alerts)
  }

  return {
    alerts,
    addAlert,
    deleteAlert
  }
}

export const useShowAlert = () => {
  const { alerts } = _useAlert()

  return { alerts }
}

export const useAddAlert = () => {
  const { addAlert } = _useAlert()

  return {
    addAlert
  }
}

export const useDeleteAlert = () => {
  const { deleteAlert } = _useAlert()

  return {
    deleteAlert
  }
}
