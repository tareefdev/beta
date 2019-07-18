import React, { useContext, useState, useEffect } from 'react';
import { graphql } from "gatsby";

import { LocaleContext } from '../context/locale-context';
import Layout from "../components/layout";
import ListUnits from '../components/database/ListUnits';
import SyriaMap from "../components/database/map";

import "../style/collections.scss";

const ChemicalCollection = ({data}) => {

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
          <SyriaMap units={units} hoveredUnit={hoveredUnit}/>
        </div>
      </div>
    </Layout>
  );

};

export default ChemicalCollection;

export const pageQuery = graphql`
  query chemicalCollectionQuery{
  allUnitsJson(limit: 50, filter: {location: {lat: {ne: null}, name: {ne: null}}, lang: {eq: "en"}}) {
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
