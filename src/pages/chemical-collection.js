import React, { useContext, useState, useEffect } from 'react';
import { graphql } from "gatsby";

import LocalizedLink from "../components/localizedLink";
import Layout from "../components/layout";
import MyMap from "../components/collections/map";
import { LocaleContext } from '../context/locale-context';
import tr from '../components/useTranslations';

import "../style/chemical.scss";

const Chemical = ({data}) => {

  const allUnits = data.allUnitsJson.edges.map(u => u.node);
  const [units, setUnits] = useState([]);
  const [queryTitle, setQueryTitle] = useState('');
  const locale = useContext(LocaleContext);
  
  useEffect(() => {
    setUnits(allUnits);
  },[]);
  
  const listItems = units.map((unit) =>
                                  <div
                                    key={unit["id"]}
                                    className="unit"
                                  >
                                    <span>{unit["incident_date_time"]}</span>
                                    <p>{unit["title"]}</p>
                                    <LocalizedLink to={`/database/units/${unit.id}`}>{tr('View')}</LocalizedLink>
                                  </div>
                                 );

  function filter(){
    let updatedList = allUnits.filter(function(item){
      return item.title.toLowerCase().search(
        queryTitle.toLowerCase()) !== -1;
    });
    setUnits(updatedList);
   
  };
  
  return(
    <Layout>
      <div className="chemical-collection">
        <div className="incidents-list">
          <div>
            <input
              type="text"
              onBlur={e => setQueryTitle(e.target.value)}
              placeholder={'Filter'}
            />
            <br/>
            <button onClick={filter}>
              Search
            </button>
          </div>
          {listItems}
        </div>
        <div className="chemical-map">
          <MyMap units={units}/>
        </div>
      </div>
    </Layout>
  );

};

export default Chemical;

export const pageQuery = graphql`
  query chemicalCollectionReactQuery{
 allUnitsJson(limit: 50, filter: {location: {lat: {ne: null}}}) {
    edges {
      node {
        id
        incident_date_time
        link
        title
        location {
          lat
          lon
        }
      }
    }
  }
}
`;
