import { Card } from '@/components/Card'
import { StaffOnlyComponent } from '@/components/Layout'
import { Heading1, Link, Paragraph } from '@/components/Typography'
import { siteTitle } from '@/lib/site-title'
import Head from 'next/head'

const StaffPage = () => {
  return (
    <>
      <Head>
        <title>{siteTitle('スタッフページ')}</title>
      </Head>
      <StaffOnlyComponent>
        <Card>
          <Heading1>👷 スタッフページ</Heading1>
          <Paragraph>
            &gt; <Link href='/staff/news'>お知らせ</Link>
          </Paragraph>
        </Card>
      </StaffOnlyComponent>
    </>
  )
}

export default StaffPage
