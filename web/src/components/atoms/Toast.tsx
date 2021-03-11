import styled from "@emotion/styled"
import { rgba } from "emotion-rgba"
import type { IconBaseProps } from "react-icons"
import { AiOutlineCheckCircle, AiOutlineInfoCircle } from "react-icons/ai"
import { BiError } from "react-icons/bi"
import { ToastLevel } from "~/model/toast"
import {
  getColorNameWithLevel,
  SERVICE_COLORS,
  SYSTEM_COLORS,
} from "../lib/Color"
import { breakpointUp } from "../lib/Format"

type ToastIconProps = {
  level: ToastLevel
} & IconBaseProps

export const ToastIcon = ({ level, ...props }: ToastIconProps): JSX.Element => {
  if (level === "info") return <AiOutlineInfoCircle {...props} />
  if (level === "error") return <BiError {...props} />
  if (level === "success") return <AiOutlineCheckCircle {...props} />
  throw Error("toast level not found")
}

export const ToastWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  /* background-color: \${rgba(SERVICE_COLORS.MAIN, 0.8)}; */
  top: calc(50px + 10px);

  ${breakpointUp("sm")} {
    top: calc(70px + 10px);
  }
`

export const ToastStyle = styled.div<{ level: ToastLevel }>`
  display: flex;
  flex-direction: row;
  background-color: ${(props) =>
    rgba(SYSTEM_COLORS[getColorNameWithLevel(props.level, "100")], 0.9)};
  padding: 0.5rem 0;
  align-items: center;
  justify-content: space-between;
  border: 2px solid
    ${(props) => SYSTEM_COLORS[getColorNameWithLevel(props.level, "600")]};
  border-radius: 5px;
  margin-bottom: 5px;
  z-index: 100;
`

export const ToastIconStyle = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 0.3rem;
  > svg {
    width: 1.3rem;
    height: 1.3rem;
  }
`

export const ToastTextStyle = styled.p`
  flex-grow: 1;
  word-break: break-all;
  padding: 0 0.2rem;
  line-height: 1.2rem;
  color: ${SERVICE_COLORS["FONT-900"]};
`

export const ToastCloseStyle = styled.button`
  flex-grow: 0;
  flex-shrink: 0;

  background-color: transparent;
  border: none;
  margin-right: 0.5rem;
  cursor: pointer;
  > svg {
    width: 1.3rem;
    height: 1.3rem;
  }
`
