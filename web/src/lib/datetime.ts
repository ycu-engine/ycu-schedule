export const beforeFromNow = (date: Date) => {
  const diffSec = (new Date().getTime() - date.getTime()) / 1000
  if (diffSec < 60) return `${Math.floor(diffSec)}秒前`
  if (diffSec < 60 * 60) return `${Math.floor(diffSec / 60)}分前`
  if (diffSec < 60 * 60 * 24) return `${Math.floor(diffSec / 60 / 60)}時間前`
  if (diffSec < 60 * 60 * 24 * 31)
    return `${Math.floor(diffSec / 60 / 60 / 24)}日前`
  if (diffSec < 60 * 60 * 24 * 31 * 12)
    return `${Math.floor(diffSec / 60 / 60 / 24 / 31)}ヶ月前`
  return `${Math.floor(diffSec / 60 / 60 / 24 / 31 / 12)}年前`
}
