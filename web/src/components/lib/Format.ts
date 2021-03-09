export const breakpoints = {
  xs: 0,
  sm: 420,
  lg: 960,
  xl: 1280,
} as const

export type Breakpoints = keyof typeof breakpoints

export const breakpointNext = (breakpoint: Breakpoints): Breakpoints | null => {
  const breakpointNames = Object.keys(breakpoints) as Breakpoints[]
  const nextIndex = breakpointNames.indexOf(breakpoint) + 1
  if (nextIndex < breakpointNames.length) {
    return breakpointNames[nextIndex]
  } else {
    return null
  }
}

export const breakpointMin = (name: Breakpoints): number | null => {
  const min = breakpoints[name]
  return min !== 0 ? min : null
}

export const breakpointMax = (name: Breakpoints): number | null => {
  const max = breakpoints[name]
  return max && max > 0 ? max - 0.02 : null
}

export const breakpointUp = (name: Breakpoints): string => {
  const min = breakpointMin(name)
  if (min) {
    return `@media (min-width: ${min}px)`
  } else {
    return "&"
  }
}

export const breakpointDown = (name: Breakpoints): string => {
  const max = breakpointMax(name)
  if (max) {
    return `@media (max-width: ${max}px)`
  } else {
    return "&"
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
