import { useAuth } from '@/store/user'
import { BrandName } from './BrandName'
import styles from './index.module.scss'
import { Laptop } from './Laptop'
import { Mobile } from './Mobile'

export const Header = () => {
  useAuth()
  return (
    <header className={styles['header']}>
      <BrandName />
      <Laptop />
      <Mobile />
    </header>
  )
}
