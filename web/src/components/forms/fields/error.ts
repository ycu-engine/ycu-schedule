import { FieldError } from 'react-hook-form'

type CustomErrorMessage = {
  required?: string
  max?: string
  min?: string
  minLength?: string
}

export const getError = (error?: FieldError, custom?: CustomErrorMessage) => {
  if (error?.type === 'required') return custom?.required || '必須の項目です、'
  if (error?.type === 'max') return custom?.max || '最大値を超えています。'
  if (error?.type === 'min') return custom?.min || '最小値を下回っています。'
  if (error?.type === 'pattern') return error.message
  if (error?.type === 'minLength')
    return custom?.minLength || '文字が少なすぎます。'
  if (error?.type === 'validate') return error.message
  if (!error) return error
  if (error.message) return error.message
  console.log(error)
  return '設定されていません'
}
