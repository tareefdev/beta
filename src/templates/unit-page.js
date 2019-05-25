// import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import UnitDetails from "../components/unitDetails";
import DataBaseLayout from "../layout/databaseLayout";

class PostTemplate extends React.Component {
  // static propTypes = {
  //   data: PropTypes.shape({
  //     postsJson: PropTypes.object.isRequired,
  //   }),
  // }
  render() {
    // here you can use this.props.pageContext.locale
    console.log(this.props.pageContext.locale);
    let isModal = false;
    // We don't want to show the modal if a user navigates
    // directly to a post so if this code is running on Gatsby's
    // initial render then we don't show the modal, otherwise we
    // do.
    if (
      typeof window !== `undefined` &&
        window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE
    ) {
      isModal = true;
    }
    return (
      <DataBaseLayout location={this.props.location} isModal={isModal}>
        <UnitDetails unit={this.props.data.unitsJson} />
      </DataBaseLayout>
    );
  }
}

export default PostTemplate;

// The post template's GraphQL query. Notice the “id”
// variable which is passed in. We set this on the page
// context in gatsby-node.js.
//
// All GraphQL queries in Gatsby are run at build-time and
// loaded as plain JSON files so have minimal client cost.
export const pageQuery = graphql`
  query($id: String!) {
    unitsJson(id: { eq: $id }) {
     id
     clusters {
      locations 
     }
     incident_code
     annotations {
      upload_date
     }
    }
  }
`;
