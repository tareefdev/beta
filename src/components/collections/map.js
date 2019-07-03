import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { graphql } from "gatsby";
import {filter, isEmpty, uniqBy, isEqual, pick } from 'lodash/fp';
import style from '../../style/leaflet.css';

const MyMap = ({units}) => {

  const default_viewport = {
    lat: 34.7000,
    lng: 38.9968,
    zoom: 7,
  };
  
    const position = [default_viewport.lat, default_viewport.lng];
//    const units = data.allUnitsJson.edges.map(u => u.node);

    if (typeof window !== 'undefined') {
      return (
        <Map center={position} zoom={default_viewport.zoom} className="beb">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {units.map((unit) => {
            return (
              <Marker
                key={unit.id}
                position={{lat: unit.location.lat, lng: unit.location.lon}}
              >
                <Popup>
                  <span>

                  </span>
                </Popup>
                <Circle
                  center={{lat: unit.location.lat, lng: unit.location.lon}}
                  fillColor="blue"
                  radius={1400}
                />
              </Marker>
            );
          })}
        </Map>
      );
    }
    return null;
  
};

export default MyMap;

