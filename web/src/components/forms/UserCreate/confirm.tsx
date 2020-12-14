import { AlertMessageItem, AlertMessages } from '@/components/AlertMessage'
import { Heading2, Paragraph } from '@/components/Typography'
import { useAuth } from '@/store/user'
import { useForm } from 'react-hook-form'
import { FormInput } from '../fields'
import { getError } from '../fields/error'

type UserCreateConfirmFormType = {
  email: string
  code: string
}

type UserCreateConfirmFormProps = {
  formId: string
  email?: string
}

export const UserCreateConfirmForm = ({
  formId,
  email
}: UserCreateConfirmFormProps) => {
  const { confirmSignUp, error, resendSignUp } = useAuth()
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    setValue,
    trigger
  } = useForm<UserCreateConfirmFormType>()
  if (email && !getValues().email) {
    setValue('email', email)
  }

  const resend = async () => {
    if (trigger('email')) {
      await resendSignUp({ username: getValues().email })
    }
  }

  const nonFieldError: string = !!error
    ? error.code === 'CodeMismatchException'
      ? '確認コードの値が正しくありません。もう一度確認してみてください。'
      : error.code === 'InvalidParameterException'
      ? '既にユーザー確認が済んでいます。'
      : error.code === 'UserNotFoundException'
      ? 'ユーザーが存在しないようです。メールアドレスの確認をしてください。もしくは、ユーザー作成からやり直してください。'
      : error.code === 'LimitExceededException'
      ? '認証コードの送信回数制限となりました。後ほどまたやり直してください。'
      : error.message
    : ''

  const onSubmit = async (values: UserCreateConfirmFormType) => {
    await confirmSignUp({
      username: values.email,
      code: values.code
    })
    console.log('success')
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
        <Paragraph>登録時に入力したメールアドレス。</Paragraph>
        <FormInput
          name='email'
          type='email'
          register={register({
            required: true,
            pattern: {
              value: /^\w\d{6}\w@yokohama-cu\.ac\.jp$/,
              message: '学生用メールアドレスのみ受け付けています'
            }
          })}
          placeholder='ycu-schedule@yokohama-cu.ac.jp'
          error={getError(errors.email)}
        />

        <Heading2 require>確認コード</Heading2>
        <Paragraph>
          メールから受け取った確認コードを入力してください。
          <br />
          確認コードを再送する場合は
          <span style={{ color: 'blue', cursor: 'pointer' }} onClick={resend}>
            こちら
          </span>
          を押してください。
        </Paragraph>
        <FormInput
          name='code'
          type='number'
          register={register({
            required: true,
            validate: value =>
              /^\d{6}$/.test(value) || '数字6文字で入力してください'
          })}
          placeholder='確認コード'
          error={getError(errors.code)}
        />
      </form>
    </>
  )
}
