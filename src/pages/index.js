import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import { Layout } from "../components/layout"
import SEO from "../components/seo"

// import LocalizedLink from "../components/localizedLink"
// import useTranslations from "../components/useTranslations"

import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { locale } = pageContext

  //  const { hello } = useTranslations();
    return (
      <Layout location={location} title={siteTitle} locale={locale}> 
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={`/${node.fields.slug}`}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndex($locale: String!){
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
       filter: { fields: { locale: { eq: $locale } } }
       sort: { fields: [frontmatter___date], order: DESC }
) {
      edges {
        node {
          excerpt
          fields {
            slug
            locale
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
