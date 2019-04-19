import React, { useContext } from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import useTranslations from "../components/useTranslations";
import { LocaleContext } from '../context/locale-context';
import { rhythm } from "../utils/typography";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const locale = useContext(LocaleContext);
  console.log(`here your mom and locale is ${locale}`);
  const { title } = useTranslations();
  
  return (
    <Layout className={locale} title={title}> 
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
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
          );
        })}
      </Layout>
    );
}

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex($locale: String!){
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
       filter: { fields: { locale: { eq: $locale } } frontmatter: {level: {lte: 1}} }
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
level
          }
        }
      }
    }
  }
`;
