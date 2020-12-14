type Styles = {
  readonly [key: string]: string
}

export const getMultiClasss = (
  styles: Styles,
  ...classNames: (string | false | undefined)[]
) => {
  return classNames
    .filter((v): v is string => typeof v === 'string')
    .map(className => styles[className])
    .join(' ')
}
