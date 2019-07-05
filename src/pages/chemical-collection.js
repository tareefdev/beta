import React, { useContext, useState, useEffect } from 'react';
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SyriaMap from "../components/collections/map";
import { LocaleContext } from '../context/locale-context';
import ListCollection from '../components/collections/list';

import "../style/chemical.scss";

const Chemical = ({data}) => {

  const allUnits = data.allUnitsJson.edges.map(u => u.node);
  const [units, setUnits] = useState([]);
  const locale = useContext(LocaleContext);
  
  useEffect(() => {
    setUnits(allUnits);
  },[]);
  
  function updateUnits(filteredUnits) {
    setUnits(filteredUnits);  
  }
  
  return(
    <Layout>
      <div className="chemical-collection">
        <div className="incidents-list">
          <ListCollection allUnits={allUnits} units={units} updateUnits={updateUnits}/>
        </div>
        <div className="chemical-map">
          <SyriaMap units={units}/>
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
