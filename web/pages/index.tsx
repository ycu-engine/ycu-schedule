import { Callout } from '@/components/Callout'
import { Card } from '@/components/Card'
import { HeroImage } from '@/components/HeroImage'
import {
  Emphasis,
  Heading1,
  Heading2,
  Link,
  Paragraph
} from '@/components/Typography'
import { Markdown } from '@/lib/markdown'
import { siteTitle } from '@/lib/site-title'
import { useNews } from '@/store/news'
import { format } from 'date-fns'
import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect } from 'react'

const IndexPage = () => {
  const { latestNews, fetch } = useNews()
  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <Head>
        <title>{siteTitle('トップ')}</title>
      </Head>
      <HeroImage />
      <Callout>
        {/* 利用いただきありがとうございます！ おかげさまで現在サービス開始6日にして<br>
                    ユーザー数が200人となりました！🎉🎉🎉 本当にありがとうごございます！😍😍😍 */}
        時間割機能について、5月24日をもちまして無期限の終了となります。 詳しくは
        <NextLink href='/schedule/help'>こちら</NextLink>
        をご確認ください。
      </Callout>
      <Card>
        <Paragraph>
          YCUスケジュールは<Emphasis>横浜市立大学の非公式のアプリ</Emphasis>
          となっています。
        </Paragraph>
        <Paragraph>
          必ず <Link href='/readme'>利用上の注意</Link>
          を確認してからご利用ください。
        </Paragraph>
        <Paragraph>
          団体機能については <Link href='/group/about'>こちら</Link>
          をご確認ください。
        </Paragraph>
      </Card>
      {latestNews ? (
        <Card>
          <Heading1>📗 お知らせ</Heading1>
          <Heading2>
            {latestNews.title}{' '}
            <span style={{ fontSize: '0.8em' }}>
              {format(latestNews.createdAt, 'yyyy/MM/dd')}
            </span>
          </Heading2>
          <Markdown content={latestNews.content} />
          <Paragraph>
            以前のお知らせは<Link href='/news'>こちら</Link>からご確認ください。
          </Paragraph>
        </Card>
      ) : null}
      <Card>
        <Heading1>🗓 今後の機能追加予定</Heading1>
        <Paragraph>
          <Link href='https://docs.google.com/forms/d/e/1FAIpQLSdzcqpam9HGKsNilspsf2wSi43ZPJqxUajBsfhm0pZbx-MZDQ/viewform'>
            機能追加要望
          </Link>{' '}
          募集中💬
          <br />
          ユーザーが増えれば実装していきます😇
        </Paragraph>
      </Card>
    </>
  )
}
export default IndexPage
