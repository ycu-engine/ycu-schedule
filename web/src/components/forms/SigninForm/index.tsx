import { AlertMessageItem, AlertMessages } from '@/components/AlertMessage'
import { useAuth } from '@/store/user'
import { DevTool } from '@hookform/devtools'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FormInput } from '../fields'
import { getError } from '../fields/error'

type SigninFormType = {
  email: string
  password: string
}

type SigninFormProps = {
  id: string
}

export const SigninForm = ({ id }: SigninFormProps) => {
  const { error, signIn, isAuthenticated } = useAuth()
  const { register, control, errors, handleSubmit } = useForm<SigninFormType>()
  const router = useRouter()

  const nonFieldError: string = !!error
    ? error.code === 'UserNotFoundException'
      ? 'ユーザーが存在しませんでした。'
      : error.message
    : ''

  const onSubmit = async (values: SigninFormType) => {
    await signIn({
      username: values.email,
      password: values.password
    })
  }

  if (isAuthenticated) {
    router.push('/about')
  }

  return (
    <>
      <form id={id} onSubmit={handleSubmit(onSubmit)}>
        {nonFieldError.length > 0 ? (
          <AlertMessages>
            <AlertMessageItem error>{nonFieldError}</AlertMessageItem>
          </AlertMessages>
        ) : null}
        <FormInput
          type='email'
          name='email'
          placeholder='メールアドレス'
          register={register({
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '適切なメールアドレスを入力してください。'
            }
          })}
          error={getError(errors.email)}
        />
        <FormInput
          type='password'
          name='password'
          placeholder='パスワード'
          register={register({ required: true })}
          error={getError(errors.password)}
        />
      </form>
      {process.env.NODE_ENV === 'development' ? (
        <DevTool control={control} />
      ) : null}
    </>
  )
}
