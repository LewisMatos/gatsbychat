import { useStaticQuery, graphql } from 'gatsby'
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            instance_locator
            token_url
          }
        }
      }
    `
  )
  return site.siteMetadata
}