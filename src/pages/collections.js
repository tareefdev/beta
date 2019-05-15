import React, { useContext } from 'react';
import LocalizedLink from '../components/localizedLink';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import tr from '../components/useTranslations';

import { LocaleContext } from '../context/locale-context';
import { rhythm } from '../utils/typography';

const Collections = ({ data }) => {
  const posts = data.allMdx.edges;
  const locale = useContext(LocaleContext);
  const siteTitle = data.site.siteMetadata.title;
  
  return (
    <Layout className={locale} title={siteTitle}> 
        <SEO
          title='All posts'
          keywords={['blog', 'gatsby', 'javascript', 'react']}
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
                <LocalizedLink style={{ boxShadow: 'none' }} to={`/${node.fields.slug}`}>
                  {title}
                </LocalizedLink>
              </h3>
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
};

export default Collections;

export const pageQuery = graphql`
  query Collections($locale: String!){
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
       filter: { fields: { locale: { eq: $locale } }
fileAbsolutePath: {regex: "/content\/collections/"}
 frontmatter: {level: {lte: 1}} }
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
            title
            description
level
          }
        }
      }
    }
  }
`;
