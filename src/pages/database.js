import React, { useContext } from 'react';
import { graphql } from "gatsby";
import LocalizedLink from "../components/localizedLink";
import { LocaleContext } from '../context/locale-context';
import tr from '../components/useTranslations';
import style from "../../src/global.scss";

const ObservationDatabase = ({data}) => {
  const locale = useContext(LocaleContext);
  const  units  = data.allUnitsJson.edges.map(u => u.node);

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
    </div>
  );

};

export default ObservationDatabase;

export const pageQuery = graphql`
  query {
 allUnitsJson {
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
