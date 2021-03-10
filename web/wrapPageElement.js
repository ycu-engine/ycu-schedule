/* eslint-disable */
import React from "react"
import { Layout } from "~/components/organisms/Layout"

export const wrapRootElement = ({ element }) => {
  return <Layout>{element}</Layout>
}

export default wrapRootElement
