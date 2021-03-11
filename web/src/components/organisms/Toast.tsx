import { useRecoilValue } from "recoil"
import { toastsState } from "~/store/toast"
import { ToastWrapperStyle } from "../atoms/Toast"
import { Toast } from "../molecules/Toast"

export const ToastList = (): JSX.Element => {
  const toasts = useRecoilValue(toastsState)

  return (
    <ToastWrapperStyle>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </ToastWrapperStyle>
  )
}
