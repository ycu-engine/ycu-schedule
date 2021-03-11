import { Dispatch, Fragment, SetStateAction } from "react"
import {
  HeaderBrandNameStyle,
  HeaderBrandNameTextStyle,
  HeaderLaptopNavigationItemStyle,
  HeaderLaptopNavigationMemberStyle,
  HeaderLaptopNavigationNonMemberStyle,
  HeaderLaptopStyle,
  HeaderMobileNavigationButtonClosedStyle,
  HeaderMobileNavigationButtonOpenStyle,
  HeaderMobileNavigationItemStyle,
  HeaderMobileNavigationMemberStyle,
  HeaderMobileNavigationNonMemberStyle,
  HeaderMobileStyle,
  HeaderStyle,
} from "../atoms/Header"
import { IconBrand } from "../images/icon_brand"

type HeaderProps =
  | {
      isAuthenticated: false
      isStudent?: undefined
      isStaff?: undefined
      openMenu: boolean
      setOpenMenu: Dispatch<SetStateAction<boolean>>
    }
  | {
      isAuthenticated: true
      isStudent: boolean
      isStaff: boolean
      openMenu: boolean
      setOpenMenu: Dispatch<SetStateAction<boolean>>
    }

export const Header = ({
  isAuthenticated,
  isStudent,
  isStaff,
  openMenu,
  setOpenMenu,
}: HeaderProps): JSX.Element => {
  return (
    <HeaderStyle>
      <HeaderBrandNameStyle to="/">
        <IconBrand />
        <HeaderBrandNameTextStyle>YCU Schedule</HeaderBrandNameTextStyle>
      </HeaderBrandNameStyle>

      <HeaderLaptopStyle>
        {isAuthenticated ? (
          <HeaderLaptopNavigationMemberStyle>
            {isStudent ? (
              <HeaderLaptopNavigationItemStyle to="#">
                🗓 時間割
              </HeaderLaptopNavigationItemStyle>
            ) : null}
            <HeaderLaptopNavigationItemStyle to="#">
              🗓 イベント
            </HeaderLaptopNavigationItemStyle>
            <HeaderLaptopNavigationItemStyle to="#">
              😊 ユーザー情報
            </HeaderLaptopNavigationItemStyle>
            <HeaderLaptopNavigationItemStyle to="#">
              💬 通知設定
            </HeaderLaptopNavigationItemStyle>
            <HeaderLaptopNavigationItemStyle to="#">
              🔓 パスワード変更
            </HeaderLaptopNavigationItemStyle>
            <HeaderLaptopNavigationItemStyle to="/readme">
              🙏️ 利用上の注意
            </HeaderLaptopNavigationItemStyle>
            {isStaff ? (
              <HeaderLaptopNavigationItemStyle to="#">
                🛠 管理画面
              </HeaderLaptopNavigationItemStyle>
            ) : null}
          </HeaderLaptopNavigationMemberStyle>
        ) : (
          <HeaderLaptopNavigationNonMemberStyle>
            <HeaderLaptopNavigationItemStyle to="#">
              🔑 ログイン
            </HeaderLaptopNavigationItemStyle>
          </HeaderLaptopNavigationNonMemberStyle>
        )}
      </HeaderLaptopStyle>
      <HeaderMobileStyle>
        {isAuthenticated ? (
          <Fragment>
            <HeaderMobileNavigationButtonClosedStyle
              visible={!openMenu}
              onClick={() => setOpenMenu(true)}
            />
            <HeaderMobileNavigationButtonOpenStyle
              visible={openMenu}
              onClick={() => setOpenMenu(false)}
            />
            <HeaderMobileNavigationMemberStyle visible={openMenu}>
              {isStudent ? (
                <HeaderMobileNavigationItemStyle to="#">
                  🗓 時間割
                </HeaderMobileNavigationItemStyle>
              ) : null}
              <HeaderMobileNavigationItemStyle to="#">
                🗓 イベント
              </HeaderMobileNavigationItemStyle>
              <HeaderMobileNavigationItemStyle to="#">
                😊 ユーザー情報
              </HeaderMobileNavigationItemStyle>
              <HeaderMobileNavigationItemStyle to="#">
                💬 通知設定
              </HeaderMobileNavigationItemStyle>
              <HeaderMobileNavigationItemStyle to="#">
                🔓 パスワード変更
              </HeaderMobileNavigationItemStyle>
              <HeaderMobileNavigationItemStyle to="/readme">
                🙏️ 利用上の注意
              </HeaderMobileNavigationItemStyle>
              {isStaff ? (
                <HeaderMobileNavigationItemStyle to="#">
                  🛠 管理画面
                </HeaderMobileNavigationItemStyle>
              ) : null}
            </HeaderMobileNavigationMemberStyle>
          </Fragment>
        ) : (
          <HeaderMobileNavigationNonMemberStyle>
            <HeaderMobileNavigationItemStyle to="#" nonMember>
              🔑 ログイン
            </HeaderMobileNavigationItemStyle>
          </HeaderMobileNavigationNonMemberStyle>
        )}
      </HeaderMobileStyle>
    </HeaderStyle>
  )
}
