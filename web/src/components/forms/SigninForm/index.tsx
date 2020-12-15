import { AlertMessageItem, AlertMessages } from '@/components/AlertMessage'
import { useAuth } from '@/store/user'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
  const { register, errors, handleSubmit } = useForm<SigninFormType>()
  const router = useRouter()

  console.log(error)

  const nonFieldError: string = !!error
    ? error.code === 'UserNotFoundException'
      ? 'ユーザーが存在しませんでした。'
      : error.code === 'NotAuthorizedException'
      ? 'Emailまたはパスワードが間違っています。'
      : error.message
    : ''

  const onSubmit = async (values: SigninFormType) => {
    await signIn({
      username: values.email,
      password: values.password
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push(String(router.query.next || '/'))
    }
  }, [isAuthenticated, router.query])

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
    </>
  )
}
