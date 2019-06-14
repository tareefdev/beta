import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { graphql } from "gatsby";
import {filter, isEmpty, uniqBy, isEqual, pick } from 'lodash/fp';
import style from '../style/leaflet.css';

export default class MyMap extends Component {

  constructor(props){
    super(props);
  
  }

  componentWillMount() {

  }
  default_viewport = {
    lat: 34.7000,
    lng: 38.9968,
    zoom: 7,
  };
  
  render() {
    const position = [this.default_viewport.lat, this.default_viewport.lng];
    const { data } = this.props;
    const units = data.allUnitsJson.edges.map(u => u.node);
    
    if (typeof window !== 'undefined') {
      return (
        <Map center={position} zoom={this.default_viewport.zoom} className="beb">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {units.map((unit, index) => {
            return (
              <Marker
                key={index}
                position={{lat: unit.annotations.latitude, lng: unit.annotations.longitude}}
              >
                <Popup>
                  <span>
                    {unit.incident_code}
                  </span>
                </Popup>
                <Circle
                  center={{lat: unit.annotations.latitude, lng: unit.annotations.longitude}}
                  fillColor="blue"
                  radius={200}
                />
              </Marker>
            );
          })}
        </Map>
      );
    }
    return null;
  }
}

export const pageQuery = graphql`
  query chemicalCollectionMapQuery{
  allUnitsJson(filter: {
    clusters: {collections: {eq: "Chemical weapons"}}
    annotations: {latitude: {ne: null}}
  }, 						
  ) {
    totalCount
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
          online_link
          latitude
          longitude
        }
      }
    }
  }
}
`;
