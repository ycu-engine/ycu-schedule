import { AWSConfig } from '@/aws-imports'
import {
  AmplifyAuthUserAtom,
  useAmplifyAuth,
  useReadOnlyAmplifyAuth
} from '@ycu-engine/amplify-auth-hook'
import { selector, useRecoilValue } from 'recoil'

type Group = 'student' | 'staff' | string

const GroupSelector = selector<Group[]>({
  key: 'GroupSelector',
  get: ({ get }) => {
    const user = get(AmplifyAuthUserAtom)
    if (!user) return []
    const session = user.getSignInUserSession()
    if (!session) return []
    const groups = session.getIdToken().payload['cognito:groups']
    return groups
  }
})

const GroupIsStudentSelector = selector<boolean>({
  key: 'GroupIsStudentSelector',
  get: ({ get }) => get(GroupSelector).includes('student')
})
const GroupIsStaffSelector = selector<boolean>({
  key: 'GroupIsStaffSelector',
  get: ({ get }) => get(GroupSelector).includes('staff')
})
const GroupMemberOfClubsSelector = selector<string[]>({
  key: 'GroupMemberOfClubsSelector',
  get: ({ get }) => get(GroupSelector).filter(v => v.startsWith('club-'))
})

export const useAuth = () => {
  const auth = useAmplifyAuth(AWSConfig)
  const isStudent = useRecoilValue(GroupIsStudentSelector)
  const isStaff = useRecoilValue(GroupIsStaffSelector)
  const memberOfClubs = useRecoilValue(GroupMemberOfClubsSelector)

  return {
    ...auth,
    isStudent,
    isStaff,
    memberOfClubs
  }
}

export const useReadOnlyAuth = () => {
  const {
    error,
    isAuthenticated,
    isLoading,
    user,
    initialized
  } = useReadOnlyAmplifyAuth()
  const isStudent = useRecoilValue(GroupIsStudentSelector)
  const isStaff = useRecoilValue(GroupIsStaffSelector)
  const memberOfClubs = useRecoilValue(GroupMemberOfClubsSelector)

  return {
    error,
    isAuthenticated,
    isLoading,
    user,
    initialized,
    isStudent,
    isStaff,
    memberOfClubs
  }
}
