export type ToastLevel = "info" | "error" | "success"

export const defaultToastLevel: ToastLevel = "info"

export interface IToast {
  id: string
  level: ToastLevel
  text: string
  createdAt: number
}
