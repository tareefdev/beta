import React from "react";
import * as PropTypes from "prop-types";
import { Link, PageRenderer } from "gatsby";

// Load the css for the Space Mono font.
// import "typeface-space-mono";

import Layout from "../components/layout";
import { rhythm, scale } from "../utils/typography";
import presets from "../utils/presets";

let Modal;

import(`../components/modal`).then(modal => {
  Modal = modal.default;
});

let windowWidth;

class DataBaseLayout extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    isModal: PropTypes.bool,
  }

  render() {
    const { location } = this.props;
    const prevPath = this.props.prevPath ? this.props.prevPath : '/';
    let isModal = false;
    if (!windowWidth && typeof window !== `undefined`) {
      windowWidth = window.innerWidth;
    }
    if (this.props.isModal && windowWidth > 750) {
      isModal = true;
    }
//    console.log(`windowWidth is ${windowWidth}`);
    if (isModal && Modal) {
      return (
        <React.Fragment>
          <PageRenderer location={{ pathname: prevPath }} />
          <Modal isOpen={true} location={location} prevPath={prevPath}>
            {this.props.children}
          </Modal>
        </React.Fragment>
      );
    }

    return (
      <Layout className="en" title="Syrian Archive">
        {this.props.children}
      </Layout>
    );
  }
}

export default DataBaseLayout;
