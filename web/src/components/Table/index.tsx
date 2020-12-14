import { createElement } from 'react'
import styles from './index.module.scss'

type SimpleTableProps<T0, T1 extends string> = {
  items: T0[]
  fields: T1[]
  itemFields: {
    [K in T1]: (props: { item: T0; field: K }) => JSX.Element
  }
}

export const SimpleTable = <T, V extends string>({
  items,
  fields,
  itemFields
}: SimpleTableProps<T, V>) => {
  return (
    <table className={styles['simple-table']}>
      <thead>
        <tr>
          {fields.map((field, i) => (
            <th className={styles['simple-table-th']} key={i}>
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            {fields.map((field, i) => (
              <td className={styles['simple-table-td']} key={i}>
                {createElement(itemFields[field], { item, field })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
