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
    const locale = this.props.pageContext.locale;
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
        <UnitDetails unit={this.props.data.unitsJson} locale={locale} />
      </DataBaseLayout>
    );
  }
}

export default PostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    unitsJson(id: { eq: $id }) {
     id
     ...UnitDetails_detail
    }
  }
`;
