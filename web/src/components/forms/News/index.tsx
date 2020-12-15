import { FormButton } from '@/components/ButtonList'
import { Heading2 } from '@/components/Typography'
import { useNews } from '@/store/news'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import { DatetimeInput, FormInput, MarkdownEditor } from '../fields'
import { getError } from '../fields/error'

type NewsFormType = {
  title: string
  content: string
  createdAt?: Date | null
  updatedAt?: Date | null
}

type NewsFormProps = {
  id?: string
  data?: NewsFormType
}

export const NewsForm = ({ id, data }: NewsFormProps) => {
  const {
    errors,
    register,
    handleSubmit,
    reset,
    watch,
    control
  } = useForm<NewsFormType>({
    defaultValues: {
      ...data,
      createdAt: data?.createdAt || null,
      updatedAt: data?.updatedAt || null
    }
  })
  const { create, update } = useNews()

  const onSubmit = async (values: NewsFormType) => {
    if (id) {
      await update({
        input: {
          id,
          ...values,
          createdAt: values.createdAt?.toISOString(),
          updatedAt: values.updatedAt?.toISOString()
        }
      })
    } else {
      await create({
        input: {
          ...values,
          createdAt: values.createdAt?.toISOString(),
          updatedAt: values.updatedAt?.toISOString()
        }
      })
      reset()
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading2 require>タイトル</Heading2>
      <FormInput
        name='title'
        type='text'
        register={register({
          required: true
        })}
        error={getError(errors.title)}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center'
        }}>
        <div style={{ width: '49.5%' }}>
          <Heading2 require>作成日</Heading2>
          <DatetimeInput
            name='createdAt'
            control={control}
            error={getError(errors.createdAt)}
          />
        </div>
        <div style={{ width: '49.5%' }}>
          <Heading2 require>更新日</Heading2>
          <DatetimeInput
            name='updatedAt'
            control={control}
            error={getError(errors.updatedAt)}
          />
        </div>
      </div>

      <Heading2 require>内容</Heading2>
      <MarkdownEditor
        content={watch('content')}
        name='content'
        rows={15}
        register={register({
          required: true
        })}
        error={getError(errors.content)}
      />
      <FormButton>保存</FormButton>
      <DevTool control={control} />
    </form>
  )
}
