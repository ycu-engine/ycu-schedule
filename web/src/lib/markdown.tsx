import { Link } from '@/components/Typography'
import 'github-markdown-css'
import { FC } from 'react'
import ReactMarkdown, { ReactMarkdownPropsBase } from 'react-markdown'
import gfm from 'remark-gfm'

interface ReactMarkdownProps extends ReactMarkdownPropsBase {
  renderers: {
    link: FC<{ href: string }>
  }
}

const props: Omit<ReactMarkdownProps, 'children'> = {
  plugins: [gfm],
  renderers: {
    link: ({ href, children }) => {
      return <Link href={href}>{children}</Link>
    }
  }
}

type MarkdownProps = {
  content: string
}

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <ReactMarkdown className='markdown-body' children={content} {...props} />
  )
}
