import React from "react";

import presets from "../utils/presets";
import typography, { rhythm, scale } from "../utils/typography";
import { graphql } from "gatsby";

class UnitDetails extends React.Component {
  render() {
    const {
      id,
      incident_code,
      annotations,
      clusters,
    } = this.props.unit;

    const UintDetail = () => (
      <div
        css={{
          ...scale(-2 / 5),
          lineHeight: typography.options.baseLineHeight,
        }}
      >
        <div
          css={{
            marginBottom: rhythm(1),
            overflow: `hidden`,
          }}
        >
          <strong
            data-testid="post-detail-likes"
            css={{
              float: `left`,
            }}
          >
            {incident_code} likes
          </strong>
          <strong
            css={{
              color: `rgba(0,0,0,0.4)`,
              float: `right`,
            }}
          >
            {annotations.upload_date}
          </strong>
        </div>
        <div data-testid="post-detail-text">
          <strong>{annotations.sa_link}</strong> 
        </div>
      </div>
    );

    return (
      <div
        onClick={e => e.stopPropagation()}
        css={{
          background: `white`,
          display: `flex`,
          alignItems: `stretch`,
          flexDirection: `column`,
          width: `100%`,
          [presets.Tablet]: {
            flexDirection: `row-reverse`,
            marginTop: rhythm(1),
          },
        }}
      >
        <div
          css={{
            padding: rhythm(3 / 4),
            paddingBottom: 0,
            [presets.Tablet]: {
              width: rhythm(13),
              padding: rhythm(1),
            },
          }}
        >
          <div
            css={{
              display: `none`,
              [presets.Tablet]: {
                display: `block`,
              },
            }}
          >
            <UintDetail />
          </div>
        </div>
        <div
          to={`/${id}/`}
          css={{
            display: `block`,
            backgroundColor: `lightgray`,
            flex: `1 0 0%`,
            width: `100%`,
            position: `relative`,
          }}
        >
          <div
            css={{
              flexDirection: `column`,
              flexShrink: 0,
              position: `relative`,
              paddingBottom: `100%`,
              overflow: `hidden`,
            }}
          >
            <div
              css={{
                flexDirection: `column`,
                flexShrink: 0,
                position: `absolute`,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          </div>
        </div>
        <div
          css={{
            background: `white`,
            padding: rhythm(3 / 4),
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}
        >
          <UintDetail />
        </div>
      </div>
    );
  }
}

export default UnitDetails;

export const postDetailFragment = graphql`
  fragment UnitDetails_detail on UnitsJson {
    # Specify the fields from the post we need.
    annotations {
      incident_code
      upload_date
      sa_link
     }

  }
`;
