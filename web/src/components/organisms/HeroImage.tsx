import { useIsAuthenticated } from "@azure/msal-react"
import { HeroImage as HeroImageMolecule } from "../molecules/HeroImage"

export const HeroImage = (): JSX.Element => {
  const isAuthenticated = useIsAuthenticated()
  return (
    <HeroImageMolecule
      isAuthenticated={isAuthenticated}
      isStudent={false}
      isGroup={false}
    />
  )
}
