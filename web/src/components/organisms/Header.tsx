import { useState } from "react"
import { Header as HeaderMolecule } from "../molecules/Header"

export const Header = (): JSX.Element => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <HeaderMolecule
      isAuthenticated={true}
      isStaff={false}
      isStudent={true}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
    />
  )
}
