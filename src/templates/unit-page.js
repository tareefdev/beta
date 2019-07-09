import React from "react";
import { graphql } from "gatsby";
import UnitDetails from "../components/unitDetails";
import DataBaseLayout from "../layout/databaseLayout";

function unitTemplate({pageContext, data, location}) {

    // here you can use this.props.pageContext.locale
  const locale = pageContext.locale;
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
      <DataBaseLayout location={location} isModal={isModal}>
        <UnitDetails unit={data.unitsJson} locale={locale} />
      </DataBaseLayout>
    );

};

export default unitTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    unitsJson(id: { eq: $id }) {
     id
     ...UnitDetails_detail
    }
  }
`;
