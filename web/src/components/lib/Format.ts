import type { Sub } from "./type"
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const

export type BreakpointsType = typeof breakpoints
export type Breakpoints = keyof BreakpointsType
export type BreakpointsSize = BreakpointsType[Breakpoints]
export type BreakpointsSizeMini = Sub<BreakpointsSize, 0.02>

export const breakpointNext = (breakpoint: Breakpoints): Breakpoints | null => {
  const breakpointNames = Object.keys(breakpoints) as Breakpoints[]
  const nextIndex = breakpointNames.indexOf(breakpoint) + 1
  if (nextIndex < breakpointNames.length) {
    return breakpointNames[nextIndex]
  } else {
    return null
  }
}

export const breakpointMin = (name: Breakpoints): BreakpointsSize | null => {
  const min = breakpoints[name]
  return min !== 0 ? min : null
}

export const breakpointMax = (
  name: Breakpoints
): BreakpointsSizeMini | null => {
  const max = breakpoints[name]
  return max && max > 0 ? ((max - 0.02) as BreakpointsSizeMini) : null
}

export const breakpointUp = (
  name: Breakpoints
): `@media (min-width: ${BreakpointsType[typeof name]}px)` | "&" => {
  const min = breakpointMin(name)
  if (min) {
    return `@media (min-width: ${min}px)` as const
  } else {
    return "&" as const
  }
}

export const breakpointDown = (
  name: Breakpoints
): `@media (max-width: ${BreakpointsType[typeof name]}px)` | "&" => {
  const max = breakpointMax(name)
  if (max) {
    return `@media (max-width: ${max}px)` as const
  } else {
    return "&" as const
  }
}

export const breakpointBetween = (
  lower: Breakpoints,
  upper: Breakpoints
): string => {
  const min = breakpointMin(lower)
  const max = breakpointMax(upper)

  if (min !== null && max !== null) {
    return `@media (min-width: ${min}px) and (max-width: ${max}px)`
  } else if (max === null) {
    return breakpointUp(lower)
  } else if (min === null) {
    return breakpointDown(upper)
  } else {
    return "&"
  }
}

export const breakpointOnly = (name: Breakpoints): string => {
  const next = breakpointNext(name)

  if (next === null) return breakpointUp(name)

  const min = breakpointMin(name)
  const max = breakpointMax(next)

  if (min !== null && max !== null) {
    return `@media (min-width: ${min}px) and (max-width: ${max}px)`
  } else if (max == null) {
    return breakpointUp(name)
  } else if (min == null) {
    return breakpointDown(next)
  } else {
    return "&"
  }
}
