import { SimpleButton } from '@/components/Button'
import { Card } from '@/components/Card'
import { NewsForm } from '@/components/forms/News'
import { StaffOnly } from '@/components/Layout'
import { Modal } from '@/components/Modal'
import { SimpleTable } from '@/components/Table'
import { Heading1, Paragraph } from '@/components/Typography'
import { NewsType } from '@/interfaces/news'
import { beforeFromNow } from '@/lib/datetime'
import { useNews } from '@/store/news'
import { useEffect } from 'react'

const StaffNewsPage = () => {
  const { fetch, news } = useNews()
  useEffect(() => {
    fetch()
  }, [])

  return (
    <StaffOnly>
      <Card>
        <Heading1>🗞 お知らせ管理</Heading1>

        <SimpleTable<
          NewsType,
          'タイトル' | '内容' | '作成日' | '更新日' | '編集'
        >
          items={news}
          fields={['タイトル', '内容', '作成日', '更新日', '編集']}
          itemFields={{
            タイトル: ({ item }) => (
              <Paragraph>{item.title.slice(0, 20)}</Paragraph>
            ),
            内容: ({ item }) => (
              <Paragraph>{item.content.slice(0, 20)}</Paragraph>
            ),
            作成日: ({ item }) => (
              <p style={{ minWidth: '5em' }}>
                {beforeFromNow(item.createdAt)}
                {/* {format(item.createdAt, 'yyyy/MM/dd')} */}
              </p>
            ),
            更新日: ({ item }) => (
              <p style={{ minWidth: '5em' }}>
                {beforeFromNow(item.updatedAt)}
                {/* {format(item.updatedAt, 'yyyy/MM/dd')} */}
              </p>
            ),
            編集: ({ item }) => (
              <Modal
                activator={props => <SimpleButton {...props}>🖋</SimpleButton>}>
                <NewsForm id={item.id} data={item} />
              </Modal>
            )
          }}
        />

        <Modal
          activator={props => (
            <SimpleButton rounded {...props}>
              新規作成
            </SimpleButton>
          )}>
          <NewsForm />
        </Modal>
      </Card>
    </StaffOnly>
  )
}

export default StaffNewsPage
