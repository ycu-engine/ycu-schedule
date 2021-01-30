import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect } from 'react'

const Home = (): JSX.Element => {
  const [session, loading] = useSession()

  useEffect(() => {
    console.log(session?.user)
  }, [session])

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn('azure-ad-b2c')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  )
}

export default Home
