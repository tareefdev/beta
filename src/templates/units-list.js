import React, { useContext } from 'react';
import { graphql } from "gatsby";
import LocalizedLink from "../components/localizedLink";
import { LocaleContext } from '../context/locale-context';
import tr from '../components/useTranslations';
import style from "../../src/global.scss";
import { rhythm } from "../utils/typography";

const UnitsList = ({data, pageContext}) => {
  const locale = useContext(LocaleContext);
  const units = data.allUnitsJson.edges.map(u => u.node);
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();


  const listItems = units.map((unit) =>
                              <div
                                key={unit["id"]}
                                className="unit"
                              >
                                <span>{unit["incident_code"]}</span>
                                <span>{unit["annotations"]["upload_date"]}</span>
                                <p>{unit["annotations"][`online_title_${locale}`]}</p>
                                <LocalizedLink to={`/database/units/${unit.id}`}>{tr('View')}</LocalizedLink>
                              </div>
                             );
  
  return(
    <div>
      {listItems}
      <ul>
        <li>{!isFirst && (
          <LocalizedLink to={`/database/${prevPage}`} rel="prev">
            ← Previous Page
          </LocalizedLink>
        )}</li>

        {Array.from({ length: numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            style={{
              margin: 0,
            }}
          >
            <LocalizedLink
              to={`/database/${i === 0 ? '' : i + 1}`}
              style={{
                padding: rhythm(1 / 4),
                textDecoration: 'none',
                color: i + 1 === currentPage ? '#ffffff' : '',
                background: i + 1 === currentPage ? '#007acc' : '',
              }}
            >
              {i + 1}
            </LocalizedLink>
          </li>
        ))}
        
        <li>
          {!isLast && (
            <LocalizedLink to={`/database/${nextPage}`} rel="next">
              Next Page →
            </LocalizedLink>
          )}
        </li>
      </ul>
    </div>
  );

};

export default UnitsList;

export const pageQuery = graphql`
  query unitsPageQuery($skip: Int!, $limit: Int!){
 allUnitsJson(
      limit: $limit
      skip: $skip
) {
    edges {
     node {
        id
        aid
       incident_code
        annotations {
          upload_date
          online_title_en
          online_title_ar
          location
          online_link
        }
      }
    }
  }
  }
`;
