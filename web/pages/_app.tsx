import { Alerts } from '@/components/Alert'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import '@/styles/global.scss'
import '@/styles/reset.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RecoilRoot>
        <Header />
        <Container>
          <Alerts />
          <Component {...pageProps} />
        </Container>
        <Footer />
      </RecoilRoot>
    </>
  )
}

export default MyApp
