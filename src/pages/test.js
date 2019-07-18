import React, { useContext, useState, useEffect } from 'react';
import { graphql } from "gatsby";

import Layout from "../components/layout";
import { LocaleContext } from '../context/locale-context';
import ListCollection from '../components/collections/list';

import "../style/collections.scss";

const Test = ({data}) => {

  const allUnits = data.allUnitsJson.edges.map(u => u.node);
 
  const [units, setUnits] = useState([]);
  const [hoveredUnit, setHoveredUnit] = useState({});
  const locale = useContext(LocaleContext);
  
  useEffect(() => {
    setUnits(allUnits);
  },[]);
  console.log(`allUnits length is ${units.length}`);
  function updateUnits(filteredUnits) {
    setUnits(filteredUnits);  
  }

  function setHoverUnit(unit) {
    setHoveredUnit(unit);
  }
  
  return(
    <Layout>
      <div className="collection">
        <div className="incidents-list">
          <ListCollection allUnits={allUnits} units={units} updateUnits={updateUnits} setHoveredUnit={setHoverUnit}/>
        </div>
        <div className="incidents-map">
        </div>
      </div>
    </Layout>
  );

};

export default Test;

export const pageQuery = graphql`
  query testQuery{
  allUnitsJson(filter: {lang: {eq: "en"}}) {
    edges {
      node {
        id
        incident_date_time
        link
        title
        location {
          name
          lat
          lon
        }
      }
    }
  }
}
`;
