import Layout from '@/components/Layout'
import { useAuth } from '@/store/user'
import { Auth } from 'aws-amplify'
import Link from 'next/link'
import { useEffect } from 'react'

const AboutPage = () => {
  const auth = useAuth()
  useEffect(() => {
    window.Auth = Auth
  }, [])

  console.dir(auth)
  return (
    <Layout title='About | Next.js + TypeScript Example'>
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        <Link href='/'>
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default AboutPage
