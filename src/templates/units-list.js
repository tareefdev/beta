import React, { useContext, useState, useEffect } from 'react';
import { graphql } from "gatsby";

import { LocaleContext } from '../context/locale-context';
import LocalizedLink from "../components/localizedLink";
import useTranslations from '../components/useTranslations';

const UnitsList = ({data, pageContext, location}) => {
  const [Units, setUnits] = useState('');

  // Similar to componentDidMount, componentDidUpdate:
  useEffect(() => {
    setUnits(listUnits);
  },[listUnits]);

  function cleanUnits() {
    setUnits([]);
  }
  
  const locale = useContext(LocaleContext);
  const tr = useTranslations();
  const units = data.allUnitsJson.edges.map(u => u.node);

  // helper
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

  // Calculates info about current page
  const { currentPage, totalPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();
  const startPage = isFirst ? 1 : currentPage - 5;
  const stopPage = isLast ? currentPage : currentPage + 5; 
  const pageRange = range(startPage, stopPage, 1);
  
  // we don't want pages less than 0 or more than the exist ones
  const pageNavigation = pageRange.filter(page => (page > -1 && page < totalPages));

  
  const listUnits = units.map((unit) =>
                              <div
                                key={unit["id"]}
                                className="unit"
                              >
                                <span>{unit["reference_code"]}</span>
                                <span>{unit["incident_date_time"]}</span>
                                <p>{unit["title"]}</p>
                                <LocalizedLink to={`/database/units/${unit.id}`}
                                               state={{
                                                 prevPath : location.pathname
                                               }}>
                                  {tr('View')}
                                </LocalizedLink>
                              </div>
                             );
  
  
  return(
    <div className="database-page">
      <div className="database">
        <div className="database-table">
          {Units}
        </div>
      </div>
      <div className="page-numbers">
        <ul>
          {pageNavigation.map(v => (
            <li
              key={`pagination-number${v}`}
            >
              <LocalizedLink
                to={`/database/${v === 0 ? '' : v + 1}`}
                style={{
                  textDecoration: 'none',
                  color: v + 1 === currentPage ? '#ffffff' : '',
                  background: v + 1 === currentPage ? '#007acc' : '',
                }}
              >
                {v + 1}
              </LocalizedLink>
            </li>
          ))}
        </ul>
      </div>
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
       title
       link
       incident_date_time
      }
    }
  }
  }
`;
