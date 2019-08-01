import React from "react";
import { graphql } from "gatsby";

import useTranslations from "../useTranslations";
import presets from "../../utils/presets";
import typography, { rhythm, scale } from "../../utils/typography";

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
      <div
        css={{
          marginBottom: rhythm(1/2)
        }}>
        <strong>
          id: {id}
        </strong>
      </div>
      <div
        css={{
          marginBottom: rhythm(1/2)
        }}>
        <strong>{tr('Incident Date and Time')}:</strong><br/>
        {incident_date_time}
      </div>
      <div
        css={{
          marginBottom: rhythm(1/2)
        }}>
        <strong>{tr('Online Title')}:</strong><br/>
        {title}
      </div>
      <div
        css={{
          marginBottom: rhythm(1/2)
        }}>
        <strong>{tr('Location')}:</strong><br/>
      </div>
      <div
        css={{
          marginBottom: rhythm(1/2)
        }}>
        <a href={link}>
          {tr('Online Link')}
        </a>         
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
          <div>
            <video controls width="100%">
              <source src={link} type="video/mp4">
              </source>
            </video>
          </div>
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
