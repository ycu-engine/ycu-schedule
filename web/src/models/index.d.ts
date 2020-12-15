import { ModelInit, MutableModel } from '@aws-amplify/datastore'

export declare class News {
  readonly id: string
  readonly title: string
  readonly content: string
  readonly createdAt: string
  readonly updatedAt: string
  constructor(init: ModelInit<News>)
  static copyOf(
    source: News,
    mutator: (draft: MutableModel<News>) => MutableModel<News> | void
  ): News
}
export declare class StudentProfile {
  readonly id: string
  readonly owner: string
  readonly weeks: (number | null)[]
  readonly periods: (number | null)[]
  constructor(init: ModelInit<StudentProfile>)
  static copyOf(
    source: StudentProfile,
    mutator: (
      draft: MutableModel<StudentProfile>
    ) => MutableModel<StudentProfile> | void
  ): StudentProfile
}
