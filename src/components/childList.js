import React from "react";
import LocalizedLink from "./localizedLink";

const ChildList = ({ posts }) => {
  return (
    <div>
      <h4>Child Posts</h4>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <div key={node.fields.slug}>
              <LocalizedLink style={{ boxShadow: `none` }} to={`/${node.fields.slug}`}>
                {title}
              </LocalizedLink>
          </div>
        );
      })}
    </div>
  );
};

export default ChildList;
