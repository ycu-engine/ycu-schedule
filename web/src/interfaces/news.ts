import { GetNewsQuery } from '@/API'

export type NewsType = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export type APINewsType = Exclude<GetNewsQuery['getNews'], null>
