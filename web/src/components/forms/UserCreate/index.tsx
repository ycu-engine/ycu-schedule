import { AlertMessageItem, AlertMessages } from '@/components/AlertMessage'
import { Heading2, Paragraph } from '@/components/Typography'
import { useAuth } from '@/store/user'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FormInput } from '../fields'
import { getError } from '../fields/error'

type UserCreateFormType = {
  email: string
  password: string
  passwordConfirm: string
}

type UserCreateFormProps = {
  formId: string
}

export const UserCreateForm = ({ formId }: UserCreateFormProps) => {
  const { signUp, error } = useAuth()
  const {
    register,
    errors,
    handleSubmit,
    watch
  } = useForm<UserCreateFormType>()
  const router = useRouter()

  const nonFieldError = !!error
    ? error.code === 'UsernameExistsException'
      ? '既に登録されているEmailアドレスです。'
      : error.message
    : ''

  const onSubmit = async (values: UserCreateFormType) => {
    const user = await signUp({
      username: values.email,
      password: values.password
    })
    console.log(user)
    if (user) {
      await router.push({
        pathname: '/user/create/confirm',
        query: { email: values.email }
      })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        {nonFieldError.length > 0 ? (
          <AlertMessages>
            <AlertMessageItem error>{nonFieldError}</AlertMessageItem>
          </AlertMessages>
        ) : null}

        <Heading2 require>YCUメールアドレス</Heading2>
        <Paragraph>
          大学用のメールアドレス（〇〇@yokohama-cu.ac.jp）からのみ登録できます。
        </Paragraph>
        <FormInput
          name='email'
          type='email'
          register={register({
            required: true,
            pattern: {
              value: /^\w\d{6}\w@yokohama-cu\.ac\.jp$/,
              message: '学生用メールアドレスからのみ登録可能です。'
            }
          })}
          placeholder='ycu-schedule@yokohama-cu.ac.jp'
          error={getError(errors.email)}
        />

        <Heading2 require>パスワード</Heading2>
        <Paragraph>
          パスワードを作成してください。
          アルファベットと数字を含む８文字以上かつ、推測されやすいパスワードは登録できません。
        </Paragraph>
        <FormInput
          name='password'
          type='password'
          register={register({
            required: true,
            minLength: 8,
            validate: {
              lower: value => /[a-z]/.test(value) || '小文字を含めてください',
              upper: value => /[A-Z]/.test(value) || '大文字を含めてください'
            }
          })}
          placeholder='パスワードを作成してください。'
          error={getError(errors.password, {
            minLength: '最低でも８文字以上必要です。'
          })}
        />

        <Heading2 require>パスワード(確認用)</Heading2>
        <Paragraph>
          確認のため、上の項目に入力したパスワードをもう一度入力してください🙏
        </Paragraph>
        <FormInput
          name='passwordConfirm'
          type='password'
          register={register({
            required: true,
            validate: value =>
              value === watch('password') || 'パスワードが一致しません'
          })}
          placeholder='パスワードを作成してください。'
          error={getError(errors.passwordConfirm)}
        />
      </form>
    </>
  )
}
