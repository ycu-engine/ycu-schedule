export const urlIsSameSite = (url: string): boolean => {
  if (url?.startsWith?.("/")) {
    return true
  }
  return false
}
