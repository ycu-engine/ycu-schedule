import { AiOutlineCloseCircle } from "react-icons/ai"
import { IToast } from "~/model/toast"
import { useToast } from "~/store/toast"
import {
  ToastCloseStyle,
  ToastIcon,
  ToastIconStyle,
  ToastStyle,
  ToastTextStyle,
} from "../atoms/Toast"

type ToastProps = {
  toast: IToast
}

export const Toast = ({ toast }: ToastProps): JSX.Element => {
  const { removeToast } = useToast()
  return (
    <ToastStyle level={toast.level}>
      <ToastIconStyle>
        <ToastIcon level={toast.level} />
      </ToastIconStyle>
      <ToastTextStyle>{toast.text}</ToastTextStyle>
      <ToastCloseStyle onClick={() => removeToast(toast.id)}>
        <AiOutlineCloseCircle />
      </ToastCloseStyle>
    </ToastStyle>
  )
}
