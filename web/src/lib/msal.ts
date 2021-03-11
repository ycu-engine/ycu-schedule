import { PopupRequest, PublicClientApplication } from "@azure/msal-browser"
import { useMsal } from "@azure/msal-react"
import { useCallback } from "react"
import { CloudFrontDistributionDomainName } from "~/info"

export const msalClientApp = new PublicClientApplication({
  auth: {
    clientId: "eb7cd567-1d8f-4ca9-a0ba-31919aa6c647",
    authority:
      "https://login.microsoftonline.com/be636d66-cbfe-41b8-895c-ee5cbd8bc755/",
    redirectUri:
      process.env.DEPLOY_STAGE === "prod"
        ? "https://www.ycu-schedule.com"
        : process.env.NODE_ENV === "production"
        ? `https://${CloudFrontDistributionDomainName}/login`
        : "http://localhost:8000/login",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
})

export const loginRequest: PopupRequest = {
  scopes: ["openid"],
}

export const useMsalToken = (): {
  fetchToken: () => Promise<string | null>
} => {
  const { instance } = useMsal()

  const fetchTokenPopup = useCallback(async () => {
    try {
      return (await instance.acquireTokenPopup(loginRequest)).accessToken
    } catch {
      return null
    }
  }, [instance])

  const fetchToken = useCallback(async () => {
    const account = instance
      .getAllAccounts()
      .filter((v) => v.username.endsWith("@yokohama-cu.ac.jp"))[0]
    if (account) {
      try {
        return (await instance.acquireTokenSilent({ ...loginRequest, account }))
          .accessToken
      } catch {
        return await fetchTokenPopup()
      }
    } else {
      return await fetchTokenPopup()
    }
  }, [instance])

  return { fetchToken }
}
