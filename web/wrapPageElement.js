/* eslint-disable */
// @ts-check
import { QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"
import { Layout } from "~/components/organisms/Layout"
import { queryClient } from "~/lib/api/client"

// @ts-ignore
export const wrapRootElement = ({ element }) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Layout>{element}</Layout>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default wrapRootElement
