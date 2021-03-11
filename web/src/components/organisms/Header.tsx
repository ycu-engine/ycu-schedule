import { useIsAuthenticated } from "@azure/msal-react"
import { useState } from "react"
import { Header as HeaderMolecule } from "../molecules/Header"

export const Header = (): JSX.Element => {
  const [openMenu, setOpenMenu] = useState(false)
  const isAuthenticated = useIsAuthenticated()

  return (
    <HeaderMolecule
      isAuthenticated={isAuthenticated}
      isStaff={false}
      isStudent={false}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
    />
  )
}
