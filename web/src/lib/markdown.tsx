import 'github-markdown-css'
import ReactMarkdown, { ReactMarkdownPropsBase } from 'react-markdown'
import gfm from 'remark-gfm'

const props: Omit<ReactMarkdownPropsBase, 'children'> = {
  plugins: [gfm]
}

type MarkdownProps = {
  content: string
}

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <ReactMarkdown className='markdown-body' children={content} {...props} />
  )
}
