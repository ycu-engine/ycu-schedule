import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import { useMemo } from "react"
import { Helmet } from "react-helmet"

type SEOProps = {
  title: string
  description?: string
  lang?: string
  image?: string
}

export const SEO = ({
  title,
  image,
  lang,
  description,
}: SEOProps): JSX.Element => {
  const { site } = useStaticQuery<GatsbyTypes.SEOQuery>(graphql`
    query SEO {
      site {
        siteMetadata {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl: url
          defaultImage: image
          twitterUsername
        }
      }
    }
  `)
  const { pathname } = useLocation()

  const seo = useMemo(
    () => ({
      title: title || site?.siteMetadata?.defaultTitle,
      description: description || site?.siteMetadata?.defaultDescription,
      image: `${image || site?.siteMetadata?.defaultImage}`,
      lang: lang || "ja",
      url: `${site?.siteMetadata?.siteUrl}${pathname}`,
    }),
    []
  )

  return (
    <Helmet titleTemplate={site?.siteMetadata?.titleTemplate}>
      <title>{seo.title}</title>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site?.siteMetadata?.twitterUsername}
      />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  )
}
