import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { geoMercator } from 'd3-geo';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Districts from './data/syria-districts-topojson';
import Sources from './data/sy-sources';
//import { mapConstants } from "./data/map-constants"; 

const SVGMap = () => {

  const svgEl = useRef();
  
  const margin = {top: 10, left: 10, bottom: 10, right: 2};
  let width = 700 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;
  const mapRatio = 0.5;
  const syriaCenter = [38, 35];
  const mapRatioAdjuster = 6;

  const projection = d3.geoMercator()
        .center(syriaCenter)
        .scale(width * [mapRatio + mapRatioAdjuster]);

  const svg = d3.select(svgEl.current)
        .attr('width', width)
        .attr('height', height);

  console.log(svgEl);

  const path = d3.geoPath()
        .projection(projection);

  const features =  svg.append('g')
        .attr('transform', 'translate(-200,70)');

  // const gov = d3.select('#gov');
  // const dis = d3.select('#dis');
  // const num = d3.select('#num');
  // const els = document.getElementById('viz');

  const color = {
    original: {
      first: '#fcaf6d',
      second: '#fdba80',
      third: '#fdc494',
      fourth: '#fdcfa7',
      fifth: '#fed9ba',
      sixth: '#fee4cd',
      seventh: '#feeee1'
    },
    dim: {
      first: '#a58e7a',
      second: '#a59180',
      third: '#a58e7a',
      fourth: '#a5978b',
      fifth: '#a59a91',
      sixth: '#a59e97',
      seventh: '#a5a19d'
    }
  };

  features.selectAll('path')
    .data(topojson.feature(Districts, Districts.objects.SYR_adm2).features)
    .enter()
    .append('path')
    .attr('class', 'district')
    .attr('d', path)
    .attr('district', d => d.properties.NAME_2)
    .attr('stroke', '#404040')
    .attr('stroke-width', 0.3);


  return (
    <div>
      <svg ref={svgEl}>
      </svg>
    </div>
  );
};

SVGMap.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

export default SVGMap;
