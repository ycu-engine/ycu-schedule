import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <meta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
