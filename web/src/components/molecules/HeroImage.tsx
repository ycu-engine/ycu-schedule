import {
  HeroImageBodyStyle,
  HeroImageButtonListItemStyle,
  HeroImageButtonListStyle,
  HeroImageMainStyle,
  HeroImageStyle,
} from "~/components/atoms/HeroImage"
import { HeroImage01, HeroImage02 } from "../images/hero-image"

type HeroImageProps =
  | {
      isAuthenticated: false
      isStudent?: undefined
      isGroup?: undefined
    }
  | {
      isAuthenticated: true
      isStudent: boolean
      isGroup: boolean
    }

export const HeroImage = ({
  isAuthenticated,
  isGroup,
  isStudent,
}: HeroImageProps): JSX.Element => {
  return (
    <HeroImageStyle>
      <HeroImage01 />
      <HeroImage02 />
      <HeroImageMainStyle>
        横浜市大生のための
        <br />
        授業管理ツール
      </HeroImageMainStyle>
      <HeroImageBodyStyle>
        YCUスケジュールは横浜市立大学の非公式のアプリです。
        履修しているZoomのID一元管理、もうZoomのIDを覚える必要はありません。
        LINE友達登録をすれば講義の直前にURLを通知してもらえるから、時間割の概念が変わります。
      </HeroImageBodyStyle>
      <HeroImageButtonListStyle>
        {isAuthenticated ? (
          isStudent ? (
            <HeroImageButtonListItemStyle main to="#">
              時間割を確認する
            </HeroImageButtonListItemStyle>
          ) : isGroup ? (
            <HeroImageButtonListItemStyle main to="#">
              イベントを作成する
            </HeroImageButtonListItemStyle>
          ) : null
        ) : (
          <HeroImageButtonListItemStyle main to="#">
            新規アカウント作成
          </HeroImageButtonListItemStyle>
        )}
        <HeroImageButtonListItemStyle sub to="#">
          利用上の注意
        </HeroImageButtonListItemStyle>
      </HeroImageButtonListStyle>
    </HeroImageStyle>
  )
}
