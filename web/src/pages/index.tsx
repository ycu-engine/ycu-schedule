import { Fragment, useEffect } from "react"
import { Helmet } from "react-helmet"
import { Callout } from "~/components/molecules/Callout"
import { Card } from "~/components/molecules/Card"
import { Heading1, Heading2 } from "~/components/molecules/Heading"
import {
  Emphasis,
  InnerLink,
  OuterLink,
  Paragraph,
} from "~/components/molecules/Typography"
import { HeroImage } from "~/components/organisms/HeroImage"
import info from "../info.json"

const IndexPage = (): JSX.Element => {
  useEffect(() => {
    console.log(info)
  }, [])
  return (
    <Fragment>
      <Helmet>
        <title>YCUスケジュール</title>
      </Helmet>
      <HeroImage />
      <Callout>
        利用いただきありがとうございます！ おかげさまで現在サービス開始6日にして
        <br />
        ユーザー数が200人となりました！🎉🎉🎉
        本当にありがとうごございます！😍😍😍
      </Callout>
      <Card>
        <Paragraph>
          YCUスケジュールは<Emphasis>横浜市立大学の非公式のアプリ</Emphasis>
          となっています。
        </Paragraph>
        <Paragraph>
          必ず
          <InnerLink to="#">利用上の注意</InnerLink>
          を確認してからご利用ください。
        </Paragraph>
        <Paragraph>
          団体機能については
          <InnerLink to="#">こちら</InnerLink>
          をご確認ください。
        </Paragraph>
      </Card>

      <Card>
        <Heading1>📗 お知らせ</Heading1>
        <Heading2>2020/05/18</Heading2>
        <Paragraph>
          「なんかYCUスケジュールってよく言えばシンプルだけど、悪く言えばちょっとダサいよね。」
          <br />
          もうそんなことは言わせない（&lt;-誰も言っていない）
          <br />
          なんと、サイトがリニューアルしました！！🎉🎉🎉
        </Paragraph>
        <Paragraph>
          ボランティアの方々に協力してもらい、こんな素敵なデザインになりました！
        </Paragraph>
        <Paragraph>
          <InnerLink to="#">以前のお知らせ</InnerLink>
        </Paragraph>
      </Card>

      <Card>
        <Heading1>🗓 今後の機能追加予定</Heading1>
        <Paragraph>
          <OuterLink href="https://docs.google.com/forms/d/e/1FAIpQLSdzcqpam9HGKsNilspsf2wSi43ZPJqxUajBsfhm0pZbx-MZDQ/viewform">
            機能追加要望
          </OuterLink>
          募集中💬
          <br />
          ユーザーが増えれば実装していきます😇
        </Paragraph>
      </Card>
    </Fragment>
  )
}

export default IndexPage
