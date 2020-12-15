import {
  CreateNewsInput,
  CreateNewsMutation,
  ListNewssQuery,
  UpdateNewsInput,
  UpdateNewsMutation
} from '@/API'
import { configure } from '@/aws-imports'
import { createNews, updateNews } from '@/graphql/mutations'
import { listNewss } from '@/graphql/queries'
import { APINewsType, NewsType } from '@/interfaces/news'
import {
  GraphQLMutationVariables,
  GRAPHQL_AUTH_MODE,
  useAmplifyGraphqlMutation,
  useAmplifyGraphqlQuery
} from '@ycu-engine/amplify-api-hook'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

const NewsAtom = atom<NewsType[]>({
  key: 'NewsAtom',
  default: []
})

const LatestNewsSelector = selector({
  key: 'LatestNewsSelector',
  get: ({ get }) => {
    const news = get(NewsAtom)
    return news.length > 0 ? news[0] : undefined
  }
})

export const useNews = () => {
  configure()
  const [news, setNews] = useRecoilState(NewsAtom)
  const { error, fetch, isLoading } = useAmplifyGraphqlQuery<
    NewsType[],
    ListNewssQuery
  >({
    atom: NewsAtom,
    option: {
      query: listNewss,
      variables: { limit: 100 },
      authMode: GRAPHQL_AUTH_MODE.API_KEY
    },
    handler: res => {
      if (!res.data || !res.data.listNewss || !res.data.listNewss.items) {
        return []
      }
      const news = res.data.listNewss.items
        .filter((item): item is APINewsType => !!item)
        .map(item => ({
          ...item,
          createdAt: new Date(item?.createdAt),
          updatedAt: new Date(item?.updatedAt)
        }))
      news.sort((a, b) => -(a.createdAt.getTime() - b.createdAt.getTime()))
      return news
    }
  })

  const { mutate: _create } = useAmplifyGraphqlMutation<
    CreateNewsInput,
    CreateNewsMutation
  >({
    mutation: createNews
  })

  const create = async (data: GraphQLMutationVariables<CreateNewsInput>) => {
    const res = await _create(data)
    if (!res || !res.createNews) return
    const item = {
      ...res.createNews,
      createdAt: new Date(res.createNews.createdAt),
      updatedAt: new Date(res.createNews.updatedAt)
    }
    setNews([item, ...news])
    return item
  }

  const { mutate: _update } = useAmplifyGraphqlMutation<
    UpdateNewsInput,
    UpdateNewsMutation
  >({
    mutation: updateNews
  })

  const update = async (data: GraphQLMutationVariables<UpdateNewsInput>) => {
    const res = await _update(data)
    if (!res || !res.updateNews) return
    const item = {
      ...res.updateNews,
      createdAt: new Date(res.updateNews.createdAt),
      updatedAt: new Date(res.updateNews.updatedAt)
    }
    const idx = news.findIndex(v => v.id === item.id)
    if (idx === -1) return item
    setNews([...news.slice(0, idx), item, ...news.slice(idx + 1)])
    return item
  }

  const latestNews = useRecoilValue(LatestNewsSelector)

  return {
    news,
    error,
    latestNews,
    isLoading,
    fetch,
    create,
    update
  }
}
