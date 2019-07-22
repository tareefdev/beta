import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ChildList from "../components/childList";
import { rhythm, scale } from "../utils/typography";

const BlogPostTemplate = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const post = data.mdx;
  const postLevel = post.frontmatter.level;
  const parentDir = post.frontmatter.parentDir; // used in the Graphql query
  let childPosts;
  
  if (postLevel == '1') {
    childPosts = (
      <ChildList posts={data.allMdx.edges}/>
    );
  }

  return (
    <Layout title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
      <h1>{post.frontmatter.title}</h1>
      {childPosts}
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <MDXRenderer>
          { post.code.body} 
        </MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />        
      </Layout>
    );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $locale: String!, $parentDir: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      code {
       body     
      }     
      frontmatter {
        title
        level
      }
    }
    allMdx(
       filter: {
        fields: {
          locale: { eq: $locale } 
        }
        frontmatter: {
         parent: {eq: $parentDir}
       }
      }
       sort: { fields: [frontmatter___level], order: ASC }
) {
      edges {
        node {
          fields {
            slug
            locale
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
