import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from "gatsby-mdx/mdx-renderer";

import Layout from '../components/layout';
import LocalizedLink from '../components/localizedLink';
import { LocaleContext } from '../context/locale-context';
import useTranslations from '../components/useTranslations';

import SVGMap from '../components/sy-map';

const Index = ({ data }) => {
  const locale = useContext(LocaleContext);
  const tr = useTranslations();
  
  const partials = data.partials.edges.map(p => p.node);
  const latestInvestigation = data.latestInvestigation.edges[0].node.frontmatter;
  const latestDatabase = data.latestDatabase.edges[0].node.frontmatter;
  const latestTechAdvocacy = data.latestTechAdvocacy.edges[0].node.frontmatter;
  const numbers = data.allSiteMetadataJson.edges[0].node.numbers;
  const about = partials[0].code.body;
  
  return (
    <Layout>
      <div className="index-page">
        <MDXRenderer>
          { about}
        </MDXRenderer>
        <SVGMap/>
        <div className="data-numbers">
          <div className="number">
            <h3>{numbers.collectedVideo}</h3>
            <h5> collected Video</h5>
          </div>
          
          <div className="number">
            <h3>{numbers.collectedPosts}</h3>
            <h5> collected Posts</h5>
          </div>
          
          <div className="number">
            <h3>{numbers.collectedTweets}</h3>
            <h5> collected Tweets</h5>
          </div>
          
          <div className="number">
            <h3>{numbers.verifieddata}</h3>
            <h5> Verified Data</h5>
          </div>
        </div>
        
        <hr></hr>
        <h2>How we do it</h2>
        <div className="method-workflow">
          
          <div className="method-element">
            <h3>Discover</h3>
            <p>Nam a sapien.  Sed id ligula quis est convallis tempor.  Sed bibendum.  </p>
          </div>

          <div className="method-element">
            <h3>Collect</h3>
            <p>Nam a sapien.  Sed id ligula quis est convallis tempor.  Sed bibendum.  </p>
          </div>

          <div className="method-element">
            <h3>Verify</h3>
            <p>Nam a sapien.  Sed id ligula quis est convallis tempor.  Sed bibendum.  </p>
          </div>

          <div className="method-element">
            <h3>investigation</h3>
            <p>Nam a sapien.  Sed id ligula quis est convallis tempor.  Sed bibendum.  </p>
          </div>
        </div>

        <hr></hr>
        
        <h2>Our latest releases</h2>
        <div className="latest-releases">
          <div className="release-element">
            <h3>{latestTechAdvocacy.title}</h3>
            <small>Tech Advocacy</small>
            <p>{latestTechAdvocacy.desc}</p>
          </div>
          <div className="release-element">
            <h3>{latestInvestigation.title}</h3>
            <small>Investigation</small>
            <p>{latestInvestigation.desc}</p>
          </div>
          <div className="release-element">
            <h3>{latestDatabase.title}</h3>
            <small>Database</small>
            <p>{latestDatabase.desc}</p>
          </div>          
        </div>

        <hr></hr>
        <h2>Dicover our sources</h2>
      </div>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
query IndexPartials($locale: String!) {
 partials: allMdx(filter: {frontmatter: {type: {eq: "partial"}}}) {
    edges {
      node {
        code {
          body
        }
      }
    }
  }
latestTechAdvocacy :allMdx(
   filter: { fields: { locale: { eq: $locale } }
       fileAbsolutePath: {regex: "/content\/tech-advocacy/"}
       frontmatter: {level: {lte: 1}} }
       sort: { fields: [frontmatter___date], order: DESC }
    limit: 1
) {
    edges {
      node {
          frontmatter {
          title
          desc
        }
      }
    }
  }
latestInvestigation :allMdx(
   filter: { fields: { locale: { eq: $locale } }
       fileAbsolutePath: {regex: "/content\/investigations/"}
       frontmatter: {level: {lte: 1}} }
       sort: { fields: [frontmatter___date], order: DESC }
    limit: 1
) {
    edges {
      node {
          frontmatter {
          title
          desc
        }
      }
    }
  }
latestDatabase :allMdx(
   filter: { fields: { locale: { eq: $locale } }
       fileAbsolutePath: {regex: "/content\/collections/"}
       frontmatter: {level: {lte: 1}} }
       sort: { fields: [frontmatter___date], order: DESC }
       limit: 1
) {
    edges {
      node {
          frontmatter {
          title
          desc
        }
      }
    }
  }
 allSiteMetadataJson {
    edges {
      node {
        numbers {
          collectedPosts
          collectedTweets
          collectedVideo
          verifieddata
        }
      }
    }
  }
}
`;
