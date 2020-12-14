import { Card } from '@/components/Card'
import { Heading1, Heading2 } from '@/components/Typography'
import { NewsType } from '@/interfaces/news'
import { Markdown } from '@/lib/markdown'
import { useNews } from '@/store/news'
import { format } from 'date-fns'
import { useEffect } from 'react'

type SingleNewsProps = {
  news: NewsType
}

const SingleNews = ({ news }: SingleNewsProps) => {
  return (
    <>
      <Heading2>
        {news.title}{' '}
        <span style={{ fontSize: '0.8em' }}>
          {format(news.createdAt, 'yyyy/MM/dd')}
        </span>
      </Heading2>
      <Markdown content={news.content} />
    </>
  )
}

const NewsPage = () => {
  const { fetch, news } = useNews()
  useEffect(() => {
    fetch()
  }, [])

  return (
    <Card>
      <Heading1>📗 お知らせ</Heading1>

      {news.map(item => (
        <SingleNews news={item} key={item.id} />
      ))}
    </Card>
  )
}

export default NewsPage
