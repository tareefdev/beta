import React, { useRef, useEffect } from 'react';
//import { useStaticQuery, graphql } from "gatsby";
import * as d3 from 'd3';
import * as topojson from 'topojson';
import Districts from '../../data/syriaDistricts';
import Sources from '../../data/sySources';

const SVGMap = ({setHoveredDistrict}) => {
  
  const svgEl = useRef(null);

  // Draw the map after component get mounted, so svgEl is not null
  useEffect(() => {
    drawMap(); }
            , []);

  const margin = {top: 10, left: 10, bottom: 10, right: 2};
  let width = 700 - margin.left - margin.right;
  let height = 700 - margin.top - margin.bottom;
  const mapRatio = 0.5;
  const syriaCenter = [38, 35];
  const mapRatioAdjuster = 6;

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
  
  // It's better to use css's filter rule with contrast, although there is a bug with it in chrome https://stackoverflow.com/questions/32567156/why-dont-css-filters-work-on-svg-elements-in-chrome
  // https://bugs.chromium.org/p/chromium/issues/detail?id=109224    
  function mouseover(d) {
    setHoveredDistrict(d.properties.NAME_2)
   
    const originalColor = d3.select(this).attr('Ocolor');
    d3.selectAll('.district').attr('fill', d => coloriz(d, 'dim'));
    d3.select(this).attr('fill', originalColor);
   d3.select(this).style('stroke-width', 1.5);
  }

  function mouseout() {
//    setHoveredDistrict('');
   d3.selectAll('.district').attr('fill', d => coloriz(d, 'original'));
   d3.select(this).style('stroke-width', 0.3);
  }

  function coloriz(d, type){
    const governorate = d.properties.NAME_1;
    const district = d.properties.NAME_2;
    const result = Sources.filter(obj => obj.governorate === governorate);
    const numberOfSources = result[0].districts[district];
    if (numberOfSources > 17) return color[type].first ;
    else if (numberOfSources > 12) return color[type].second;
    else if (numberOfSources > 9) return color[type].third;
    else if (numberOfSources > 7) return color[type].fourth;
    else if (numberOfSources > 5) return color[type].fifth;
    else if (numberOfSources > 3) return color[type].sixth;
    return color[type].seventh;
  }

  function drawMap() {
    console.log('drawmap')
    const projection = d3.geoMercator()
          .center(syriaCenter)
          .scale(width * [mapRatio + mapRatioAdjuster]);

    const svg = d3.select(svgEl.current)
          .attr('width', width)
          .attr('height', height);

    const path = d3.geoPath()
          .projection(projection);

    const features =  svg.append('g')
          .attr('transform', 'translate(-200,70)');

    features.selectAll('path')
      .data(topojson.feature(Districts, Districts.objects.SYR_adm2).features)
      .enter()
      .append('path')
      .attr('class', 'district')
      .attr('fill', d => coloriz(d, 'original'))
      .attr('Ocolor', d => coloriz(d, 'original'))
      .attr('d', path)
      .attr('district', d => d.properties.NAME_2)
      .attr('stroke', '#404040')
      .attr('stroke-width', 0.3)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);
  }
  
  return (
    <svg ref={svgEl}></svg>
  );
};

export default SVGMap;
