/* eslint-disable */
// @ts-check
import { MsalProvider } from "@azure/msal-react"
import { QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"
import { Layout } from "~/components/organisms/Layout"
import { queryClient } from "~/lib/api/client"
import { msalClientApp } from "~/lib/msal"

// @ts-ignore
export const wrapRootElement = ({ element }) => {
  return (
    <MsalProvider instance={msalClientApp}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Layout>{element}</Layout>
        </QueryClientProvider>
      </RecoilRoot>
    </MsalProvider>
  )
}

export default wrapRootElement
