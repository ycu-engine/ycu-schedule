import { getMultiClasss } from '@/lib/styles'
import NextLink from 'next/link'
import { FC } from 'react'
import styles from './index.module.scss'

export const Paragraph: FC = ({ children }) => {
  return <p className={styles['paragraph']}>{children}</p>
}

export const Emphasis: FC = ({ children }) => {
  return <span className={styles['emphasis']}>{children}</span>
}

type LinkProps = {
  href: string
  short?: boolean
}

const isSameSite = (url: string) => {
  if (!process.browser) return false
  if (url.startsWith('/')) return true
  if (url.startsWith('#')) return true
  try {
    const uri = new URL(url)
    return window.location.host === uri.host
  } catch {
    return true
  }
}

export const Link: FC<LinkProps> = ({ children, href, short }) => {
  const sameSite = isSameSite(href)
  return (
    <NextLink href={href}>
      <a
        className={getMultiClasss(styles, 'link', (short || false) && 'short')}
        target={sameSite ? undefined : '_blank'}
        rel={sameSite ? undefined : 'noopener noreferrer'}>
        {children}
      </a>
    </NextLink>
  )
}

export const Heading1: FC = ({ children }) => {
  return <h1 className={styles['heading-1']}>{children}</h1>
}
export const Heading2: FC<{ require?: boolean }> = ({ children, require }) => {
  return (
    <h1 className={getMultiClasss(styles, 'heading-2', require && 'require')}>
      {children}
    </h1>
  )
}
export const Heading3: FC = ({ children }) => {
  return <h1 className={styles['heading-3']}>{children}</h1>
}
