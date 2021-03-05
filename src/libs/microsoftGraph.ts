import fetch from "node-fetch"

export const getMicrosoftId = async (token: string): Promise<string> => {
  const res = await fetch("https://graph.microsoft.com/v1.0/me?$select=id", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()
  return data.id
}
