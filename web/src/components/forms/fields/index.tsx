import { AlertMessageItem, AlertMessages } from '@/components/AlertMessage'
import { Markdown } from '@/lib/markdown'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Control, Controller, FieldName } from 'react-hook-form'
import styles from './index.module.scss'

type _FormFieldProps = {
  register: any
  name: string
  placeholder?: string
  error?: string
}

type FormInputProps = _FormFieldProps & {
  type: 'text' | 'email' | 'password' | 'number' | 'datetime-local'
}

type FormTextareaProps = _FormFieldProps & {
  cols?: number
  rows?: number
}

export const FormInput = ({
  type,
  name,
  placeholder,
  register,
  error
}: FormInputProps) => {
  return (
    <>
      <input
        type={type}
        name={name}
        autoComplete={name}
        className={styles['form_input']}
        placeholder={placeholder}
        ref={register}
        id={`id_${name}`}
      />
      {error ? (
        <AlertMessages>
          <AlertMessageItem error>{error}</AlertMessageItem>
        </AlertMessages>
      ) : null}
    </>
  )
}

export const FormTextare = ({
  name,
  register,
  placeholder,
  error,
  cols,
  rows
}: FormTextareaProps) => {
  return (
    <>
      <textarea
        cols={cols}
        rows={rows}
        className={styles['form_text-area']}
        name={name}
        placeholder={placeholder}
        ref={register}
        id={`id_${name}`}
      />
      {error ? (
        <AlertMessages>
          <AlertMessageItem error>{error}</AlertMessageItem>
        </AlertMessages>
      ) : null}
    </>
  )
}

type MarkdownEditorProps = FormTextareaProps & { content: string }

export const MarkdownEditor = ({
  name,
  register,
  placeholder,
  error,
  cols,
  rows,
  content
}: MarkdownEditorProps) => {
  return (
    <>
      <div className={styles['markdown-editor']}>
        <textarea
          cols={cols}
          rows={rows}
          className={styles['form_text-area']}
          name={name}
          placeholder={placeholder}
          ref={register}
          id={`id_${name}`}
        />
        <Markdown content={content} />
      </div>
      {error ? (
        <AlertMessages>
          <AlertMessageItem error>{error}</AlertMessageItem>
        </AlertMessages>
      ) : null}
    </>
  )
}

type DatetimeInputProps<T> = {
  name: FieldName<T>
  control: Control<T>
  error?: string
}

export const DatetimeInput = <T,>({
  name,
  control,
  error
}: DatetimeInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange, value }) => {
        return (
          <>
            <div className={styles['datepicker_wrapper']}>
              <DatePicker
                selected={value}
                onChange={onChange}
                className={styles['form_input']}
                dateFormat='yyyy/MM/dd HH:mm'
                showTimeSelect
              />
            </div>
            {error ? (
              <AlertMessages>
                <AlertMessageItem error>{error}</AlertMessageItem>
              </AlertMessages>
            ) : null}
          </>
        )
      }}
    />
  )
}
