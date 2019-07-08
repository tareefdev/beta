import React, {useContext} from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import style from '../../style/leaflet.css';
import { LocaleContext } from '../../context/locale-context';
import LocalizedLink from "../../components/localizedLink";

const SyriaMap = ({units, hoveredUnit}) => {
  const locale = useContext(LocaleContext);
  const default_viewport = {
    lat: 34.7000,
    lng: 38.9968,
    zoom: 7,
  };

  const MarkerRadius = (unit) => hoveredUnit.id === unit.id ? 15000 : 6000;
  const MarkerColor = (unit) => hoveredUnit.id === unit.id ? "red" : "white";
  

    const position = [default_viewport.lat, default_viewport.lng];

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
                riseOnHover={true}
              >
                <Popup>
                  <span>
                    <LocalizedLink to={`/database/units/${unit.id}`}>
                      {unit.title}
                    </LocalizedLink>
                  </span>
                </Popup>
                <Circle
                  center={{lat: unit.location.lat, lng: unit.location.lon}}
                  fillColor={MarkerColor(unit)}
                  radius={MarkerRadius(unit)}
                />
              </Marker>
            );
          })}
        </Map>
      );
    }
    return null;
  
};

export default SyriaMap;

