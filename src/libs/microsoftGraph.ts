import fetch from "node-fetch"

export const getMicrosoftId = async (token: string): Promise<string> => {
  const res = await fetch("https://graph.microsoft.com/v1.0/me?$select=id", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()
  if (data.id) {
    return data.id
  }
  if (data.error) {
    throw Error(JSON.stringify(data.error))
  }
  throw Error(
    JSON.stringify({
      code: "InvalidAuthenticationToken",
      message: "Access token is empty.",
    })
  )
}
