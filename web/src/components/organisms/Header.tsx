import { useState } from "react"
import { Header as HeaderMolecule } from "../molecules/Header"

export const Header = (): JSX.Element => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <HeaderMolecule
      isAuthenticated={false}
      isStaff={false}
      isStudent={false}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
    />
  )
}
