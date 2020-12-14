export enum AlertLevelEnum {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type AlertType = {
  id: number
  level: AlertLevelEnum
  label: string
  duration?: number
  close?: boolean
}
