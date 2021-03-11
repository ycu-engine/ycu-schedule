import chroma from "chroma-js"

type ColorLevel = `${"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}00`

type ColorNameWithLevel<T extends string> = `${T}-${ColorLevel}`

export const getColorNameWithLevel = <T extends string, K extends ColorLevel>(
  color: T,
  level: K
) => `${color}-${level}` as const

const rate = 1 / 5

const makeColor = <T extends string>(
  name: T,
  color: string
): [ColorNameWithLevel<T>, string][] => {
  const colorObj = chroma(color)
  const func = (level: number) => {
    if (level < 5)
      return colorObj.brighten((5 - level) * rate).saturate((5 - level) * rate)
    if (level > 5)
      return colorObj.darken((level - 5) * rate).desaturate((level - 5) * rate)
    return colorObj
  }
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
    return [getColorNameWithLevel(name, `${v}00` as ColorLevel), func(v).hex()]
  }) as [ColorNameWithLevel<T>, string][]
}

const makeColors = <T extends string>(
  colors: Record<T, string>
): Record<T, string> & Record<`${T}-${ColorLevel}`, string> => {
  return {
    ...colors,
    ...Object.fromEntries(
      (Object.keys(colors) as T[]).flatMap((key) => makeColor(key, colors[key]))
    ),
  } as Record<T, string> & Record<`${T}-${ColorLevel}`, string>
}

const BASE_SERVICE_COLORS = {
  MAIN: "#007aec",
  BASE: "#fff",
  ACCENT: "#f9e24e",
  FONT: "#27303b",
} as const

export const SERVICE_COLORS = makeColors(BASE_SERVICE_COLORS)

const BASE_SNS_COLORS = {
  line: "#00c300",
  facebook: "#3c5a99",
  twitter: "#1da1f2",
} as const

export const SNS_COLORS = makeColors(BASE_SNS_COLORS)

const BASE_SYSTEM_COLORS = {
  debug: "#6f42c1",
  info: "#0dcaf0",
  success: "#20c997",
  warning: "#ffc107",
  error: "#dc3545",
} as const

export const SYSTEM_COLORS = makeColors(BASE_SYSTEM_COLORS)
