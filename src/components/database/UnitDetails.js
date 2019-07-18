import React from "react";

import presets from "../utils/presets";
import typography, { rhythm, scale } from "../utils/typography";
import { graphql } from "gatsby";
import useTranslations from "../useTranslations";

function UnitDetails({unit, locale}) {
  const tr = useTranslations();
    const {
      id,
      link,
      title,
      incident_date_time,
      href
    } = unit;

  const UintDetail = () => (
      <div>
        <div>
          <strong>
            <br/>
          </strong>
          {incident_date_time}
        </div>
        <br/>
        <div>
          <strong>{tr('Online Title')}:</strong><br/>
          {title}
        </div>
        <br/>
        <div>
          <strong>{tr('Location')}:</strong><br/>
        </div>
        <br/>
        <div>
          <a href={link}>
            {tr('Online Link')}
          </a>         
        </div>
        <div>
          <video controls width="500">
            <source src={href} type="video/mp4">
            </source>
          </video>
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

export default UnitDetails;

export const unitDetailFragment = graphql`
  fragment UnitDetails_detail on UnitsJson {
     id
     link
     title
     incident_date_time
     href
  }
`;
