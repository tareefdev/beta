import React, { useContext } from 'react';
import { graphql } from "gatsby";
import LocalizedLink from "../components/localizedLink";
import { LocaleContext } from '../context/locale-context';
import tr from '../components/useTranslations';

import { rhythm } from "../utils/typography";

const UnitsList = ({data}) => {
  const locale = useContext(LocaleContext);
  const units = data.allUnitsJson.edges.map(u => u.node);

  const listItems = units.map((unit) =>
                              <div
                                key={unit["id"]}
                                className="unit"
                              >
                                <span>{unit["annotations"]["reference_code"]}</span>
                                <span>{unit["annotations"]["upload_date"]}</span>
                                <p>{unit["annotations"][`online_title_${locale}`]}</p>
                                <LocalizedLink to={`/database/units/${unit.id}`}>{tr('View')}</LocalizedLink>
                              </div>
                             );
  
  return(
    <div>
      {listItems}
    </div>
  );

};

export default UnitsList;

export const pageQuery = graphql`
  query chemicalCollectionQuery{
 allUnitsJson( 
   filter: {
    clusters: {
      collections: {eq: "Chemical weapons"}
    }
  }
  ) {
    edges {
     node {
        id
        aid
        annotations {
          incident_code
          reference_code
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
