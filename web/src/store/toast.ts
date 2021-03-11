import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilCallback,
} from "recoil"
import { randomStr } from "~/lib/string"
import { defaultToastLevel, IToast } from "~/model/toast"

const toastLevelState = atomFamily<IToast["level"], IToast["id"]>({
  key: "toastLevelState",
  default: defaultToastLevel,
})

const toastTextState = atomFamily<IToast["text"], IToast["id"]>({
  key: "toastTextState",
  default: "",
})

const toastCreateAtState = atomFamily<IToast["createdAt"], IToast["id"]>({
  key: "toastCreateAtState",
  default: () => Date.now(),
})

const toastIds = atom<IToast["id"][]>({
  key: "toastIds",
  default: [],
})

const toastState = selectorFamily<IToast, IToast["id"]>({
  key: "toastState",
  get: (id) => ({ get }) => ({
    id,
    level: get(toastLevelState(id)),
    text: get(toastTextState(id)),
    createdAt: get(toastCreateAtState(id)),
  }),
})

export const toastsState = selector<IToast[]>({
  key: "toastsState",
  get: ({ get }) => {
    const ids = get(toastIds)
    const toasts = ids.map((id) => get(toastState(id)))
    toasts.sort((a, b) => a.createdAt - b.createdAt)
    return toasts
  },
})

export const useToast = (): {
  createToast: (value: Pick<IToast, "level" | "text">) => () => void
  removeToast: (id: string) => void
} => {
  const createToast = useRecoilCallback(
    ({ set }) => (value: Pick<IToast, "level" | "text">) => {
      const id = randomStr()
      set(toastLevelState(id), value.level)
      set(toastTextState(id), value.text)
      set(toastCreateAtState(id), Date.now())
      set(toastIds, (ids) => [...ids, id])

      return () => removeToast(id)
    }
  )

  const removeToast = useRecoilCallback(
    ({ reset, set }) => (id: IToast["id"]) => {
      reset(toastLevelState(id))
      reset(toastTextState(id))
      reset(toastCreateAtState(id))
      set(toastIds, (ids) => ids.filter((v) => v !== id))
    }
  )
  return { createToast, removeToast }
}
