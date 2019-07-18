import React, { useContext, useState, useEffect } from 'react';
import { graphql } from "gatsby";

import Layout from "../components/layout";
import { LocaleContext } from '../context/locale-context';
import ListUnits from '../components/database/ListUnits';

import "../style/collections.scss";

const DataArchived = ({data}) => {

  const allUnits = data.allUnitsJson.edges.map(u => u.node);
 
  const [units, setUnits] = useState([]);
  const [hoveredUnit, setHoveredUnit] = useState({});
  const locale = useContext(LocaleContext);
  
  useEffect(() => {
    setUnits(allUnits);
  },[]);
  
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
          <ListUnits allUnits={allUnits} units={units} updateUnits={updateUnits} setHoveredUnit={setHoverUnit}/>
        </div>
        <div className="incidents-map">
        </div>
      </div>
    </Layout>
  );

};

export default DataArchived;

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
