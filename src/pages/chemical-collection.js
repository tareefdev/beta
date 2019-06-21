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
                                <span>{unit["annotations"]["incident_date_time"]}</span>
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
 allUnitsJson {
    edges {
     node {
        id
        annotations {
          incident_date_time
          online_title_en
          online_title_ar
        }
          online_link
      }
    }
  }
  }
`;
