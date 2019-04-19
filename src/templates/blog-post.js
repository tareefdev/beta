import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import '../global.css';
import Layout from "../components/layout";
import SEO from "../components/seo";

import { rhythm, scale } from "../utils/typography";
import useTranslations from "../components/useTranslations";

const BlogPostTemplate = ({ data }) => {
  const { title } = useTranslations();
  const post = data.markdownRemark;

  return (
      <Layout title={title}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1>{post.frontmatter.title}</h1>
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
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
